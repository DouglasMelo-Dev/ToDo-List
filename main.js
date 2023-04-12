const localStorageKey = "to-do-list-dm"

function newTask(){
    let input = document.querySelector("#input-new-task");
    input.style.border = "";

    if(!input.value){
        input.style.border = '1px solid red';
        alert("Digite uma nova tarefa")

    }else if(validaSeExisteNovaTarefa()){
        alert("Já existe tarefa com esta descrição")
        
    }
    
    else{

        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

        values.push ({
            name: input.value,
        });
        console.log(values)

        localStorage.setItem(localStorageKey, JSON.stringify(values));
        showValues()
       
    }
    input.value = ''; //para mostrar vazio depois de criar a tarefa nova
    input.focus();

}

function validaSeExisteNovaTarefa(){
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let inputValue = document.querySelector("#input-new-task").value;

    let existe = values.find(x => x.name == inputValue)
    return !existe ? false : true    
}


function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");

    let list = document.querySelector("#to-do-list");
    list.innerHTML = '';

    for(let i = 0; i <values.length; i++){
        list.innerHTML += `
        <li>
        
        ${values[i]['name']} 
        
        <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
        
        <i class="fa-solid fa-check"></i>
        
        </button> 
        
        </li>
        `
    }
}
 

function removeItem(data){
    /* console.log(data) */

    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]");
    let index = values.findIndex(x => x.name == data);
    values.splice(index,1);

    localStorage.setItem(localStorageKey, JSON.stringify(values));
    showValues()
}

showValues()