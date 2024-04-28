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
              <label for="" class="mb-2"> Usuarios </label>
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
          <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
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
    createCount(data) {
      console.log(data, "data");
      axios
        .post(`http://localhost:8000/api/accounts`, this.account_create)
        .then((response) => {
          this.$swal({
            title: "Éxito",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "¡Genial!",
          });
          this.closeModal();
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || "Error al crear una cuenta";
          this.$swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "!Aush!",
          });
        });
    },
  },
};
</script>
