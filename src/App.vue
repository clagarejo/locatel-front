<template>
  <div class="container">
    <div class="row mt-5">
      <div class="col-md-6 ml-3">
        <button disabled type="button" class="btn btn-primary py-2 px-5">
          Icono
        </button>
      </div>
      <div class="col-md-6 d-flex justify-content-end">
        <button type="button" class="btn btn-primary py-2 px-5">
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
            <td class="d-flex">
              <a href="#">
                <font-awesome-icon icon="edit" />
              </a>

              <a href="#">
                <font-awesome-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
          <tr>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
            <td>@fat</td>
            <td>@fat</td>
            <td class="d-flex">
              <a href="#">
                <font-awesome-icon icon="edit" />
              </a>

              <a href="#">
                <font-awesome-icon icon="trash-alt" />
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup></script>

<style scoped></style>
