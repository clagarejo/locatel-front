<template>
  <div>
    <Navbar />

    <main class="mt-5 container">
      <div class="space-buttons mt-3">
        <a
          type="button"
          class="btn btn-success py-2 px-5 mb-3"
          @click.prevent="openModal('#create_user')"
        >
          <font-awesome-icon icon="plus" />
          Crear usuario
        </a>
      </div>

      <table class="table text-center">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Correo</th>
            <th scope="col">Telefono</th>
            <th scope="col">Documento</th>
            <th scope="col" colspan="2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in users" :key="index">
            <td>{{ item.name }}</td>
            <td>{{ item.email }}</td>
            <td>{{ item.phone }}</td>
            <td>{{ item.document }}</td>
            <td>
              <a
                type="button"
                class="size-icon btn btn-success"
                @click.prevent="openModal('#edit_user', item)"
              >
                <font-awesome-icon icon="edit" />
              </a>
            </td>
            <td>
              <a
                class="size-icon space-delete btn btn-danger"
                @click.prevent="deleteUser(item.id)"
              >
                <font-awesome-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </main>

    <create-user :closeModal="closeModal" :documentTypes="document_types" />
    <edit-users :closeModal="closeModal" :editUser="data_edit" />
  </div>
</template>

<script>
import { Modal } from "bootstrap";
import axios from "axios";

import CreateUser from "./modals/CreateUser.vue";
import EditUsers from "./modals/EditUsers.vue";

export default {
  components: { CreateUser, EditUsers },

  data() {
    return {
      modalOpen: null,
      users: [],
      data_edit: {},
      document_types: [],
    };
  },

  mounted() {
    this.getUsers();
  },

  methods: {
    getUsers() {
      axios
        .get("http://localhost:8000/api/users")
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    },

    getDocumentsTypes() {
      axios
        .get("http://localhost:8000/api/documents")
        .then((response) => {
          this.document_types = response.data;
          console.log(this.document_types, "tipos de documentos");
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    },

    deleteUser(id) {
      axios
        .delete(`http://localhost:8000/api/users/${id}`)
        .then((response) => {
          console.log("Tipos de documentos consultados");
          this.getUsers();
        })
        .catch((error) => {
          console.error("Error al eliminar usuario:", error);
        });
    },

    openModal(id, data) {
      if (data) {
        this.data_edit = data;
      }

      if (id === "#create_user") {
        this.getDocumentsTypes();
      }

      const modalId = id.startsWith("#") ? id.slice(1) : id;
      const modal = document.getElementById(modalId);
      this.modalOpen = new Modal(modal);

      this.modalOpen.show();
    },

    closeModal() {
      this.modalOpen.hide();
      this.getUsers();
    },
  },
};
</script>

<style scoped>
.space-delete {
  margin-left: -70px;
}
</style>
