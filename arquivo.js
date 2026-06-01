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
    document.querySelectorAll(".cartaoJogo").forEach(function(cartao) {
        cartao.remove();
    });

    biblioteca.forEach(function(jogo){

        /*document.querySelectorAll(".cartaoJogo").forEach(function(cartao){
        cartao.remove();
       }); */
        let novoCartaoHTML = `
            <div class="cartaoJogo">
                <button class="botaoCartaoJogo"></button>
                <div class="info-cartao">
                    <h3>${jogo.titulo}</h3>
                    <span class="etiqueta-status">${jogo.status}</span>
                </div>
            </div>
            `;    

            if (jogo.titulo == inputTitulo.value){
                document.querySelectorAll(".cartaoJogo").forEach(function(cartao){
                cartao.remove();
                })
            }

        let estanteDestino;
        if (jogo.status === "jogando")
        {
            estanteDestino = botaoJogando;

        } else if (jogo.status === "jogado")
        {
            estanteDestino = botaoJogado;

        } else if (jogo.status === "interesse")
        {
            estanteDestino = botaoTenhoInteresse;
        } else if (jogo.status === "abandonado")
        {
            estanteDestino = botaoAbandonado;
        }
        botaoMais.insertAdjacentHTML("beforebegin", novoCartaoHTML);
        estanteDestino.insertAdjacentHTML("beforebegin", novoCartaoHTML);   

        

        function abrirInfos(){

        const JanelaExibirCartaoJogo = `
                    <div class="exibirCartaoJogo">
                    <h3>${jogo.titulo}</h3>
                    <div class="infoJanelaCartaoJogo">
                        <img class="imagemJECJ" src="prina.png">
                        <div class="tagsJECJ"> 
                            <span class="destacarTagsJECJ">STATUS</span>
                            <select class="statusJECJ">
                                <option selected value="${jogo.status}">${jogo.status}</option>
                                <option value="jogado">Jogado</option>
                                <option value="jogando">Jogando</option>
                                <option value="abandonado">Abandonado</option>
                                <option value="interesse">Tenho interesse</option>
                            </select>

                            <span class="destacarTagsJECJ">DESCRIÇÃO</span>
                            <input type="text" class="descricaoInputECJ" value="${jogo.descricao}">

                            <span class="destacarTagsJECJ">NOTA</span>
                            <input type="number" class="numerosJECJ" value="${jogo.nota}" min="1" max="10">

                            <button class = "btnExcluir"> excluir </button>
                        </div>
                    </div>

                    <div class="botoesECJ">
                        <button class="btnSalvarECJ">Salvar</button>
                        <button class="btnCancelarECJ">Cancelar</button>
                    </div>
                </div>
        `;
        document.body.insertAdjacentHTML('beforeend', JanelaExibirCartaoJogo);
        }

    });
        const seila = document.querySelector(".cartaoJogo");
        seila.firstElementChild.addEventListener("click", abrirInfos());
    


    
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
    
  

    /*
    if (event.target.id === "btnSalvarECJ")
    {
     const descricaoInputECJ = exibirCartaoJogo.querySelector(".descricaoInputECJ");
        const statusJECJ = exibirCartaoJogo.querySelector(".statusJECJ");
        const numerosJECJ = exibirCartaoJogo.querySelector(".numerosJECJ");
        const novaDescricao = descricaoInputECJ.value;
        const novoStatus = statusJECJ.value;
        const novaNota = numerosJECJ.value;

        console.log("Descrição salva:", novaDescricao);
        console.log(descricaoDigitado.value);
        console.log("Status salvo:", novoStatus);
        console.log("Nota salva:", novaNota);

        exibirCartaoJogo.remove();

    }

     if (event.target.id === "btnCancelarECJ")
    {
        exibirCartaoJogo.style.display = 'none';
    } */

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

