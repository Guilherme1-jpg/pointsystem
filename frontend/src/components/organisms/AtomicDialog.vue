<template>
  <Dialog :visible="dialogVisible" @update:visible="updateDialogVisible" modal header="Registrar Entrada/Saída" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
    <template v-if="registeringEntry">
      <label for="name">Nome:</label>
      <InputText id="name" v-model="name" />
      <AtomicButton @click="saveName" label="Salvar" />
    </template>
    <template v-else>
      Você está prestes a registrar uma saída. Confira as informações abaixo antes de confirmar:
      <div class="exit-info">
        <div v-for="(record, index) in records" :key="index">
          <strong>Nome:</strong> {{ record.name }}
          <br>
          <strong>Data e Horário de Entrada:</strong> {{ record.dateTime }}
          <br>
          <strong>Data e Horário de Saída:</strong> {{ record.type === 'Saída' ? record.dateTime : 'Não registrada' }}
        </div>
        <div>
          <strong>Horário de Saída Previsto:</strong> {{ exitTimeExpected }}
        </div>
      </div>
      <div class="p-d-flex p-jc-end">
        <AtomicButton @click="confirmExit" label="Confirmar Saída" class="p-button-danger" />
      </div>
    </template>
    
  </Dialog>
</template>

<script>
import { Dialog } from 'primevue/dialog';
import AtomicButton from '../atoms/AtomicButton.vue';
import { InputText } from 'primevue/inputtext';

export default {
  props: ['visible', 'registeringEntry', 'records'],
  data() {
    return {
      dialogVisible: this.visible,
    };
  },
  methods: {
    updateDialogVisible(value) {
      this.dialogVisible = value;
      this.$emit('update:visible', value);
    },
    saveName() {
      this.$emit('save');
    },
    confirmExit() {
      this.$emit('confirmExit');
    },
  },
  components: {
    Dialog,
    AtomicButton,
    InputText,
  },
};
</script>