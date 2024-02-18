<template>
  <div>
    <Button @click="openModal" :label="buttonLabel" />
    <Dialog v-model:visible="showModal" modal header="Registrar Entrada/Saída" :style="{ width: '50vw' }" :breakpoints="{ '1199px': '75vw', '575px': '90vw' }">
      <p class="m-0" v-if="registeringEntry">
        <label for="name">Nome:</label>
        <InputText id="name" v-model="name" />
        <Button @click="saveName" label="Salvar" />
      </p>
      <p class="m-0" v-else>
        Você está prestes a registrar uma saída. Confira as informações abaixo antes de confirmar:
        <div class="exit-info">
          <div v-for="(record, index) in records" :key="index">
            <strong>Nome:</strong> {{ record.name }}
          </div>
          <div>
            <strong>Horário de Entrada:</strong> {{ entryTime }}
          </div>
          <div v-if="exitTimeExpected">
            <strong>Horário de Saída Previsto:</strong> {{ exitTimeExpected }}
          </div>
        </div>
        <div class="p-d-flex p-jc-end">
          <Button @click="confirmExit" label="Confirmar Saída" class="p-button-danger" />
        </div>
      <!--eslint-disable-next-line vue/no-parsing-error-->
      </p>
    </Dialog>
    <div v-if="successMessage" class="success-message">
      {{ successMessage }}
    </div>
    <div v-if="time" class="time">{{ time }}</div>
    <div v-if="entryTime && !showModal" class="entry-time">
      Horário de Entrada: {{ entryTime }}
    </div>
  </div>
</template>

<script>
import { Button } from 'primevue/button';
import { Dialog } from 'primevue/dialog';
import { InputText } from 'primevue/inputtext';
import axios from 'axios';

export default {
  components: {
    Button,
    Dialog,
    InputText,
  },
  data() {
    return {
      time: null,
      records: [],
      registeringEntry: true,
      showModal: false,
      name: localStorage.getItem('name') || '',
      entryTime: localStorage.getItem('entryTime') || '',
      exitTimeExpected: '',
      successMessage: '',
    };
  },
  computed: {
    buttonLabel() {
      return this.registeringEntry ? 'Registrar Entrada' : 'Registrar Saída';
    },
    nameExit() {
      return this.name || 'Não informado';
    },
  },
  methods: {
    openModal() {
      this.showModal = true;
      if (!this.registeringEntry) {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        this.exitTimeExpected = `${hours}:${minutes}`;
      }
    },
    closeModal() {
      this.showModal = false;
      this.name = '';
      this.exitTimeExpected = '';
    },
    saveName() {
  if (this.registeringEntry) {
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0];
    const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const recordType = this.registeringEntry ? 'Entrada' : 'Saída';

    this.records.push({ type: recordType, dateTime: `${currentDate} ${currentTime}`, name: this.name });
    this.entryTime = `${currentDate} ${currentTime}`;

    localStorage.setItem('name', this.name);
    localStorage.setItem('entryTime', this.entryTime);

    this.registeringEntry = !this.registeringEntry;
  }

  this.closeModal();

  this.successMessage = 'Entrada registrada com sucesso!';
  setTimeout(() => {
    this.successMessage = '';
  }, 3000);
},
confirmExit() {
  const now = new Date();
  const currentDate = now.toISOString().split('T')[0];
  const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  const exitTime = `${currentDate} ${currentTime}`;
  const recordType = 'Saída';

  const name = localStorage.getItem('name');
  const entryTime = localStorage.getItem('entryTime');

  this.records.push({ type: recordType, dateTime: exitTime, name, entryTime });

  axios.post('http://localhost:3000/points', {
    name,
    entryTimestamp: entryTime,
    exitTimestamp: exitTime,
  })
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error('Error:', error);
  });

  localStorage.removeItem('name');
  localStorage.removeItem('entryTime');

  this.closeModal();

  this.successMessage = 'Saída registrada com sucesso!';
  setTimeout(() => {
    this.successMessage = '';
    location.reload();
  }, 2000);
},
  },
};
</script>

<style scoped>
.time {
  margin-top: 10px;
  font-size: 18px;
}

.entry-time {
  margin-top: 10px;
  font-size: 16px;
  color: #555;
}

.exit-info {
  margin-top: 10px;
}

.success-message {
  background-color: #4CAF50;
  color: white;
  text-align: center;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1;
}
</style>
