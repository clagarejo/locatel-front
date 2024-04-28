<template>
  <div>
    <Navbar />

    <main class="mt-5 container">
      <div class="d-flex justify-content-between">
        <div class="space-buttons">
          <button
            type="button"
            class="btn btn-success py-2 px-3"
            @click.prevent="openModal('#create_count')"
          >
            <font-awesome-icon icon="plus" />
            Crear cuenta de ahorros
          </button>
        </div>

        <div class="">
          <button
            type="button"
            class="btn btn-outline-success py-2 px-3 button-border"
            @click.prevent="openModal('#register_count')"
          >
            <font-awesome-icon icon="suitcase" class="close" />

            Movimientos
          </button>
        </div>
      </div>

      <table class="table mt-3 text-center">
        <thead>
          <tr>
            <th scope="col">Número de cuenta</th>
            <th scope="col">Nombre de usuario</th>
            <th scope="col">Ultimo movimiento</th>
            <th scope="col" colspan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(account, index) in accounts" :key="index">
            <td>{{ account.id }}</td>
            <td>{{ account.user_name }}</td>
            <td>{{ new Date(account.updated_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'short', day: 'numeric' }) }}</td>


            <td>
              <a
                class="size-icon btn btn-danger"
                @click.prevent="deleteCount(account.id)"
              >
                <font-awesome-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <create-count :closeModal="closeModal" :users="users" />
    <register-count :closeModal="closeModal" />
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";

import CreateCount from "./modals/CreateCount.vue";
import RegisterCount from "./modals/RegisterCount.vue";

export default {
  components: { CreateCount, RegisterCount },

  data() {
    return {
      modalOpen: null,
      accounts: [],
      users: [],
      account_number: null,
    };
  },

  mounted() {
    this.getAccounts();
  },

  methods: {
    getAccounts() {
      axios
        .get("http://localhost:8000/api/accounts")
        .then((response) => {
          this.accounts = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    },

    getUsers() {
      axios
        .get("http://localhost:8000/api/users")
        .then((response) => {
          this.users = response.data;
          console.log(this.users, "usuarios");
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    },

    deleteCount(id) {
      this.$swal.fire({
        title: "¿Estás seguro?",
        text: "Esta acción eliminará permanentemente la cuenta.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#d33",
        confirmButtonColor: "#198754",
      }).then((result) => {
        if (result.isConfirmed) {
          axios
            .delete(`http://localhost:8000/api/accounts/${id}`)
            .then((response) => {
              this.$swal({
                title: "Éxito",
                text: response.data.message,
                icon: "success",
                confirmButtonText: "¡Genial!",
              });
              this.getAccounts();
            })
            .catch((error) => {
              const errorMessage = error.response.data.message || "Error al eliminar usuario";
              this.$swal.fire({
                title: "Error",
                text: errorMessage,
                icon: "error",
                confirmButtonText: "!Aush!",
              });
            });
        }
      })
    },

    openModal(id) {
      if (id === "#create_count") {
        this.getUsers();
      }

      if (id === "#movements") {
        this.account_number == id;
      }
      const modalId = id.startsWith("#") ? id.slice(1) : id;
      const modal = document.getElementById(modalId);
      this.modalOpen = new Modal(modal);

      this.modalOpen.show();
    },

    closeModal() {
      this.modalOpen.hide();
      this.getAccounts();
    },
  },
};
</script>

<style scoped>
.button-border {
  border: 2px solid;
}

</style>
