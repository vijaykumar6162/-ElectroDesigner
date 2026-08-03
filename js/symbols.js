/*=====================================
        ELECTROVOLT SYMBOL SYSTEM
=====================================*/

const symbolItems = document.querySelectorAll(".symbol");
const drawingCanvas = document.getElementById("drawingCanvas");

let selectedSymbol = null;

//------------------------------
// Make Sidebar Symbols Clickable
//------------------------------

symbolItems.forEach(symbol => {

    symbol.addEventListener("click", () => {

        createSymbol(symbol.innerText);

    });

});

//------------------------------
// Create Symbol
//------------------------------

function createSymbol(name){

    const item = document.createElement("div");

    item.className = "canvas-symbol";

    item.innerHTML = name;

    item.style.left = "100px";

    item.style.top = "100px";

    drawingCanvas.appendChild(item);

    enableDrag(item);

}

//------------------------------
// Drag Function
//------------------------------

function enableDrag(item){

    let dragging = false;

    let offsetX = 0;

    let offsetY = 0;

    item.addEventListener("mousedown", function(e){

        dragging = true;

        selectedSymbol = item;

        offsetX = e.offsetX;

        offsetY = e.offsetY;

    });

    document.addEventListener("mousemove", function(e){

        if(!dragging) return;

        const rect = drawingCanvas.getBoundingClientRect();

        item.style.left = (e.clientX - rect.left - offsetX) + "px";

        item.style.top = (e.clientY - rect.top - offsetY) + "px";

    });

    document.addEventListener("mouseup", function(){

        dragging = false;

    });

}
