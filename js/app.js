console.log("ElectroVolt Diagram Studio Started");
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
    };

    reader.readAsDataURL(file);

});
function makeDraggable(element){

    let isDragging = false;

    let offsetX = 0;

    let offsetY = 0;

    element.addEventListener("mousedown",function(e){

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
