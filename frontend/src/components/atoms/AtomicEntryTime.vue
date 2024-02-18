<template>
  <div class="entry-time" v-if="value">Horário de Entrada: {{ value }}</div>
</template>

<script>
export default {
  props: ['value'],
};
</script>
