//constantes e valores
const selectNumeros = document.querySelector(".numeros");
const selectStatus = document.querySelector(".status");
const inputDescricao = document.getElementById("descricao");
const botaoMais = document.querySelector(".btn-mais");
const inputTitulo = document.getElementById("titulo");
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaAdicionar");
const exibirCartaoJogo = document.querySelector(".exibirCartaoJogo");

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


    

//select "numeros"
for(let i = 1; i<=10; i++)
{
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    selectNumeros.appendChild(option);
}
salvar.addEventListener("click", function() {
    
    // 1. COLETAMOS OS DADOS
    let tituloDigitado = inputTitulo.value;
    let descricaoDigitado = inputDescricao.value;
    let statusEscolhido = selectStatus.value;
    let numeroEscolhido = selectNumeros.value;

    // ====================================================================
    // 2. A NOSSA FÁBRICA DE CARTÕES (A MÁGICA ACONTECE AQUI)
    // Essa função recebe o botão alvo (ex: botaoMais, botaoJogado) como parâmetro
    // ====================================================================
    function fabricarCartao(botaoDestino) {
        
        // Imprime o visual
        let novoCartaoHTML = `
            <div class="cartaoJogo">
                <button class="botaoCartaoJogo"></button>
                <div class="info-cartao">
                    <h3>${tituloDigitado}</h3>
                    <span class="etiqueta-status">${statusEscolhido}</span>
                </div>
            </div>
        `;
        botaoDestino.insertAdjacentHTML('beforebegin', novoCartaoHTML);

        // Pega o cartão específico que acabou de nascer NESTE destino
        const cartaoRecemCriado = botaoDestino.previousElementSibling;
        const botaoCartaoJogo = cartaoRecemCriado.querySelector(".botaoCartaoJogo");

        // Coloca o "chip" de clique NESTE cartão
        botaoCartaoJogo.addEventListener("click", function(){
            
            const JanelaExibirCartaoJogo = `
                <div class="exibirCartaoJogo">
                <h3>${tituloDigitado}</h3>
                <div class="infoJanelaCartaoJogo">
                    <img class="imagemJECJ" src="prina.png">
                    <div class="tagsJECJ"> 
                        <span class="destacarTagsJECJ">STATUS</span>
                        <select class="statusJECJ">
                            <option selected value="${statusEscolhido}">${statusEscolhido}</option>
                            <option value="jogado">Jogado</option>
                            <option value="jogando">Jogando</option>
                            <option value="abandonado">Abandonado</option>
                            <option value="interesse">Tenho interesse</option>
                        </select>

                        <span class="destacarTagsJECJ">DESCRIÇÃO</span>
                        <input type="text" class="descricaoInputECJ" value="${descricaoDigitado}">

                        <span class="destacarTagsJECJ">NOTA</span>
                        <input type="number" class="numerosJECJ" value="${numeroEscolhido}" min="1" max="10">

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

            const modalAtual = document.body.lastElementChild;
            const btnExcluir = modalAtual.querySelector(".btnExcluir");
            const btnSalvarModal = modalAtual.querySelector(".btnSalvarECJ");
            const btnCancelarModal = modalAtual.querySelector(".btnCancelarECJ");

            btnExcluir.addEventListener("click", function(){
                modalAtual.remove();
                cartaoRecemCriado.remove();
            });

            btnSalvarModal.addEventListener("click", function() {
                // Atualiza visualmente
                statusEscolhido = modalAtual.querySelector(".statusJECJ").value;
                cartaoRecemCriado.querySelector(".etiqueta-status").textContent = statusEscolhido;
                modalAtual.remove();
            });

            btnCancelarModal.addEventListener("click", function(){
                modalAtual.remove();
            });
        });
    }
    // ====================================================================

    // 3. AGORA NÓS LIGAMOS A MÁQUINA ONDE QUISERMOS!

    // Cria o cartão sempre no backlog principal
    fabricarCartao(botaoMais);

    // Cria a cópia do cartão na área correspondente
    if (statusEscolhido == "jogado") {
        fabricarCartao(botaoJogado);
    } 
    else if (statusEscolhido == "abandonado") {
        fabricarCartao(botaoAbandonado);
    } 
    else if (statusEscolhido == "jogando") {
        fabricarCartao(botaoJogando);
    } 
    else if (statusEscolhido == "interesse") {
        fabricarCartao(botaoTenhoInteresse);
    }

    // 4. Limpa e fecha a janela inicial
    inputTitulo.value = '';
    inputDescricao.value = '';
    selectStatus.selectedIndex = 0; 
    selectNumeros.selectedIndex = 0; 
    janelaJogos.style.display = 'none';

});

//button "salvar"
janelaJogos.style.display = 'none';

//delegações
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.getElementById("btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const selectNumeros = document.getElementById("numerosJECJ");
    const descricaoInputECJ = document.getElementById("descricaoInputECJ");
    
  

    if (event.target.id === "btnSalvarECJ")
    {
     const descricaoInputECJ = exibirCartaoJogo.querySelector("#descricaoInputECJ");
        const statusJECJ = exibirCartaoJogo.querySelector("#statusJECJ");
        const numerosJECJ = exibirCartaoJogo.querySelector("#numerosJECJ");

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

