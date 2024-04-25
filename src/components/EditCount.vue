<template>
    <div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-lg">
            <div class="modal-content">
                <label> Editar </label>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  props: ['showModal', 'openModal'], 

  watch: {
    showModal(newValue) {
        console.log(newValue, 'nuevo valor')
      if (newValue) {
        this.openModal();
      }
    }
  },
};
</script>