<template>
  <div
    class="modal fade"
    id="create_user"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content m-modal ">
        <div class="modal-header">
          <h5 class="modal-title">Crear usuario</h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Nombre completo </label>
              <input
                v-model.trim="data_create.fullname"
                required
                type="text"
                placeholder="Nombre"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Email </label>
              <input
                v-model.trim="data_create.email"
                required
                type="email"
                placeholder="email@email.com"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Telefono </label>
              <input
                v-model.trim="data_create.phone"
                required
                type="text"
                placeholder="(+57)"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Dirección </label>
              <input
                v-model.trim="data_create.address"
                required
                type="text"
                placeholder="cra 43 #53-43"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Tipo de documento </label>
              <select
                v-model.trim="data_create.document_type_id"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="" disabled selected>Tipo de documento</option>
                <option
                  v-for="(option, index) in documentTypes"
                  :key="index"
                  :value="option.id"
                >
                  {{ option.name }}
                </option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="" class="mb-2"> Documento </label>
              <input
                v-model.trim="data_create.document"
                required
                type="number"
                placeholder="122434353"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-outline-success"
            @click.prevent="closeModal"
          >
            Cerrar
          </button>
          <button type="button" class="btn btn-success" @click.prevent="createUser">
            Crear usuario
          </button>

          <loading-spinner :loading="isLoading" />

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios"
import LoadingSpinner from '../LoadingSpinner.vue'


export default {
  props: ["closeModal", "documentTypes"],

  components: {LoadingSpinner},

  data() {
    return {
      data_create: {
        fullname: "",
        email: "",
        phone: "",
        address: "",
        document: "",
        document_type_id: "",
      },

      isLoading: false,
    };
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

    clearForm() {
      this.fullname = "";
      this.email = "";
      this.phone = "";
      this.address = "";
      this.document = "";
    },

    createUser() {
      if (!this.data_create.fullname) {
        this.showWarningAlert("El nombre del usuario es requerido")
      } else if (!this.data_create.email) {
        this.showWarningAlert("El correo es requerido")
      } else if (!this.isValidEmail(this.data_create.email)) {
        this.showWarningAlert("Ingresa un email válido")
      } else if (!this.data_create.phone) {
        this.showWarningAlert("El número de teléfono es requerido")
      } else if (!this.data_create.address) {
        this.showWarningAlert("La dirección es requerida")
      } else if (!this.data_create.document_type_id) {
        this.showWarningAlert("El tipo de documento es requerido")
      } else if (!this.data_create.document) {
        this.showWarningAlert("El número de documento es requerido")
      } else {
        this.isLoading = true
        axios
          .post("http://localhost:8000/api/users", this.data_create)
          .then((response) => {
            this.showSuccessAlert(response.data.message);
            this.isLoading = false
            this.clearForm();
            this.closeModal();
          })
          .catch((error) => {
            const errorMessage = error.response.data.message || "Error al crear usuario";
            console.error(errorMessage);
            this.isLoading = false
          });
      }
    },
  },
};
</script>
