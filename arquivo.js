
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
                <img class = "imagemJECJ" src = "prina.png"></img>
                <div class = "tagsJECJ"> 
                    <p><span class = "destacarTagsJECJ">STATUS:</span> ${statusEscolhido}</p>
                    <p><span class = "destacarTagsJECJ">DESCRIÇÃO:</span> ${descricaoDigitado}</p>
                    <p><span class = "destacarTagsJECJ">NOTA: </span> ${numeroEscolhido}</p> 
                </div>
            </div>
             <div class = "botoesECJ">
                <button id = "btnSalvarECJ"> salvar </button>
                <button id = "btnCancelarECJ">cancelar</button>
            </div>
        </div>
    `;

    
    
     document.body.insertAdjacentHTML('afterbegin', JanelaExibirCartaoJogo);
    if (JanelaExibirCartaoJogo)
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
    //botaoMais.style.display = 'none';
    
    janelaJogos.style.display = 'none';



});

//botões "salvar" e "cancelar" de exibirCartaoJogo
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.getElementById("btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const exibirCartaoJogo = document.querySelector(".exibirCartaoJogo");

    if (event.target.id === "btnSalvarECJ")
    {
        //modificar os select e inputs 
        alert("renner");

    }
    if (event.target.id === "btnCancelarECJ")
    {
        exibirCartaoJogo.style.display = 'none';


    }
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

