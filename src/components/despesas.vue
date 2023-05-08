<template>
  <div class="despesas">
    <h2>Despesas</h2>
    <form @submit.prevent="adicionarDespesa">
      <div class="form-group">
        <label for="descricao">Descrição:</label>
        <input type="text" id="descricao" v-model="novaDespesa.descricao" required>
      </div>
      <div class="form-group">
        <label for="valor">Valor:</label>
        <input type="number" id="valor" v-model="novaDespesa.valor" required>
      </div>
      <div class="form-group">
        <button type="submit">Adicionar Despesa</button>
      </div>
    </form>
    <div class="lista-despesas">
      <h3>Lista de Despesas:</h3>
      <ul>
        <li v-for="despesa in despesas" :key="despesa.id">
          {{ despesa.descricao }} - R$ {{ despesa.valor }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      novaDespesa: {
        descricao: '',
        valor: '',
      },
      despesas: [],
      proximoId: 1,
    };
  },
  methods: {
    adicionarDespesa() {
      this.despesas.push({
        id: this.proximoId++,
        descricao: this.novaDespesa.descricao,
        valor: this.novaDespesa.valor,
      });
      this.novaDespesa.descricao = '';
      this.novaDespesa.valor = '';
    },
  },
}
</script>

<style>
/* Estilos do componente Despesas */

.despesas {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.despesas h2 {
  margin-top: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block;
}

.form-group input {
  width: 100%;
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-group button {
  padding: 0.5rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  background-color: #fff;
  cursor: pointer;
}

.form-group button:hover {
  background-color: #ccc;
}

.lista-despesas h3 {
  margin-top: 0;
}

.lista-despesas ul {
  margin: 0;
  padding: 0;
}

.lista-despesas li {
  list-style: none;
}
</style>
