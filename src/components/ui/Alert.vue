<template>
  <div class="alert" :class="'alert-' + variant"><slot></slot></div>
</template>

<script>
export default {
  props: {
    variant: {
      type: String,
      default: 'danger',
    }
  }
}
</script>
