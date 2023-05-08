<template>
  <form @submit.prevent="criarDespesa">
    <div>
      <label for="descricao">Descrição:</label>
      <input type="text" id="descricao" v-model="descricao">
    </div>
    <div>
      <label for="valor">Valor:</label>
      <input type="number" id="valor" v-model="valor">
    </div>
    <div>
      <label>Participantes:</label>
      <div v-for="(participante, index) in participantes" :key="index">
        <input type="checkbox" :id="`participante_${index}`" :value="participante" v-model="participantesSelecionados">
        <label :for="`participante_${index}`">{{ participante }}</label>
      </div>
    </div>
    <button type="submit">Criar Despesa</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      descricao: '',
      valor: null,
      participantes: ['João', 'Maria', 'Pedro', 'Ana'],
      participantesSelecionados: [],
    }
  },
  methods: {
    criarDespesa() {
      const despesa = {
        descricao: this.descricao,
        valor: this.valor,
        participantes: this.participantesSelecionados,
      }
      this.$emit('despesa-criada', despesa)
      this.limparFormulario()
    },
    limparFormulario() {
      this.descricao = ''
      this.valor = null
      this.participantesSelecionados = []
    },
  },
}
</script>

<style>

form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="number"] {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
  line-height: 1.5rem;
}

input[type="checkbox"] {
  margin-right: 0.5rem;
}

button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007aff;
  color: #fff;
  font-size: 1rem;
  line-height: 1.5rem;
  cursor: pointer;
}

button:hover,
button:focus {
  background-color: #0062cc;
}
</style>
