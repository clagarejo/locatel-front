<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-4 ml-3">
        <button disabled type="button" class="btn py-3 px-5">
          <font-awesome-icon icon="coins" />
        </button>
      </div>
      <div class="col-md-8 d-flex justify-content-around">
        <div class="">
          <button
            type="button"
            class="btn btn-primary py-3 px-5 mr-2"
            @click.prevent="openModal('#create_count')"
          >
            Crear cuenta de ahorros
          </button>
        </div>

        <div class="">
          <button
            type="button"
            class="btn btn-primary py-3 px-5 mr-2"
            @click.prevent="openModal('#register_count')"
          >
            Consignar
          </button>
        </div>

        <div class="">
          <button
            type="button"
            class="btn btn-primary py-3 px-5 mr-2"
            @click.prevent="openModal('#withdraw_count')"
          >
            Retirar dinero
          </button>
        </div>

        <div>
          <button
            type="button"
            class="btn btn-primary py-3 px-5"
            @click.prevent="openModal('#consult_count')"
          >
            Consultar saldo
          </button>
        </div>

      </div>
    </div>

    <div class="mt-5">
      <table class="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nombre</th>
            <th scope="col">Valor inicial de cuenta</th>
            <th scope="col">Número de cuenta</th>
            <th scope="col">Valor por consignar</th>
            <th scope="col">Valor por retirar</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td class="d-flex justify-content-around">
              <a
                type="button"
                class="size-icon"
                @click.prevent="openModal('#edit_count')"
              >
                <font-awesome-icon icon="edit" />
              </a>

              <a class="size-icon">
                <font-awesome-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal para crear -->
    <div class="modal fade" id="create_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Crear cuenta de ahorros </h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="">Nombre</label>
                  <input required type="text" placeholder="Nombre" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Valor inicial de cuenta</label>
                  <input required type="Number" placeholder="Valor inicial de cuenta" class="form-control" />
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click.prevent="changeStatus">Cambiar</button>
            </div>

          </div>
        </div>
    </div>

    <!-- Modal para consignar -->
    <div class="modal fade" id="register_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Consignar </h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="">Número de cuenta</label>
                  <input required type="text" placeholder="Número de cuenta" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Valor por consignar</label>
                  <input required type="Number" placeholder="Valor por consignar" class="form-control" />
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click.prevent="changeStatus">Cambiar</button>
            </div>

          </div>
        </div>
    </div>

    <!-- Modal para retirar -->
    <div class="modal fade" id="withdraw_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Retirar dinero </h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="">Número de cuenta</label>
                  <input required type="text" placeholder="Número de cuenta" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Valor por retirar</label>
                  <input required type="Number" placeholder="Valor por retirar" class="form-control" />
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click.prevent="changeStatus">Cambiar</button>
            </div>

          </div>
        </div>
    </div>

    <!-- Modal para consultar saldo -->
    <div class="modal fade" id="consult_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Consultar saldo </h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="">Número de cuenta</label>
                  <input required type="text" placeholder="Número de cuenta" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Saldo</label>
                  <input required type="Number" placeholder="Saldo" class="form-control" />
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click.prevent="changeStatus">Cambiar</button>
            </div>

          </div>
        </div>
    </div>
    <!-- <EditCount :modalId="modalId" /> -->

    <!-- Modal para editar -->
    <div class="modal fade" id="edit_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title"> Editar cuenta </h5>
            </div>

            <div class="modal-body">
              <div class="row">
                <div class="col-md-6 mb-3">
                  <label for="">Nombre</label>
                  <input required type="text" placeholder="Nombre" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Valor inicial de cuenta</label>
                  <input required type="Number" placeholder="Valor inicial de cuenta" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Número de cuenta </label>
                  <input required type="Number" placeholder="Número de cuenta" class="form-control" />
                </div>

                <div class="col-md-6 mb-3">
                  <label for="">Valor por consignar </label>
                  <input required type="Number" placeholder="Valor por consignar" class="form-control" />
                </div>

                <div class="col-md-6">
                  <label for="">Valor por retirar </label>
                  <input required type="Number" placeholder="Valor por retirar" class="form-control" />
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
              <button type="button" class="btn btn-primary" @click.prevent="changeStatus">Cambiar</button>
            </div>

          </div>
        </div>
    </div>

  </div>
</template>

<script>
import { Modal } from 'bootstrap';


import EditCount from "./components/EditCount.vue";

export default {
  components: {EditCount},

  data() {
    return {
      modalOpen: false,
    };
  },

  methods: {
    openModal(id) {  
      const modalId = id.startsWith('#') ? id.slice(1) : id;
      const modal = document.getElementById(modalId);
      this.modalOpen = new Modal(modal);

      this.modalOpen.show();
    },

    closeModal() {
      this.modalOpen.hide()
    }
  },
};
</script>

<style scoped>
.size-icon {
  font-size: 23px;
}
</style>
