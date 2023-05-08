<template>
  <form @submit.prevent="criarGrupo">
    <div>
      <label for="nome">Nome do grupo:</label>
      <input type="text" id="nome" v-model="nome">
    </div>
    <div>
      <label for="participantes">Participantes:</label>
      <textarea id="participantes" v-model="participantes" rows="5"></textarea>
    </div>
    <button type="submit">Criar Grupo</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      nome: '',
      participantes: '',
    }
  },
  methods: {
    criarGrupo() {
      const participantesArray = this.participantes.split('\n').map(participante => participante.trim())
      const grupo = {
        nome: this.nome,
        participantes: participantesArray,
      }
      this.$emit('grupo-criado', grupo)
      this.limparFormulario()
    },
    limparFormulario() {
      this.nome = ''
      this.participantes = ''
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
