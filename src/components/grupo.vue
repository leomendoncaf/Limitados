<template>
  <div class="grupo">
    <h2>{{ grupo.nome }}</h2>
    <div class="participantes">
      <h3>Participantes:</h3>
      <ul>
        <li v-for="participante in grupo.participantes" :key="participante">{{ participante }}</li>
      </ul>
    </div>
    <div class="despesas">
      <h3>Despesas:</h3>
      <ul>
        <li v-for="despesa in grupo.despesas" :key="despesa.id">
          {{ despesa.descricao }} - R$ {{ despesa.valor }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    grupo: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
/* Estilos do componente Grupo */

.grupo {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
  margin-bottom: 2rem;
}

.participantes {
  margin-bottom: 1rem;
}

.participantes h3 {
  margin-top: 0;
}

.participantes ul {
  margin: 0;
  padding: 0;
}

.participantes li {
  list-style: none;
}

.despesas h3 {
  margin-top: 0;
}

.despesas ul {
  margin: 0;
  padding: 0;
}

.despesas li {
  list-style: none;
}
</style>
