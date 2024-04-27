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
    updateUser(userId) {
      axios
        .put(`http://localhost:8000/api/users/${userId}`, this.editUser)
        .then((response) => {
          console.log("Usuario editado correctamente");
          this.closeModal()
        })
        .catch((error) => {
          console.error("Error al editar usuario:", error);
        });
    },
  },
};
</script>
