<template>
  <div class="lista-despesas">
    <h3>Lista de Despesas:</h3>
    <ul>
      <li v-for="despesa in despesas" :key="despesa.id">
        {{ despesa.descricao }} - R$ {{ despesa.valor }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    despesas: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
/* Estilos do componente ListaDespesas */

.lista-despesas {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
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
