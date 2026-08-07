

//FIREBASE

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, doc, updateDoc, deleteDoc, where} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js"; 
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


let salvouNumeros = false;
let salvoClicou = false;
let modoJanela = janelaJogos.dataset.modo;
let idTemporario;


//biblioteca
let biblioteca = [];
let jogoSendoEditado;
let usuarioAtualUID = null;


//salvarJanela
    salvar.addEventListener("click", async function () {
        loading();
        if (modoJanela == "criar")
        {
             let imagemJogo;
            if (inputTitulo.value.trim() === "")
            {
                window.alert("preencha os dados ou cancele");
                return;
            }

            
                try 
                {
                imagemJogo = await buscarCapaDoJogo(inputTitulo.value);
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
                // Comando que cria a coleção "jogos" e empurra o objeto para lá
                const adoc = await addDoc(collection(db, "jogos"), novoJogo);
                console.log("Jogo salvo no Firebase com sucesso!");
                novoJogo.id = adoc.id;
                idTemporario = novoJogo.id;

                
            
                 biblioteca.push(novoJogo);
              
            } catch (erro) {
                console.error("Erro ao tentar salvar no Firebase: ", erro);
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

         
           editarJogoNuvem();
            console.log(jogoSendoEditado.titulo, jogoSendoEditado.status);
            
        } 
            limpaValores();
            tituloJogo.textContent = "adicione o jogo"; 
           
            console.log("nome do título KJDSADSKJ: "+biblioteca.find(jogo => jogo.id == idTemporario).titulo);
            fecharJanela();
            renderizarTela();


 
    });

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
    try {
        
        await signOut(auth);
        console.log("deslogou");
        atualizarSite();

    } catch (error) {
        console.log(error);
    }
});

fecharBarra.addEventListener("click", () => {
     barraLateral.classList.add('recolhida');
     tituloHeader.style.display = 'none';
     logoHeader.style.display = 'flex'; 
});

abrirBarra.addEventListener("click", () => {
     barraLateral.classList.remove('recolhida');
     logoHeader.style.display = 'none'; 
     tituloHeader.style.display = 'flex';
});

   

    btnExcluir.addEventListener("click", function() {
    
        biblioteca = biblioteca.filter(jogo => jogo.id != idTemporario);

        excluirJogoNuvem()

        limpaValores();
    
        fecharJanela();
        renderizarTela();
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

}

 function loading ()
    {
        tituloJogo.textContent = "salvando...";
        
    }

//função 
function renderizarTela()
{

   
    document.querySelectorAll(".cartaoJogo").forEach(cartao => cartao.remove());
    biblioteca.forEach(jogo => {
        
    let novoCartaoHTML = `
            <div class="cartaoJogo" data-id="${jogo.id}" style="background-image: url('${jogo.capa}');">
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

//API TESTE
async function buscarCapaDoJogo(nomeDoJogo) {
    const busca = nomeDoJogo.replace(" ", "%20");
    const urlDaApi = `https://api.rawg.io/api/games?search=${busca}&key=3509b61d91744100a25d2f0453af764e`;

   
    try{
        const resposta = await fetch(urlDaApi);
        const dados = await resposta.json();
        const jogoEncontrado = dados.results[0];
        
        if (jogoEncontrado) {
            const linkDaCapa = jogoEncontrado.background_image;
            console.log("Nome oficial: ", jogoEncontrado.name);
            console.log("Capa do jogo: ", linkDaCapa);
            return linkDaCapa;

        } else {
            console.log("Jogo não encontrado na RAWG.");
        }

    }catch (erro)
    {
        console.log(erro);

    }
        

    
}

