<template>
  <div
    class="modal fade"
    id="register_count"
    tabindex="-1"
    role="dialog"
    aria-labelledby="myLargeModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-lg">
      <div class="modal-content m-modal">
        <div class="modal-header">
          <h5 class="modal-title">Movimientos</h5>
        </div>

        <div class="modal-body">
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="">Número de cuenta</label>
              <input
                v-model.trim="account_number"
                required
                type="text"
                placeholder="Número de cuenta"
                class="form-control"
              />
            </div>

            <div class="col-md-6 mb-3">
              <button
                :disabled="!account_number"
                type="button"
                class="btn btn-outline-success py-2 px-5 mt-4"
                @click.prevent="consultCount(account_number)"
              >
                <font-awesome-icon icon="coins" />
              </button>
            </div>

            <div class="row ml-3" v-if="show_count">
              <div class="col-md-6 mb-3 d-flex flex-column">
                <label for="" class="mb-2">
                  <strong> Información decuenta </strong>
                </label>
                <span>
                  <strong> Nombre de usuario </strong> :
                  {{ account_data.user.name }}
                </span>
                <span>
                  <strong> Saldo </strong> :
                  {{ account_data.total_amount.toLocaleString() }}
                </span>
                <span>
                  <strong> Número de cuenta </strong> :
                  {{ account_data.id }}
                </span>
                <span>
                  <strong> Telefono </strong> :
                  {{ account_data.user.phone }}
                </span>
                <span>
                  <strong> Direccion de usuario </strong> :
                  {{ account_data.user.address }}
                </span>
                <span>
                  <strong> Movimientos </strong> :
                  <ul>
                    <li
                      v-for="(transaction, index) in account_data.transactions"
                      :key="index"
                    >
                      {{ transaction.transaction_type.name }}
                    </li>
                  </ul>
                </span>
              </div>

              <div class="col-md-6 mb-3">
                <label for="" class="mb-2"> <strong> Tipo de movimiento </strong> </label>
                <select
                  class="form-select"
                  aria-label="Default select example"
                  @change="showTransaction"
                  v-model.trim="edit_data.typeTransaction"
                >
                  <option value="" disabled selected>Tipo de movimiento</option>
                  <option
                    v-for="(option, index) in transactionsType"
                    :key="index"
                    :value="option.id"
                  >
                    {{ option.name }}
                  </option>
                </select>

                <div class="mt-3" v-if="show_transactions">
                  <input
                    v-model.trim="edit_data.amount"
                    required
                    type="text"
                    placeholder="Movimiento"
                    class="form-control"
                  />
                </div>
              </div>
            </div>

            <div class="row ml-3 text-center" v-else>
              <h6>{{ text_information }}</h6>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button
            type="submit"
            class="btn btn-outline-success"
            @click.prevent="cleanData"
          >
            Cerrar
          </button>
          <button
            :disabled="!edit_data.amount"
            type="submit"
            class="btn btn-success"
            @click.prevent="changeInformation"
          >
            Aplicar
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
  props: ["closeModal"],

  components: {LoadingSpinner},

  data() {
    return {
      account_data: [],
      transactionsType: [],
      edit_data: {
        typeTransaction: null,
        amount: null,
      },
      show_count: false,
      show_transactions: false,
      account_number: "",

      text_information: "",
      isLoading: false,
    };
  },

  methods: {
    consultCount(id) {
      this.isLoading = true
      axios
        .get(`http://localhost:8000/api/transactions/${id}`)
        .then((response) => {
          if (response.data.transaction) {
            this.show_count = true;
            this.isLoading = false
              
            this.account_data = response.data.transaction;
            this.getTransactionsType();

          } else {
            this.show_count = false;
            this.isLoading = false

            this.text_information = "La transacción no se encontró";

          }
        })
        .catch((error) => {
          this.isLoading = false
          this.text_information = error.response.data.message;
        });
    },

    getTransactionsType() {
      axios
        .get(`http://localhost:8000/api/transactions_type`)
        .then((response) => {
          this.transactionsType = response.data;
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || "Error al opteber las cuentas";
          this.$swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "!Aush!",
          });
        });
    },

    showTransaction() {
      this.show_transactions = true;
    },

    changeInformation() {
      this.isLoading = true
      axios
        .put(`http://localhost:8000/api/accounts/${this.account_number}`, this.edit_data)
        .then((response) => {
          this.$swal({
            title: "Éxito",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "¡Genial!",
          });
          this.isLoading = false
          this.closeModal();
          this.cleanData();
        })
        .catch((error) => {
          const errorMessage = error.response.data.message || "Error al crear una cuenta";
          this.isLoading = false
          this.$swal.fire({
            title: "Error",
            text: errorMessage,
            icon: "error",
            confirmButtonText: "!Aush!",
          });
        });
    },

    cleanData() {
      this.closeModal();
      this.account_data = [];
      this.transactionsType = [];
      this.edit_data.typeTransaction = null;
      this.edit_data.amount = null;
      this.show_count = false;
      this.show_transactions = false;
      this.account_number = "";
      this.text_information = ''
    },
  },
};
</script>
