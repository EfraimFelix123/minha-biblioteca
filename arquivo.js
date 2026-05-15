const select = document.getElementById("numeros");

for(let i = 1; i<=10; i++)
{
    const option = document.createElement("option");

    

    option.textContent = i;
    option.value = i;

    select.appendChild(option);

}