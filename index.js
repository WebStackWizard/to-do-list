let todoListContEl = document.getElementById("todoListCont");
let userInEl = document.getElementById("userIn");
errorMsgEl = document.getElementById("errorMsg");

// let todoList = [
//     {
//         title : "HTML",
//         id : 1
//     },
//     {
//         title : "CSS",
//         id : 2
//     },
//     {
//         title : "javascript",
//         id : 3
//     }
// ]

function onGetParsedTodo(){

    let myTodoList = localStorage.getItem("myTodoList");

  

    if(myTodoList === null){

        return [];
    }
    else{
    
        let parsedTodo = JSON.parse(myTodoList);
        
        return parsedTodo;

    }

    
}



let todoList = onGetParsedTodo();


function onStatusChanged (checkboxId,titleId,todoId){

    let checkboxEl = document.getElementById(checkboxId);

    let titleEl = document.getElementById(titleId);

    if (checkboxEl.checked === true){
        titleEl.classList.add("checked");
    }
    else{
        titleEl.classList.remove("checked");
    }


    let newTodo = todoId.slice(4);

    let index = todoList.findIndex( (each)=> each.id == newTodo);

    for (let i = 0 ; i < todoList.length; i++){

        if( index === i ){

            if( todoList[i].isChecked === false){

                todoList[i].isChecked = true;
            }
            else{

                todoList[i].isChecked = false
            }


        }
    }

}




function  onDeleteTodo(todoId){

    let myTodo = document.getElementById(todoId);

    todoListContEl.removeChild(myTodo);

    let newTodo = todoId.slice(4);

    let index = todoList.findIndex( (each)=> each.id == newTodo);
   
    todoList.splice(index,1);

    console.log(todoList)
}






function createAndAppendTodo (todo){

    let checkboxId = "mycheckbox" + todo.id;
    let titleId = "myTitle" + todo.id;
    let todoId = "todo" + todo.id;

    let listCont = document.createElement("li");
    listCont.classList.add("list-cont");
    listCont.id = todoId;
    todoListContEl.appendChild(listCont);

    let checkboxEl = document.createElement("input");
    checkboxEl.type = "checkbox";
    checkboxEl.id = checkboxId
    if(todo.isChecked === true){
        checkboxEl.checked = true;
    }
    checkboxEl.onclick = function (){
        onStatusChanged (checkboxId,titleId,todoId);
    }
    listCont.appendChild(checkboxEl);

    let labelEl = document.createElement("label");
    labelEl.classList.add("label-cont");
    labelEl.htmlFor = checkboxId
    listCont.appendChild(labelEl);

    let titleEl = document.createElement("h4");
    titleEl.textContent = todo.title;
    titleEl.id = titleId;
    if(todo.isChecked === true){
        titleEl.classList.add("checked");
    }
    labelEl.appendChild(titleEl);

    let deleteBtnEl = document.createElement("button");
    deleteBtnEl.classList.add("delete-btn");
    deleteBtnEl.onclick = function() {
        onDeleteTodo(todoId);
    }
    labelEl.appendChild(deleteBtnEl);

    let iconEl = document.createElement("i");
    iconEl.classList.add("fa-solid" , "fa-trash");
    deleteBtnEl.appendChild(iconEl);

}

for (each of todoList){

    createAndAppendTodo (each)
}

function addTodo(){

    let date = new Date();

    let uniqueId = Math.ceil( Math.random() * date.getTime())

    let newTodo = {

        title : userInEl.value,
        id : uniqueId,
        isChecked : false

    }

   if (userInEl.value === ""){

    errorMsgEl.textContent = "please enter a valid input"

   }
   else{
    createAndAppendTodo (newTodo);
    todoList.push(newTodo);
    errorMsgEl.textContent = "";
    userInEl.value = "";
   }
}


function onSaveTodo(){

    let stringyfyTodo = JSON.stringify( todoList)

    localStorage.setItem("myTodoList",stringyfyTodo);
}