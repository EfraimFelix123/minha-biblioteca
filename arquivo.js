//select "numeros"
const select = document.getElementById("numeros");
for(let i = 1; i<=10; i++)
{
    const option = document.createElement("option");
    option.textContent = i;
    option.value = i;
    select.appendChild(option);
}

//button "salvar"
const salvar = document.getElementById("btn-salvar-janelaJogos");
const janelaJogos = document.querySelector(".janelaJogos");
janelaJogos.style.display = 'none';
salvar.addEventListener("click", function() {
    //futuramente irei utilizar a lógica para salvar os elementos
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
