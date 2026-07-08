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
//abrirInformacoes.style.display = 'none';

let salvouNumeros = false;
let salvoClicou = false;

//biblioteca
let biblioteca = [];


//salvarJanela
salvar.addEventListener("click", function() {

    //jogos
    const novoJogo = {
    id: Date.now(), 
    titulo: inputTitulo.value,
    descricao: inputDescricao.value,
    status: selectStatus.value,
    nota: selectNumeros.value
}
    biblioteca.push(novoJogo);

    inputTitulo.value = '';
    inputDescricao.value = '';
    selectStatus.selectedIndex = 0; 
    selectNumeros.selectedIndex = 0; 
    janelaJogos.style.display = 'none';
    janelaJogos.style.display = 'none';

    renderizarTela();
});
//função 
function renderizarTela()
{
    const ultimoJogo = biblioteca[biblioteca.length-1];
    let novoCartaoHTML = `
            <div class="cartaoJogo" data-id="${ultimoJogo.id}>
                <button class="botaoCartaoJogo"></button>
                <div class="info-cartao">
                    <h3>${ultimoJogo.titulo}</h3>
                    <span class="etiqueta-status">${ultimoJogo.status}</span>
                </div>
            </div>
            `;

        let estanteDestino;
        if (ultimoJogo.status === "jogando")
        {
            estanteDestino = botaoJogando;

        } else if (ultimoJogo.status === "jogado")
        {
            estanteDestino = botaoJogado;

        } else if (ultimoJogo.status === "interesse")
        {
            estanteDestino = botaoTenhoInteresse;
        } else if (ultimoJogo.status === "abandonado")
        {
            estanteDestino = botaoAbandonado;
        }
        botaoMais.insertAdjacentHTML("afterend", novoCartaoHTML);
        estanteDestino.insertAdjacentHTML("afterend", novoCartaoHTML);   


        
       
}

function abrirInfo()
{
    console.log("renner é viado");
}

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

//delegações
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.querySelector(".btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const selectNumeros = document.getElementById("numerosJECJ");
    const descricaoInputECJ = document.getElementById("descricaoInputECJ");
    const cartao = event.target.closest(".cartaoJogo");

    if (!cartao) return;

    abrirInfo();
    
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
   
});




//button "cancelar" de janelaJogos
const buttonCancelarJanelaJogos = document.getElementById("btn-cancelar-janelaJogos");
buttonCancelarJanelaJogos.addEventListener("click", function(){
    janelaJogos.style.display = 'none';
});

//button "mais" de janelaJogos
const mais = document.querySelector (".btn-mais");
mais.addEventListener("click", function(){
    janelaJogos.style.display = 'block';
});

