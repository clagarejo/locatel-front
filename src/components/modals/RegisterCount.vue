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
      <div class="modal-content">
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

            <div class="row" v-if="show_count">
              <div class="col-md-6 mb-3 d-flex flex-column">
                <label for="" class="mb-2">
                  <strong> Información decuenta </strong>
                </label>
                <span>
                  <strong> Nombre de usuario </strong> :
                  {{ account_data.transaction.name }}
                </span>
                <span>
                  <strong> Saldo </strong> :
                  {{ account_data.transaction.amount }}
                </span>
                <span>
                  <strong> Número de cuenta </strong> :
                  {{ account_data.transaction.id }}
                </span>
                <span>
                  <strong> Telefono </strong> :
                  {{ account_data.transaction.phone }}
                </span>
                <span>
                  <strong> Direccion de usuario </strong> :
                  {{ account_data.transaction.address }}
                </span>
                <span>
                  <strong> Movimientos </strong> :
                  {{ account_data.transaction.transaction_type_name }}
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
          </div>
        </div>

        <div class="modal-footer">
          <button type="submit" class="btn btn-success" @click.prevent="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["closeModal"],

  data() {
    return {
      account_data: [],
      transactionsType: [],


      edit_data: {
        typeTransaction: null,
        amount: null
      },


      show_count: false,
      show_transactions: false,
      account_number: "",
    };
  },

  methods: {
    consultCount(id) {
      if (this.account_number != "") {
        this.show_count = true;

        axios
          .get(`http://localhost:8000/api/transactions/${id}`)
          .then((response) => {
            this.account_data = response.data;
            console.log(this.account_data, "data account");
            this.getTransactionsType();
          })
          .catch((error) => {
            console.error("Error al obtener los usuarios:", error);
          });
      }
    },

    getTransactionsType() {
      axios
        .get(`http://localhost:8000/api/transactions_type`)
        .then((response) => {
          this.transactionsType = response.data;
          console.log(this.transactionsType, "tipo de transacciones");
        })
        .catch((error) => {
          console.error("Error al obtener los usuarios:", error);
        });
    },

    showTransaction() {
      this.show_transactions = true;
    },

    changeTransaction() {
      this.closeModal();
      this.account_data = []
      this.transactionsType = []
      this.edit_data.typeTransaction = null
      this.edit_data.amount = null
      this.show_count = false
      this.show_transactions = false
      this.account_number = ""
      
      // axios
      //   .put(`http://localhost:8000/api/accounts/${id}`, this.edit_data)
      //   .then((response) => {
      //     console.log("Total editado correctamente");

         
      //   })
      //   .catch((error) => {
      //     console.error("Error al editar el total:", error);
      //   });
    },
  },
};
</script>
