
const botao = document.getElementById('btn-toggle');
const sidebar = document.getElementById('minha-sidebar');

// Ouvinte de evento para o clique
botao.addEventListener('click', () => {
  
  // O método 'toggle' é perfeito pra isso. 
  // Se a sidebar já tem a classe 'recolhida', ele tira. Se não tem, ele coloca.
  sidebar.classList.toggle('recolhida');
  
});