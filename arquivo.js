
//constantes e valores
const selectNumeros = document.getElementById("numeros");
const botaoMais = document.getElementById("btn-mais");
const inputDescricao = document.getElementById("descricao");
const inputTitulo = document.getElementById("titulo");
const selectStatus = document.getElementById("status");
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaAdicionar");
let salvoClicou = false;

    

//select "numeros"
for(let i = 1; i<=10; i++)
{
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    selectNumeros.appendChild(option);
}

//button "salvar"
janelaJogos.style.display = 'none';
salvar.addEventListener("click", function() {
    //futuramente irei utilizar a lógica para salvar os elementos
    salvoClicou = true;
    /* 
    if (!salvoClicou)
    {
        salvoClicou = true;
        console.log("botão foi clicado painho e ele é " + salvoClicou);
    } */


    const descricaoDigitado = inputDescricao.value;
    const tituloDigitado = inputTitulo.value;
    const statusEscolhido = selectStatus.value;
    const numeroEscolhido = selectNumeros.value;
    const novoCartaoHTML = `
        <div class="cartaoJogo">
            <button class = "botaoCartaoJogo"></button>
           
            <div class="info-cartao">
                <h3>${tituloDigitado}</h3>
                <span class="etiqueta-status">${statusEscolhido}</span>
            </div>
        </div>
    `;

    botaoMais.insertAdjacentHTML('beforebegin', novoCartaoHTML);

  

//janela nova
    const cartaoRecemCriado = botaoMais.previousElementSibling;
    const botaoCartaoJogo = cartaoRecemCriado.querySelector(".botaoCartaoJogo");
    const cartaoJogo = document.getElementById("cartaoJogo");
    botaoCartaoJogo.addEventListener("click", function(){
        
    const JanelaExibirCartaoJogo = `
        <div class="exibirCartaoJogo">
        <h3>${tituloDigitado}</h3>
            <div class="infoJanelaCartaoJogo">
                 <img class = "imagemJECJ" src = "tiny.png"></img>
                <div class = "tagsJECJ"> 
                    <span class="etiqueta-status">${statusEscolhido}</span>
                    <p>${descricaoDigitado}</p>
                    <p>${numeroEscolhido}</p> 
                </div>
            </div>
        </div>
    `;
    
     document.body.insertAdjacentHTML('beforebegin', JanelaExibirCartaoJogo);
    if (JanelaExibirCartaoJogo != null)
    {
        console.log("pegou essa porra");

    }

    });
      inputTitulo.value = '';
    inputDescricao.value = '';
    selectStatus.selectedIndex = 0; 
    selectNumeros.selectedIndex = 0; 

    console.log("Descrição do jogo salva:", descricaoDigitado);
    console.log("Título do jogo salvo:", tituloDigitado);
    console.log("Status do jogo salvo:", statusEscolhido);
    console.log("Número do jogo salvo:", numeroEscolhido);
    
    janelaJogos.style.display = 'none';


});


//button "cancelar" de janelaJogos
const buttonCancelarJanelaJogos = document.getElementById("btn-cancelar-janelaJogos");
buttonCancelarJanelaJogos.addEventListener("click", function(){
    janelaJogos.style.display = 'none';
});

//button "mais" de janelaJogos
const mais = document.getElementById ("btn-mais");
mais.addEventListener("click", function(){
    janelaJogos.style.display = 'block';
});

