<template>
    <div class="modal fade bd-example-modal-lg" v-if="showModal" id="edit_count" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <label> Editar </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: {
    showModal: {
      type: Boolean,
      required: true
    }
  }
};
</script>