<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6 ml-3">
        <button disabled type="button" class="btn py-3 px-5">
          <font-awesome-icon icon="coins" />
        </button>
      </div>
      <div class="col-md-6 d-flex justify-content-end">
        <button
          type="button"
          class="btn btn-primary py-3 px-5"
          @click.prevent="openModal('#create_count')"
        >
          Agregar cuenta
        </button>
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

   
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  components: {},

  data() {
    return {
      modalOpen: false,
    };
  },

  methods: {
  
    openModal(id) {
      $(id).modal({
        escapeClose: false,
        clickClose: false,
        showClose: false
      });
    }
  },
};
</script>

<style scoped>
.size-icon {
  font-size: 23px;
}
</style>
