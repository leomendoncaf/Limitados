<template>
  <div class="container">
    <h1>Visualização de Despesas</h1>
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Valor</th>
          <th>Participantes</th>
          <th>Saldo</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="despesa in despesas" :key="despesa.id">
          <td>{{ despesa.descricao }}</td>
          <td>R$ {{ despesa.valor }}</td>
          <td>
            <ul>
              <li v-for="participante in despesa.participantes" :key="participante.id">{{ participante.nome }}</li>
            </ul>
          </td>
          <td>
            <ul>
              <li v-for="saldo in despesa.saldos" :key="saldo.usuario_id">
                {{ saldo.nome }} deve receber R$ {{ saldo.valor }} 
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VisualizacaoDespesas',
  data() {
    return {
      despesas: [],
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/api/despesas');
      this.despesas = response.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 0.5rem;
  text-align: left;
  border-bottom: 1px solid #ccc;
}

th {
  background-color: #eee;
  font-weight: bold;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
  margin-bottom: 0.2rem;
}
</style>
