<template>
    <div class="container">
      <div class="row mt-5">
        <div class="col-md-4 ml-3">
          <button disabled type="button" class="btn py-3 px-5">
            <font-awesome-icon icon="coins" />
          </button>
        </div>
        <div class="col-md-8 d-flex justify-content-end">
  
          <div class="space-buttons">
            <button type="button" class="btn btn-primary py-3 px-5" @click.prevent="openModal('#create_user')">
              Crear usuario
            </button>
          </div>
  
          <div class="space-buttons">
            <button type="button" class="btn btn-primary py-3 px-5" @click.prevent="openModal('#create_count')">
              Crear cuenta de ahorros
            </button>
          </div>
  
          <div class="">
            <button type="button" class="btn btn-primary py-3 px-5" @click.prevent="openModal('#register_count')">
              Consignar
            </button>
          </div>
        </div>
      </div>
  
      <div class="mt-5">
        <table class="table table-striped">
          <thead>
            <tr>
              <th scope="col">Número de cuenta</th>
              <th scope="col">Nombre de usuario</th>
              <th scope="col">Total</th>
              <th scope="col">Último movimiento</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(item, index) in data" :key="index">
              <td>
                <ul>
                  <li v-for="(count, countIndex) in item.counts" :key="countIndex">
                    {{ count.number_count }}
                  </li>
                </ul>
              </td>
  
              <td>
                <ul>
                  <li v-for="(count, countIndex) in item.counts" :key="countIndex">
                    <ul>
                      <li v-for="(
                          transaction, transactionIndex
                        ) in count.transaction" :key="transactionIndex">
                        {{ transaction.value.toLocaleString() }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
  
              <td>
                <ul>
                  <li v-for="(count, countIndex) in item.counts" :key="countIndex">
                    <ul>
                      <li v-for="(
                          transaction, transactionIndex
                        ) in count.transaction" :key="transactionIndex">
                        {{ transaction.value.toLocaleString() }}
                      </li>
                    </ul>
                  </li>
                </ul>
              </td>
  
              <td class="d-flex justify-content-around">
                <a type="button" class="size-icon" @click.prevent="openModal('#edit_count')">
                  <font-awesome-icon icon="edit" />
                </a>
  
                <a class="size-icon" @click.prevent="deleteCount(index, item)">
                  <font-awesome-icon icon="trash-alt" />
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <CreateCount :closeModal="closeModal" />
      <EditCount :closeModal="closeModal" />
      <RegisterCount :closeModal="closeModal" />
      <CreateUser :closeModal="closeModal" />
    </div>
  </template>
  
  <script>
  import { Modal } from "bootstrap";
  import axios from "axios";
  
  import EditCount from "./components/modals/EditCount.vue";
  import CreateCount from "./components/modals/CreateCount.vue";
  import RegisterCount from "./components/modals/RegisterCount.vue";
  import CreateUser from "./components/modals/CreateUser.vue";
  
  export default {
    components: {
      EditCount,
      CreateCount,
      RegisterCount,
      CreateUser,
    },
  
    data() {
      return {
        modalOpen: false,
        data: [],
      };
    },
  
    mounted() {
      this.getComplements();
    },
  
    methods: {
      getComplements() {
        axios
          .get("http://127.0.0.1:8000/api/get_clients")
          .then((resp) => {
            this.data = resp.data.data;
            console.log(this.data, "data de inicio");
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      deleteCount(index, data) {
        axios
          .post(`http://127.0.0.1:8000/api/delete_count/${data.id}`)
          .then((resp) => {
            this.data.splice(index, 1);
          })
          .catch((error) => {
            console.log(error);
          });
      },
  
      openModal(id) {
        const modalId = id.startsWith("#") ? id.slice(1) : id;
        const modal = document.getElementById(modalId);
        this.modalOpen = new Modal(modal);
  
        this.modalOpen.show();
      },
  
      closeModal() {
        this.modalOpen.hide();
      },
    },
  };
  </script>
  
  <style scoped>
  .size-icon {
    font-size: 23px;
    cursor: pointer;
  }
  </style>
  