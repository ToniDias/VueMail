<template>
  <div class="modal">
    <div class="overlay" @click="emit('close-modal')"></div>
    <div class="modal-card">
      <slot />
    </div>
  </div>
</template>

<script>
import { onBeforeUnmount } from 'vue'
export default {
  setup(props, { emit }) {
    let onKeydown = (event) => {
      if (event.key === 'Escape') {
        emit('close-modal')
      }
    }
    window.addEventListener('keydown', onKeydown)
    onBeforeUnmount(() => {
      window.removeEventListener('close-modal')
    })
    return {
      emit,
    }
  },
}
</script>

<style scoped></style>
