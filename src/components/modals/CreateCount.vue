<template>
  <div
    class="modal fade"
    id="create_count"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">Crear cuenta de ahorros</h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for=""> Usuarios </label>
              <select
                v-model.trim="account_create.user_id"
                class="form-select"
                aria-label="Default select example"
              >
                <option value="" disabled selected>Usuarios...</option>
                <option v-for="(option, index) in users" :key="index" :value="option.id">
                  {{ option.name }}
                </option>
              </select>
            </div>

            <div class="col-md-6 mb-3">
              <label for="">Valor inicial de cuenta</label>
              <input
                v-model.trim="account_create.total_amount"
                required
                type="number"
                placeholder="Valor inicial de cuenta"
                class="form-control"
              />
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-outline-success" @click.prevent="cleanForm">Cerrar</button>
          <button type="button" class="btn btn-success" @click.prevent="createCount">
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["closeModal", "users"],

  data() {
    return {
      account_create: {
        user_id: null,
        total_amount: null,
      },
    };
  },

  methods: {
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

    showSuccessError(message) {
      this.$swal({
        title: "Éxito",
        text: message,
        icon: "success",
        confirmButtonText: "¡Genial!",
      });
    },

    createCount() {
      if (!this.account_create.user_id) {
        this.showWarningAlert("El usuario es requerido")
      } else if (!this.account_create.total_amount) {
        this.showWarningAlert("El monto total es requerido")
      } else {
        axios
          .post(`http://localhost:8000/api/accounts`, this.account_create)
          .then((response) => {
            this.showSuccessAlert(response.data.message);
            this.closeModal();
            this.cleanForm()
          })
          .catch((error) => {
            const errorMessage = error.response.data.message || "Error al crear una cuenta";
            this.showSuccessError(errorMessage)
          });
      }
    },

    cleanForm() {
      this.account_create.user_id = null;
      this.account_create.total_amount = null;
      this.closeModal();
    },
  },
};
</script>
