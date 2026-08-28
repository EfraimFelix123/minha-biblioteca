

//FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc, where, arrayUnion, setDoc, getDoc} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";
import {getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";   

const firebaseConfig = {
  apiKey: "AIzaSyC3t_BuMimAzSpdq8BGnnPY6qSj8QG7Qtw",
  authDomain: "minha-biblioteca-de-jogos.firebaseapp.com",
  projectId: "minha-biblioteca-de-jogos",
  storageBucket: "minha-biblioteca-de-jogos.firebasestorage.app",
  messagingSenderId: "704537020487",
  appId: "1:704537020487:web:f5a7404cc7d9565ba1c962"    
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);
const provedorGoogle = new GoogleAuthProvider();


//constantes e valores
const selectNumeros = document.querySelector(".numeros");
const selectStatus = document.querySelector(".status");
const inputDescricao = document.getElementById("descricao");
const botaoMais = document.querySelector(".btn-mais");
const inputTitulo = document.getElementById("titulo");
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaAdicionar");
const exibirCartaoJogo = document.querySelector(".exibirCartaoJogo");
const main = document.getElementById("appPrincipal");
const jogando = document.querySelector(".jogando");
const botaoJogando = jogando.querySelector(".btn-mais");
const abandonado = document.querySelector(".abandonado");
const botaoAbandonado = abandonado.querySelector(".btn-mais");
const jogado = document.querySelector(".jogado");
const botaoJogado = jogado.querySelector(".btn-mais");
const tenhoInteresse = document.querySelector(".tenhoInteresse");
const botaoTenhoInteresse = tenhoInteresse.querySelector(".btn-mais");
const abrirInformacoes = document.querySelector(".exibirCartaoJogo");
const btnExcluir = janelaJogos.querySelector(".botoes").lastElementChild;
const tituloJogo = janelaJogos.querySelector(".tituloJogo");
const imag = document.querySelector(".capaJogo");
const btnLoginGoogle = document.getElementById("loginGoogle");
const btnSair = document.getElementById("sair");
const fecharBarra = document.getElementById("fechar");
const barraLateral = document.querySelector(".barraLateral");
const abrirBarra = document.getElementById("open");
const logoHeader = document.getElementById("logoHeader");
const tituloHeader = document.querySelector(".tituloHeader");
const iconesDiv = document.querySelector(".iconesDiv");
const logout = document.querySelector("#logout");
const numeroJogando = document.querySelector(".numeroJogando");
const numeroInteresse = document.querySelector(".numeroInteresse");
const numeroJogado = document.querySelector(".numeroJogado");
const numeroAbandonado = document.querySelector(".numeroAbandonado");
const numeroJogandoTitulos = document.querySelector("#numeroJogandoTitulos");
const numeroJogadoTitulos = document.querySelector("#numeroJogadoTitulos");
const numeroAbandonadoTitulos = document.querySelector("#numeroAbandonadoTitulos");
const numeroInteresseTitulos = document.querySelector("#numeroInteresseTitulos");
const recomendacao = document.querySelector(".recomendacao");
const proximaRecomenda = document.querySelector("#proximaRecomenda");
const anteriorRecomenda = document.querySelector("#anteriorRecomenda");
const footer = document.querySelector("#footer");

let salvouNumeros = false;
let salvoClicou = false;
let modoJanela = janelaJogos.dataset.modo;
let idTemporario;
let quantidadeRecomenda = 0;
let jogosRecomendadosGlobais = []; 
let quantidade;




//biblioteca
let biblioteca = [];
let listaGeneros = [];
let jogoSendoEditado;
let usuarioAtualUID = null;



//salvarJanela
    salvar.addEventListener("click", async function () {
        loading();
        recomendar();
        if (modoJanela == "criar")
        {
            
             let imagemJogo;
             let generosDoJogo = [];
            if (inputTitulo.value.trim() === "")
            {
                window.alert("preencha os dados ou cancele");
                return;
            }

            
            try {
                const resultadoApi = await buscarCapaDoJogo(inputTitulo.value);
                imagemJogo = resultadoApi.capa;
                generosDoJogo = resultadoApi.generos;
                console.log("genero do jogo mano mano: "+generosDoJogo);
            } catch (erro) {
                console.log(erro);
            }
                if (!imagemJogo) { imagemJogo = 'cinza.jpg';}

          
            
            //jogos
           
            const novoJogo = {
            titulo: inputTitulo.value,
            descricao: inputDescricao.value,
            status: selectStatus.value,
            nota: selectNumeros.value,
            capa: imagemJogo,
            dataCriacao: Date.now(),
            donoJogo: usuarioAtualUID
            
            }

            if (inputTitulo.value == "carlinhos")
            {
                novoJogo.capa = "image.png";
            }

            try {
                
                const adoc = await addDoc(collection(db, "jogos"), novoJogo);
                console.log("Jogo salvo no Firebase com sucesso!");
                novoJogo.id = adoc.id;
                idTemporario = novoJogo.id;
                 biblioteca.push(novoJogo);

                 if (usuarioAtualUID && generosDoJogo.length > 0) {
                    const usuarioRef = doc(db, "usuarios", usuarioAtualUID);
                    await setDoc(usuarioRef, {
                        generosFavoritos: arrayUnion(...generosDoJogo)
                    }, { merge: true });
                    
                    console.log("Gêneros adicionados ao perfil do usuário com sucesso!");
                }
              
            } catch (erro) {
                console.error("Erro ao tentar salvar no Firebase: ", erro);
            }
            
          
          
           
  atualizaNumerosCategoria ();
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

         
           editarJogoNuvem();
            console.log(jogoSendoEditado.titulo, jogoSendoEditado.status);
            
        } 
            limpaValores();
            tituloJogo.textContent = "adicione o jogo"; 
           
            console.log("nome do título KJDSADSKJ: "+biblioteca.find(jogo => jogo.id == idTemporario).titulo);
            fecharJanela();
            renderizarTela();
            
           atualizaNumerosCategoria ();


 
    });
    logout.addEventListener("click", ()=>{
        logoutConta();
    });
    proximaRecomenda.addEventListener("click", ()=>{
        
        quantidadeCards();
        quantidadeRecomenda += quantidade;
        console.log("cards: "+quantidadeRecomenda);
        
        if (quantidadeRecomenda>=20) {quantidadeRecomenda=19; return}
        renderizarMaisJogos();       
    });
    anteriorRecomenda.addEventListener("click", ()=>{
        quantidadeRecomenda -= quantidade;
         console.log("cards: "+quantidadeRecomenda);
        if (quantidadeRecomenda<0) {quantidadeRecomenda=0; return}
        renderizarMaisJogos();
    });
    function quantidadeCards(){
        let larguraContainer = recomendacao.clientWidth;
        const larguraCard = 180;
        quantidade = Math.floor(larguraContainer / larguraCard);
    }


    //LOGIN
    onAuthStateChanged(auth, (usuarioLogado) => {
    if (usuarioLogado) {
        
        console.log("Reconhecimento automático: logado como", usuarioLogado.displayName);
        btnLoginGoogle.textContent = "Conta";
        btnSair.style.display = 'inline'; 
          main.style.display = 'inline';
        usuarioAtualUID = usuarioLogado.uid;
        carregarJogoNuvem()
    } else {
        console.log("Ninguém está logado no momento.");
        btnSair.style.display = 'none';
        main.style.display = 'none';
        btnSair.style.display = 'none';
        btnLoginGoogle.textContent = "Login"; 
        usuarioAtualUID = null;
        
    }
});

function atualizarSite(){
    location.reload();
}
    btnLoginGoogle.addEventListener("click", async (event) => {
    
    event.preventDefault(); 
    
    try {
        
        const resultado = await signInWithPopup(auth, provedorGoogle);
        
       
        const usuario = resultado.user;
       
        console.log("Deu certo! O usuário logou.");
        console.log("Nome do Jogador:", usuario.displayName);
        console.log("A Identidade Única (UID):", usuario.uid);
        
        
        
    } catch (erro) {
        console.error("Erro ao tentar fazer o login: ", erro);
    }
});

btnSair.addEventListener("click", async (event) => {
  logoutConta();
});

async function logoutConta() {
      try {
        
        
        await signOut(auth);
        console.log("deslogou");
        atualizarSite();
        atualizaNumerosCategoria ();
    } catch (error) {
        console.log(error);
    }
    
}

fecharBarra.addEventListener("click", () => {
    atualizaNumerosCategoria ();
     barraLateral.classList.add('recolhida');
     tituloHeader.style.display = 'none';
     logoHeader.style.display = 'flex'; 
});

abrirBarra.addEventListener("click", () => {
    atualizaNumerosCategoria ();
     barraLateral.classList.remove('recolhida');
     logoHeader.style.display = 'none'; 
     tituloHeader.style.display = 'flex';
});

 function atualizaNumerosCategoria (){
     let valorJogando =jogando.querySelector(".adicionarJogos").children.length-1;
      let valorJogado =jogado.querySelector(".adicionarJogos").children.length-1;
        let valorInteresse =tenhoInteresse.querySelector(".adicionarJogos").children.length-1;
          let valorAbandonado =abandonado.querySelector(".adicionarJogos").children.length-1;
    numeroJogando.textContent = valorJogando;
    numeroJogado.textContent = valorJogado;
    numeroInteresse.textContent = valorInteresse;
    numeroAbandonado.textContent = valorAbandonado;

    numeroJogandoTitulos.textContent = valorJogando;
    numeroJogadoTitulos.textContent = valorJogado;
    numeroInteresseTitulos.textContent =valorInteresse;
    numeroAbandonadoTitulos.textContent =valorAbandonado;
}
   

    btnExcluir.addEventListener("click", function() {
    
        biblioteca = biblioteca.filter(jogo => jogo.id != idTemporario);

        
    
        excluirJogoNuvem()

        limpaValores();
        fecharJanela();
        renderizarTela();
        atualizaNumerosCategoria ();
});

function limpaValores()
{
        inputTitulo.value = '';
        inputDescricao.value = '';
        selectStatus.selectedIndex = 0; 
        selectNumeros.selectedIndex = 0; 
}
    
async function editarJogoNuvem() {
    try {
        const referencia = doc(db, "jogos", idTemporario);

        await updateDoc(referencia,{
        titulo: inputTitulo.value,
        descricao: inputDescricao.value,
        status: selectStatus.value,
        nota: selectNumeros.value

        });

        console.log("Jogo editado com sucesso na nuvem!");
        
    } catch (error) {
        console.log(error);
    }
    
}

async function excluirJogoNuvem() {
    try {
        const referencia = doc(db, "jogos", idTemporario);
        await deleteDoc(referencia);
        console.log("Jogo editado com sucesso na nuvem!");
        
    } catch (error) {
        console.log(error);
    }
    
} 



async function carregarJogoNuvem()
{
    try 
    {
        const consultaOrdenada = query(collection(db, "jogos"), 
        where("donoJogo", "==", usuarioAtualUID),
        orderBy("dataCriacao", "asc"))
        const fds = await getDocs(consultaOrdenada);

        fds.forEach(firejogo => {
            const jogoNuvem = {
            id: firejogo.id, 
            titulo: firejogo.data().titulo,
            descricao:  firejogo.data().descricao,
            status:  firejogo.data().status,
            nota:  firejogo.data().nota,
            capa:  firejogo.data().capa
            }

             idTemporario = jogoNuvem.id
            biblioteca.push(jogoNuvem)
             console.log(firejogo.id)
             console.log(jogoNuvem.id)
        });

       
    } 
    catch (error) 
    {
        console.log(error)
    }
    
        renderizarTela();
        atualizaNumerosCategoria ();

}

 function loading ()
    {
        tituloJogo.textContent = "salvando...";
        
    }

//função 
function renderizarTela()
{

    recomendar();
    quantidadeCards();
    document.querySelectorAll(".cartaoJogo").forEach(cartao => cartao.remove());
    biblioteca.forEach(jogo => {
        
    let novoCartaoHTML = `
            <div class="cartaoJogo" data-id="${jogo.id}" style="background-image: url('${jogo.capa}');">
                <button class="botaoCartaoJogo">
                
                <div class="info-cartao">
                    <h3>${jogo.titulo}</h3>
                
                </div>
                </button>
            </div>
            `;
   

        let estanteDestino;
        if (jogo.status === "jogando") estanteDestino = botaoJogando;
        else if (jogo.status === "jogado") estanteDestino = botaoJogado;
        else if (jogo.status === "interesse") estanteDestino = botaoTenhoInteresse;
        else if (jogo.status === "abandonado") estanteDestino = botaoAbandonado;
        else return;
        
      
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
      limpaValores();
    
    const procurarfds = biblioteca.find(jogo => jogo.id == idTemporario);
    imag.src = "cinza.jpg";
    modoJanela = "criar";
    btnExcluir.style.display = 'none'
    console.log(modoJanela);
    
    
    janelaJogos.style.display = 'block';
    
}

function modoEditar()
{
    const procurarfds = biblioteca.find(jogo => jogo.id == idTemporario);

        
        imag.src = procurarfds.capa;

   

    modoJanela = "editar";
    btnExcluir.style.display = 'block';
    console.log(modoJanela);
    janelaJogos.style.display = 'block';

    
}

fecharJanela()

async function abrirInfoRecomendados(idJogoRecomendado){
    try {
        
        const jogoClicadoRecomendado = jogosRecomendadosGlobais.find(jogo => jogo.name == idJogoRecomendado);
        const idOficial = jogoClicadoRecomendado.id;
        const urlDaApi = `https://api.rawg.io/api/games/${idOficial}?key=3509b61d91744100a25d2f0453af764e`;
        const resposta = await fetch(urlDaApi);
        const dados = await resposta.json();
        const sinopseCompleta = dados.description_raw;

        const exibeRecomendados = document.querySelector(".exibeRecomendados");
        const capaJogoRecomendados = exibeRecomendados.querySelector(".capaJogo");
        const bodyRecomendados = exibeRecomendados.querySelector(".bodyRecomendados");
        capaJogoRecomendados.src = jogoClicadoRecomendado.background_image;  
        bodyRecomendados.querySelector("#tituloBodyRecomendados").textContent = jogoClicadoRecomendado.name;
        bodyRecomendados.querySelector("#plataformaBodyRecomendados").textContent = jogoClicadoRecomendado.parent_platforms.map(item => item.platform.name);

        bodyRecomendados.querySelector("#generoBodyRecomendados").textContent = jogoClicadoRecomendado.genres.map(genero => genero.name).join(", ");
        bodyRecomendados.querySelector("#descricaoBodyRecomendados").textContent = sinopseCompleta;
        
    } catch (error) {
        console.log(error);
    }
}
//DELEGAÇÕES
document.addEventListener("click", (event) => {
    const btnSalvarECJ = document.querySelector(".btnSalvarECJ");
    const btnCancelarECJ = document.getElementById("btnCancelarECJ");
    const selectNumeros = document.getElementById("numerosJECJ");
    const descricaoInputECJ = document.getElementById("descricaoInputECJ");
    const cartao = event.target.closest(".cartaoJogo");
     const cartaoRecomendado = event.target.closest(".botaoCartaoJogo");

    if (cartao) 
    {
       idTemporario = cartao.dataset.id;
       abrirInfo(idTemporario);
       
    }
    if(cartaoRecomendado){
         idTemporario = cartao.dataset.id;
         abrirInfoRecomendados(idTemporario);
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

//API TESTE
async function recomendar() {
    if (!usuarioAtualUID) return;

    try {        
        const usuarioRef = doc(db, "usuarios", usuarioAtualUID);
        const usuarioSnap = await getDoc(usuarioRef);
        
        if (usuarioSnap.exists()) {
            const generosSalvos = usuarioSnap.data().generosFavoritos;
            const GeneroAleatorio = generosSalvos[Math.floor(Math.random() * generosSalvos.length)];
            const genero = GeneroAleatorio.toLowerCase();

            const paginaAleatoria = Math.floor(Math.random() * 10) + 1;
            const url = `https://api.rawg.io/api/games?genres=${genero}&metacritic=80,100&page=${paginaAleatoria}&key=3509b61d91744100a25d2f0453af764e`;
            
            const resposta = await fetch(url);
            const dados = await resposta.json();
            
            jogosRecomendadosGlobais = dados.results;
            
            quantidadeRecomenda = 0;
            renderizarMaisJogos();
        }
        
    } catch (error) {
        console.log("deu erro mano: " + error);
    }
}
function renderizarMaisJogos() {
    try {
        
    const cardsAntigos = recomendacao.querySelectorAll('.cartaoJogo');
    cardsAntigos.forEach(card => card.remove());
    const jogosParaExibir = jogosRecomendadosGlobais.slice(quantidadeRecomenda, quantidadeRecomenda + quantidade);
    
    jogosParaExibir.forEach(jogo => { 
        let cardRecomendacao = `
            <div class="cartaoJogo" data-id="${jogo.name}" style="background-image: url('${jogo.background_image}');">
                <button class="botaoCartaoJogo">
                    <div class="info-cartao">
                        <h3 style = "font-size: 10px">${jogo.name}</h3>
                    </div>
                </button>
            </div>`;
            
        recomendacao.insertAdjacentHTML("beforeend", cardRecomendacao);
    });   
    

        
    } catch (error) {
        recomendar();
        console.log("Erro ao recomendar jogos: "+error);
    }
}
async function buscarCapaDoJogo(nomeDoJogo) {
    const busca = nomeDoJogo.replace(" ", "%20");
    const urlDaApi = `https://api.rawg.io/api/games?search=${busca}&key=3509b61d91744100a25d2f0453af764e`;

   
    try{
        const resposta = await fetch(urlDaApi);
        const dados = await resposta.json();
        const jogoEncontrado = dados.results[0];
        
        if (jogoEncontrado) {
            const linkDaCapa = jogoEncontrado.background_image;
            let nomesGeneros = jogoEncontrado.genres.map(genero => genero.name);

            console.log("Nome oficial: ", jogoEncontrado.name);
            console.log("Capa do jogo: ", linkDaCapa);
            return {capa: linkDaCapa, generos: nomesGeneros};
        } else {
            console.log("Jogo não encontrado na RAWG.");
            return { capa: null, generos: [] };
        }

    }catch (erro)
    {
        console.log(erro);
        return { capa: null, generos: [] };
    }
        

    
}

