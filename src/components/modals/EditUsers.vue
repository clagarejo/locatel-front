<template>
  <div
    class="modal fade"
    id="edit_user"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Editar usuario</h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Nombre completo </label>
              <input
                v-model.trim="editUser.name"
                required
                type="text"
                placeholder="Nombre"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Email </label>
              <input
                v-model.trim="editUser.email"
                required
                type="email"
                placeholder="email@email.com"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2">Teléfono</label>
              <input
                v-model.trim="editUser.phone"
                type="text"
                placeholder="(+57)"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Dirección </label>
              <input
                v-model.trim="editUser.address"
                required
                type="text"
                placeholder="cra 43 #53-43"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Documento </label>
              <input
                v-model.trim="editUser.document"
                required
                type="number"
                placeholder="122434353"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
          <button
            type="button"
            class="btn btn-success"
            @click.prevent="updateUser(editUser.id)"
          >
            Editar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["closeModal", "editUser"],

  data() {
    return {};
  },

  methods: {
    isValidEmail(email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    },

    showWarningAlert(message) {
      this.$swal({
        title: "Ups",
        text: message,
        icon: "warning",
        confirmButtonText: "!Ups!",
      });
    },

    showSuccessAlert(message) {
      this.$swal({
        title: "Éxito",
        text: message,
        icon: "success",
        confirmButtonText: "¡Genial!",
      });
    },

    updateUser(userId) {
      const { name, email, phone, address, document } = this.editUser;
      if (!name) {
        this.showWarningAlert("El nombre del usuario es requerido");
      } else if (!email) {
        this.showWarningAlert("El correo es requerido");
      } else if (!this.isValidEmail(email)) {
        this.showWarningAlert("Ingresa un email válido");
      } else if (!phone) {
        this.showWarningAlert("El número de teléfono es requerido");
      } else if (!address) {
        this.showWarningAlert("La dirección es requerida");
      } else if (!document) {
        this.showWarningAlert("El número de documento es requerido");
      } else {
        axios
          .put(`http://localhost:8000/api/users/${userId}`, this.editUser)
          .then((response) => {
            this.showSuccessAlert(response.data.message)
            this.closeModal();
          })
          .catch((error) => {
            const errorMessage =
              error.response.data.message || "Error al editar el usuario";
            this.$swal.fire({
              title: "Error",
              text: errorMessage,
              icon: "error",
              confirmButtonText: "!Aush!",
            });
          });
      }
    },
  },
};
</script>
