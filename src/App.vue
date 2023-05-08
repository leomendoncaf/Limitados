<template>
   <div class="app">
      <h1>Gerenciamento de Despesas</h1>
      <div class="container">
         <div class="row">
            <div class="col-sm-6">
               <FormularioDespesa @adicionarDespesa="adicionarDespesa" />
               <ListaDespesas :despesas="despesas" />
            </div>
            <div class="col-sm-6">
               <FormularioGrupo @adicionarGrupo="adicionarGrupo" />
               <ListaGrupos :grupos="grupos" />
            </div>
         </div>
      </div>
   </div>
</template>

<script>
import FormularioDespesa from "@/components/FormularioDespesa.vue";
import ListaDespesas from "@/components/ListaDespesas.vue";
import FormularioGrupo from "@/components/FormularioGrupo.vue";
import ListaGrupos from "@/components/ListaGrupos.vue";
import { v4 as uuidv4 } from "uuid";

export default {
   components: {
      FormularioDespesa,
      ListaDespesas,
      FormularioGrupo,
      ListaGrupos,
   },
   data() {
      return {
         despesas: [],
         grupos: [],
      };
   },
   methods: {
      adicionarDespesa(despesa) {
         despesa.id = uuidv4();
         this.despesas.push(despesa);
      },
      adicionarGrupo(grupo) {
         grupo.id = uuidv4();
         this.grupos.push(grupo);
      },
   },
};
</script>

<style>
/* Estilos do componente App */

.app {
   max-width: 960px;
   margin: 0 auto;
   padding: 1rem;
}

.app h1 {
   margin-top: 0;
}

.app .container {
   margin-top: 2rem;
}
</style>
