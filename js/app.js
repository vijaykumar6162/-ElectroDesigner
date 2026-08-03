console.log("ElectroVolt Diagram Studio Started");
let selectedElement = null;
let copiedElement = null;
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
