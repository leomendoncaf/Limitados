<template>
  <div class="lista-grupos">
    <h3>Lista de Grupos:</h3>
    <ul>
      <li v-for="grupo in grupos" :key="grupo.id">
        {{ grupo.nome }} - {{ grupo.participantes.length }} participante(s)
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    grupos: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style>
/* Estilos do componente ListaGrupos */

.lista-grupos {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 1rem;
}

.lista-grupos h3 {
  margin-top: 0;
}

.lista-grupos ul {
  margin: 0;
  padding: 0;
}

.lista-grupos li {
  list-style: none;
}
</style>
