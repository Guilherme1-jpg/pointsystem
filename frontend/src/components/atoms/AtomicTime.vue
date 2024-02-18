<template>
  <div class="time" v-if="value">{{ value }}</div>
</template>

<script>
export default {
  props: ['value'],
};
</script>
