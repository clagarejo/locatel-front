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
      <div class="modal-content">
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
                placeholder="(+)"
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
          <button type="submit" class="btn" @click.prevent="closeModal">Cerrar</button>
          <button type="button" class="btn btn-success" @click.prevent="createUser">
            Crear usuario
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["closeModal", "documentTypes"],

  data() {
    return {
      data_create: {
        fullname: "",
        email: "",
        phone: "",
        address: "",
        document: "",
        document_type_id: ""
      },
    };
  },

  methods: {
    createUser() {
      axios
        .post("http://localhost:8000/api/users", this.data_create)
        .then((response) => {
          console.log("Usuario creado correctamente");
            this.fullname = "";
            this.email = "";
            this.phone = "";
            this.address = "";
            this.document = "";

            this.closeModal()
        })
        .catch((error) => {
          console.error("Error al crear usuario:", error);
        });
    },
  },
};
</script>
