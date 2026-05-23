
//constantes e valores
const selectNumeros = document.querySelector(".numeros");
const selectStatus = document.querySelector(".status");
const inputDescricao = document.getElementById("descricao");
const botaoMais = document.getElementById("btn-mais");
const inputTitulo = document.getElementById("titulo");
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaAdicionar");
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

//button "salvar"
janelaJogos.style.display = 'none';
salvar.addEventListener("click", function() {
    //futuramente irei utilizar a lógica para salvar os elementos
    salvoClicou = true;
    



    let tituloDigitado = inputTitulo.value;
    let descricaoDigitado = inputDescricao.value;
    let statusEscolhido = selectStatus.value;
    let numeroEscolhido = selectNumeros.value;

    const novoCartaoHTML = `
        <div class="cartaoJogo">
            <button class="botaoCartaoJogo"></button>
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
    const btnSalvarModal = modalAtual.querySelector(".btnSalvarECJ");
    const btnCancelarModal = modalAtual.querySelector(".btnCancelarECJ");

    btnSalvarModal.addEventListener("click", function() {
    descricaoDigitado = modalAtual.querySelector(".descricaoInputECJ").value;
    statusEscolhido = modalAtual.querySelector(".statusJECJ").value;
    numeroEscolhido = modalAtual.querySelector(".numerosJECJ").value;

    cartaoRecemCriado.querySelector(".etiqueta-status").textContent = statusEscolhido;
    modalAtual.remove();

    });

    btnCancelarModal.addEventListener("click", function(){

        modalAtual.style.display = 'none';
    });

    });
    /*
    inputTitulo.value = '';
    inputDescricao.value = '';
    selectStatus.selectedIndex = 0; 
    selectNumeros.selectedIndex = 0; 
    */

    console.log("Descrição do jogo salva:", descricaoDigitado);
    console.log("Título do jogo salvo:", tituloDigitado);
    console.log("Status do jogo salvo:", statusEscolhido);
    console.log("Número do jogo salvo:", numeroEscolhido);
    //botaoMais.style.display = 'none';
    inputTitulo.value = '';
    inputDescricao.value = '';
    selectStatus.selectedIndex = 0; 
    selectNumeros.selectedIndex = 0; 
    janelaJogos.style.display = 'none';



});

//delegações
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.getElementById("btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const exibirCartaoJogo = document.querySelector(".exibirCartaoJogo");
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
const mais = document.getElementById ("btn-mais");
mais.addEventListener("click", function(){
    janelaJogos.style.display = 'block';
});

