<template>
  <div>
    <div :class="[variantClass, sizeClass]" role="status">
      <span class="visually-hidden">Loading...</span>
    </div>
  </div>
</template>

<script>
export default {
  props: ['size', 'variant'],
  computed: {
    isSm() {
      return this.size && this.size === 'sm';
    },
    isGrow() {
      return this.variant && this.variant === 'grow';
    },
    sizeClass() {
      return `spinner-${this.isGrow ? 'grow' : 'border'}-${this.isSm ? 'sm' : 'md'}`;
    },

    variantClass() {
      return `spinner-${this.isGrow ? 'grow' : 'border'}`;
    }
  },
}
</script>
