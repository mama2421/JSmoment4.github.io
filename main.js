"use strict";

//variabler
const item=document.querySelector('#newtodo');
const addItemButton=document.querySelector('#newtodobutton');
const error=document.querySelector('#message');
const itemList=document.querySelector('#todolist');
const clearButton=document.querySelector('#clearbutton');
let i;

//händelsehanterare
item.addEventListener("keyup", checkInput, false);
addItemButton.addEventListener("click", addItem, false);
window.onload = init;

//start funktion
function init(){
//knappen 'lägg till' går inte att trycka på innitiellt
addItemButton.disabled=true;
    loadItem();
}

//kontrollera input
function checkInput(){
    let input= item.value;
//text måste vara 5< tecken för att tryckas ut
    if(input.length>=5){
        addItemButton.disabled=false;
        error.innerHTML="";
//annars..
    } else {
        error.innerHTML="Ange minst 5 tecken!"
        addItemButton.disabled=true;
    }
}

//lägg till todolist-item
function addItem(){
    let input=item.value;
    let newEl=document.createElement("article")
    let newItem=document.createTextNode(input);
    newEl.appendChild(newItem);
    newEl.className="todoitem";
    itemList.appendChild(newEl);
    //Klick-hantera items(ta bort de när de klickas)
    newEl.addEventListener('click', function (e) {
        e.target.remove();
        saveItem()
    });
    item.value="";
    addItemButton.disabled=true;
//anropar lagring
    saveItem();
}

//spara todolist
function saveItem(){
//läs in list-items
let todoitems=document.querySelectorAll(".todoitem");
let tempArr=[];
for(i=0;i<todoitems.length;i++){
    tempArr.push(todoitems[i].innerHTML)
}
//JSON-sträng
let jsonStr=JSON.stringify(tempArr)
//lagra i webstorage
localStorage.setItem("todoitems", jsonStr)
}
//läser in kurslista
function loadItem(){
//Konvertera från JSON till array igen
    let todoitems=JSON.parse(localStorage.getItem("todoitems"));
    for(i=0;i<todoitems.length;i++){
    //skapa nya element
    let newEl=document.createElement("article")
    let newItem=document.createTextNode(todoitems[i]);
    newEl.appendChild(newItem);
    newEl.className="todoitem";
    itemList.appendChild(newEl);
//Klick-hantera items(ta bort de när de klickas)
    newEl.addEventListener('click', function (e) {
        e.target.remove();
        saveItem()
    });
    }
}

//rensar med knapptryck 'Rensa' (även webstorage/local storage rensas)
clearButton.addEventListener('click', function() {
    itemList.innerHTML = ''; 
    localStorage.clear();
});

