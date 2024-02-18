<template>
  <Button @click="$emit('click')" :label="label" />
</template>

<script>
import { Button } from 'primevue/button';

export default {
  props: ['label'],
  components: {
    Button,
  },
};
</script>
