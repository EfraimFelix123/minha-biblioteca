
const botao = document.getElementById('btn-toggle');
const sidebar = document.getElementById('minha-sidebar');

// Ouvinte de evento para o clique
botao.addEventListener('click', () => {
  
  sidebar.classList.toggle('recolhida');
  
});