/*====================================
        ELECTROVOLT CANVAS
====================================*/

const canvas = document.getElementById("drawingCanvas");

// Default Values
let zoom = 1;
let offsetX = 0;
let offsetY = 0;

let isPanning = false;
let startX = 0;
let startY = 0;

const statusBar = document.querySelector(".statusbar");

//------------------------------------
// Update Canvas Transform
//------------------------------------

function updateCanvas() {

    canvas.style.transform =
        `translate(${offsetX}px, ${offsetY}px) scale(${zoom})`;

    canvas.style.transformOrigin = "0 0";

    updateStatus();

}

//------------------------------------
// Zoom
//------------------------------------

canvas.addEventListener("wheel", function(e){

    if(!e.ctrlKey) return;

    e.preventDefault();

    if(e.deltaY < 0){

        zoom += 0.1;

    }else{

        zoom -= 0.1;

    }

    zoom = Math.max(0.5, Math.min(3, zoom));

    updateCanvas();

});

//------------------------------------
// Middle Mouse Pan
//------------------------------------

canvas.addEventListener("mousedown", function(e){

    if(e.button === 1){

        isPanning = true;

        startX = e.clientX;

        startY = e.clientY;

        canvas.style.cursor = "grabbing";

    }

});

document.addEventListener("mousemove", function(e){

    if(!isPanning) return;

    offsetX += e.clientX - startX;

    offsetY += e.clientY - startY;

    startX = e.clientX;

    startY = e.clientY;

    updateCanvas();

});

document.addEventListener("mouseup", function(){

    isPanning = false;

    canvas.style.cursor = "default";

});

//------------------------------------
// Space + Left Mouse Pan
//------------------------------------

let spacePressed = false;

document.addEventListener("keydown", function(e){

    if(e.code === "Space"){

        spacePressed = true;

    }

});

document.addEventListener("keyup", function(e){

    if(e.code === "Space"){

        spacePressed = false;

    }

});

canvas.addEventListener("mousedown", function(e){

    if(spacePressed && e.button === 0){

        isPanning = true;

        startX = e.clientX;

        startY = e.clientY;

        canvas.style.cursor = "grab";

    }

});

//------------------------------------
// Mouse Position
//------------------------------------

canvas.addEventListener("mousemove", function(e){

    const rect = canvas.getBoundingClientRect();

    const x = Math.round((e.clientX - rect.left) / zoom);

    const y = Math.round((e.clientY - rect.top) / zoom);

    statusBar.innerHTML = `

    <div>

    X : ${x}

    &nbsp;&nbsp;

    Y : ${y}

    </div>

    <div>

    Zoom : ${Math.round(zoom*100)}%

    </div>

    `;

});

//------------------------------------
// Status Update
//------------------------------------

function updateStatus(){

    statusBar.innerHTML = `

    <div>

    X : ${Math.round(offsetX)}

    &nbsp;&nbsp;

    Y : ${Math.round(offsetY)}

    </div>

    <div>

    Zoom : ${Math.round(zoom*100)}%

    </div>

    `;

}

updateCanvas();
