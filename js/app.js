console.log("ElectroVolt Diagram Studio Started");

let selectedElement = null;
let copiedElement = null;
let currentTool = "select";

let isDrawing = false;

let wireStartX = 0;
let wireStartY = 0;
// Image Upload Button

const imageBtn = document.getElementById("imageBtn");
const imageInput = document.getElementById("imageInput");

imageBtn.addEventListener("click", function () {

    imageInput.click();

});
// Image Upload

imageInput.addEventListener("change", function () {

    const file = this.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        const img = document.createElement("img");

        img.src = e.target.result;

        img.style.position = "absolute";

        img.style.left = "100px";

        img.style.top = "100px";

        img.style.width = "150px";

        img.style.cursor = "move";

        document.getElementById("drawingCanvas").appendChild(img);
makeDraggable(img);
        addResizeHandle(img);
    };

    reader.readAsDataURL(file);

});
function makeDraggable(element){

    let isDragging = false;

    let offsetX = 0;

    let offsetY = 0;

  element.addEventListener("mousedown",function(e){

    if(selectedElement){

        selectedElement.classList.remove("selected");

    }

    selectedElement = element;

    selectedElement.classList.add("selected");

    isDragging = true;

    offsetX = e.offsetX;

    offsetY = e.offsetY;

});

    document.addEventListener("mousemove",function(e){

        if(!isDragging) return;

        const canvas =
        document.getElementById("drawingCanvas");

        const rect =
        canvas.getBoundingClientRect();

        element.style.left =
        (e.clientX-rect.left-offsetX)+"px";

        element.style.top =
        (e.clientY-rect.top-offsetY)+"px";

    });

    document.addEventListener("mouseup",function(){

        isDragging=false;

    });

}
function addResizeHandle(img){

    const handle=document.createElement("div");

    handle.className="resize-handle";

    document.getElementById("drawingCanvas").appendChild(handle);

    function updateHandle(){

        handle.style.left=(img.offsetLeft+img.offsetWidth-6)+"px";

        handle.style.top=(img.offsetTop+img.offsetHeight-6)+"px";

    }

    updateHandle();

    let resizing=false;

    handle.addEventListener("mousedown",function(e){

        e.stopPropagation();

        resizing=true;

    });

    document.addEventListener("mousemove",function(e){

        if(!resizing) return;

        const rect=document.getElementById("drawingCanvas").getBoundingClientRect();

        img.style.width=(e.clientX-rect.left-img.offsetLeft)+"px";

        img.style.height="auto";

        updateHandle();

    });

    document.addEventListener("mouseup",function(){

        resizing=false;

    });

    const oldDrag=makeDraggable;

    makeDraggable(img);

    img.addEventListener("mousemove",updateHandle);

}
document.addEventListener("keydown",function(e){

    if(e.key==="Delete" && selectedElement){

        selectedElement.classList.remove("selected");

        selectedElement.remove();

        selectedElement = null;

    }

});
// Canvas par click karne se selection remove

document.getElementById("drawingCanvas").addEventListener("click", function(e){

    if(e.target.id === "drawingCanvas"){

        if(selectedElement){

            selectedElement.classList.remove("selected");

            selectedElement = null;

        }

    }

});
document.addEventListener("keydown",function(e){

    if(e.key==="Delete" && selectedElement){

        selectedElement.classList.remove("selected");

        selectedElement.remove();

        selectedElement = null;

    }

});
// Ctrl + C

document.addEventListener("keydown",function(e){

    if(e.ctrlKey && e.key==="c"){

        if(selectedElement){

            copiedElement = selectedElement.cloneNode(true);

        }

    }

});
// Ctrl + V

document.addEventListener("keydown", function(e){

    if(e.ctrlKey && e.key==="v"){

        if(copiedElement){

            const clone = copiedElement.cloneNode(true);

            clone.style.left =
            (parseInt(copiedElement.style.left)+20)+"px";

            clone.style.top =
            (parseInt(copiedElement.style.top)+20)+"px";

            document
            .getElementById("drawingCanvas")
            .appendChild(clone);

            makeDraggable(clone);

            addResizeHandle(clone);

        }

    }

});
// Toolbar Delete Button

const deleteBtn = document.getElementById("deleteBtn");

deleteBtn.addEventListener("click", function () {

    if (selectedElement) {

        selectedElement.classList.remove("selected");

        selectedElement.remove();

        selectedElement = null;

    }

});
const wireTool = document.getElementById("wireTool");
const selectTool = document.getElementById("selectTool");

wireTool.addEventListener("click", function () {

    currentTool = "wire";
 alert("Wire Tool Selected");
    wireTool.classList.add("active-tool");

    selectTool.classList.remove("active-tool");

});

selectTool.addEventListener("click", function () {

    currentTool = "select";

    selectTool.classList.add("active-tool");

    wireTool.classList.remove("active-tool");

});
const drawingCanvas = document.getElementById("drawingCanvas");

drawingCanvas.addEventListener("mousedown", function(e){

    if(currentTool !== "wire") return;

    isDrawing = true;

    wirestartX = e.offsetX;

    wirestartY = e.offsetY;

});

drawingCanvas.addEventListener("mouseup", function(e){

    if(currentTool !== "wire") return;

    if(!isDrawing) return;

    isDrawing = false;

    const line = document.createElement("div");

    line.className = "wire-line";

    const endX = e.offsetX;

    const endY = e.offsetY;

    const length = Math.sqrt(

        Math.pow(endX-wirestartX,2)+

        Math.pow(endY-wirestartY,2)

    );

    const angle = Math.atan2(

        endY-wirestartY,

        endX-wirestartX

    ) * 180 / Math.PI;

    line.style.width = length + "px";

    line.style.left = wirestartX + "px";

    line.style.top = wirestartY + "px";

    line.style.transform = "rotate(" + angle + "deg)";

    drawingCanvas.appendChild(line);

});
const wireCanvas = document.getElementById("drawingCanvas");

let drawing = false;
let sx = 0;
let sy = 0;

wireCanvas.addEventListener("mousedown", function(e){

    if(currentTool !== "wire") return;

    drawing = true;

    sx = e.offsetX;

    sy = e.offsetY;

});

wireCanvas.addEventListener("mouseup", function(e){

    if(currentTool !== "wire") return;

    if(!drawing) return;

    drawing = false;

    const ex = e.offsetX;
    const ey = e.offsetY;

    const line = document.createElement("div");

    line.className = "wire";

    const length = Math.sqrt(
        (ex-sx)*(ex-sx)+(ey-sy)*(ey-sy)
    );

    const angle = Math.atan2(
        ey-sy,
        ex-sx
    ) * 180 / Math.PI;

    line.style.width = length + "px";
    line.style.left = sx + "px";
    line.style.top = sy + "px";
    line.style.transform = `rotate(${angle}deg)`;

   wireCanvas.appendChild(line);

});
window.onload = function () {

    const wireTool = document.getElementById("wireTool");
    const selectTool = document.getElementById("selectTool");

    console.log(wireTool);

    wireTool.addEventListener("click", function () {

        alert("Wire Tool Selected");

    });

};
