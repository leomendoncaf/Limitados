// helpers.js

// formata um valor numérico em formato de moeda brasileira
function formatCurrency(value) {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  }
  
  module.exports = {
    formatCurrency,
  };
  