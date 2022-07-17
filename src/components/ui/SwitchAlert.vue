<template>
  <div>
    <!-- if 204 shoe green alert else red -->
    <div
      v-if="showcondition"
      :class="[{ 'alert-success': success }, { 'alert-danger': err }]"
    >
      <!-- if scusses here mean 204 then show scusses msg else msgerr -->
      <h4 class="text-center py-3 shadow">
        {{ success ? msgsucc : msgerr }}
      </h4>
    </div>
  </div>
</template>
<script>
export default {
  props: ["showcondition", "success", "err", "msgsucc", "msgerr"],
};
</script>
