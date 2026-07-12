//constantes e valores
const selectNumeros = document.querySelector(".numeros");
const selectStatus = document.querySelector(".status");
const inputDescricao = document.getElementById("descricao");
const botaoMais = document.querySelector(".btn-mais");
const inputTitulo = document.getElementById("titulo");
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaAdicionar");
const exibirCartaoJogo = document.querySelector(".exibirCartaoJogo");
const main = document.getElementById("main");
const jogando = document.querySelector(".jogando");
const botaoJogando = jogando.querySelector(".btn-mais");
const abandonado = document.querySelector(".abandonado");
const botaoAbandonado = abandonado.querySelector(".btn-mais");
const jogado = document.querySelector(".jogado");
const botaoJogado = jogado.querySelector(".btn-mais");
const tenhoInteresse = document.querySelector(".tenhoInteresse");
const botaoTenhoInteresse = tenhoInteresse.querySelector(".btn-mais");
const abrirInformacoes = document.querySelector(".exibirCartaoJogo");

let salvouNumeros = false;
let salvoClicou = false;
let modoJanela = janelaJogos.dataset.modo;
let idTemporario;

//biblioteca
let biblioteca = [];
let jogoSendoEditado;


//salvarJanela

    
    salvar.addEventListener("click", function () {
        if (modoJanela == "criar")
        {
            
            //jogos
            const novoJogo = {
            id: Date.now(), 
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            status: selectStatus.value,
            nota: selectNumeros.value
            }
            idTemporario = novoJogo.id;

            biblioteca.push(novoJogo);

            if (novoJogo.titulo == "")
            {
                window.alert("preencha os dados ou cancele");
            }
           
  
        }
        else if (modoJanela == "editar")
        {
            jogoSendoEditado = biblioteca.find(jogo => jogo.id == idTemporario);

            if(inputTitulo.value == "")
            {
                window.alert("preencha os dados ou cancele");
                fecharJanela()
            }

            if (jogoSendoEditado)
            {
                jogoSendoEditado.titulo = inputTitulo.value;
                jogoSendoEditado.descricao = inputDescricao.value;
                jogoSendoEditado.status = selectStatus.value;
                jogoSendoEditado.nota = selectNumeros.value;
            }
           
            console.log(jogoSendoEditado.titulo, jogoSendoEditado.status);
            
        } 
            inputTitulo.value = '';
            inputDescricao.value = '';
            selectStatus.selectedIndex = 0; 
            selectNumeros.selectedIndex = 0; 
           
            fecharJanela();

             renderizarTela();

 
    });



//função 
function renderizarTela()
{
    document.querySelectorAll(".cartaoJogo").forEach(cartao => cartao.remove());
    
    

    biblioteca.forEach(jogo => {
        
    let novoCartaoHTML = `
            <div class="cartaoJogo" data-id="${jogo.id}">
                <button class="botaoCartaoJogo"></button>
                <div class="info-cartao">
                    <h3>${jogo.titulo}</h3>
                    <span class="etiqueta-status">${jogo.status}</span>
                </div>
            </div>
            `;
   

        let estanteDestino;
        if (jogo.status === "jogando") estanteDestino = botaoJogando;
        else if (jogo.status === "jogado") estanteDestino = botaoJogado;
        else if (jogo.status === "interesse") estanteDestino = botaoTenhoInteresse;
        else if (jogo.status === "abandonado") estanteDestino = botaoAbandonado;
        else return;
        
        botaoMais.insertAdjacentHTML("afterend", novoCartaoHTML);
        estanteDestino.insertAdjacentHTML("afterend", novoCartaoHTML); 

    });
     

}

function abrirInfo(idCartaoJogo)
{
    modoJanela = "editar";
    const jogoClicado = biblioteca.find(jogo => jogo.id == idCartaoJogo);

    if (jogoClicado) {
        
        inputTitulo.value = jogoClicado.titulo;
        inputDescricao.value = jogoClicado.descricao;
        selectStatus.value = jogoClicado.status;
        selectNumeros.value = jogoClicado.nota;
        modoEditar(); 
    }
}

//select "numeros"
for(let i = 1; i<=10; i++)
{
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    selectNumeros.appendChild(option);
}

function modocriar()
{
    modoJanela = "criar";
    janelaJogos.querySelector(".botoes").lastElementChild.style.display = 'none';
    console.log(modoJanela);
    janelaJogos.style.display = 'block';
    
}

function modoEditar()
{
    modoJanela = "editar";
    janelaJogos.querySelector(".botoes").lastElementChild.style.display = 'block';
    console.log(modoJanela);
    janelaJogos.style.display = 'block';
}

//button "salvar"
fecharJanela()

//DELEGAÇÕES
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.querySelector(".btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const selectNumeros = document.getElementById("numerosJECJ");
    const descricaoInputECJ = document.getElementById("descricaoInputECJ");
    const cartao = event.target.closest(".cartaoJogo");

    if (cartao) 
    {
       idTemporario = cartao.dataset.id;
        abrirInfo(idTemporario);
    }

   
    
    if (event.target.id ===  "numerosJECJ") {
        const selectNumeros = event.target;

        if (selectNumeros.dataset.preenchido === "true") {
            return;
        }

        for (let i = 1; i <= 10; i++) {
            const option = document.createElement("option");
            option.textContent = i;
            option.value = i;
            selectNumeros.appendChild(option);
        }

        selectNumeros.dataset.preenchido = "true";
}
   
});//}

//button "cancelar" de janelaJogos
function fecharJanela()
{
    janelaJogos.style.display = 'none';
}
    const buttonCancelarJanelaJogos = document.getElementById("btn-cancelar-janelaJogos");
    buttonCancelarJanelaJogos.addEventListener("click", function(){
        fecharJanela()
    });
    


//button "mais" de janelaJogos
const mais = document.querySelector (".btn-mais");
mais.addEventListener("click", function(){
   modocriar();
});

