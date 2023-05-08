<template>
  <div class="visualizacao-grupos">
    <h2>Meus Grupos</h2>
    <ul>
      <li v-for="grupo in grupos" :key="grupo._id">
        <router-link :to="'/grupo/' + grupo._id">{{ grupo.nome }}</router-link>
        <button @click="excluirGrupo(grupo)">Excluir</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "VisualizacaoGrupos",
  props: {
    grupos: Array,
    excluirGrupo: Function,
  },
};
</script>

<style scoped>
.visualizacao-grupos {
  display: flex;
  flex-direction: column;
  align-items: center;
}

ul {
  list-style-type: none;
  margin-top: 16px;
  padding: 0;
  width: 100%;
}

li {
  border: 1px solid black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  width: 100%;
}

a {
  color: black;
  text-decoration: none;
}
</style>
