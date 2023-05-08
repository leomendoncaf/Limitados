<template>
  <div class="usuario">
    <h2>{{ usuario.nome }}</h2>
    <p>E-mail: {{ usuario.email }}</p>
    <p>Saldo: R$ {{ usuario.saldo.toFixed(2) }}</p>
    <button @click="removerUsuario">Remover usuário</button>
  </div>
</template>

<script>
export default {
  props: {
    usuario: {
      type: Object,
      required: true,
    },
    remover: {
      type: Function,
      required: true,
    },
  },
  methods: {
    removerUsuario() {
      this.remover(this.usuario.id)
    },
  },
}
</script>

<style>
/* Estilos do componente UsuarioVue */

.usuario {
  margin-bottom: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
}

.usuario h2 {
  margin-top: 0;
}

.usuario button {
  margin-top: 0.5rem;
  padding: 0.5rem;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.usuario button:hover {
  background-color: #c82333;
}
</style>
