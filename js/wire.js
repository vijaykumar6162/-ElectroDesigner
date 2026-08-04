// =========================
// ElectroVolt Wire Tool
// =========================

console.log("Wire Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("drawingCanvas");

    let startPoint = null;
let previewH = null;
let previewV = null;
let drawing = false;
    canvas.addEventListener("mousedown", function (e) {

        if (window.currentTool !== "wire") return;
        drawing = true;
console.log("Wire Tool Click");
        // First Click
        if (startPoint === null) {

            startPoint = {
                x: e.offsetX,
                y: e.offsetY
            };

           
            return;
        }

        // Second Click
        const endX = e.offsetX;
        const endY = e.offsetY;

        // ---------- Horizontal Wire ----------
        const horizontal = document.createElement("div");

        horizontal.style.position = "absolute";
        horizontal.style.background = "red";
        horizontal.style.height = "3px";

        horizontal.style.left =
            Math.min(startPoint.x, endX) + "px";

        horizontal.style.top =
            startPoint.y + "px";

        horizontal.style.width =
            Math.abs(endX - startPoint.x) + "px";

        canvas.appendChild(horizontal);

        // ---------- Vertical Wire ----------
        const vertical = document.createElement("div");

        vertical.style.position = "absolute";
        vertical.style.background = "red";
        vertical.style.width = "3px";

        vertical.style.left =
            endX + "px";

        vertical.style.top =
            Math.min(startPoint.y, endY) + "px";

        vertical.style.height =
            Math.abs(endY - startPoint.y) + "px";

       canvas.appendChild(vertical);

if (previewH) {
    previewH.remove();
    previewH = null;
}

if (previewV) {
    previewV.remove();
    previewV = null;
}

drawing = false;
startPoint = null;


});
    canvas.addEventListener("mousemove", function (e) {

    if (window.currentTool !== "wire") return;

    if (!drawing) return;

    console.log("Mouse:", e.offsetX, e.offsetY);
if (previewH) previewH.remove();
if (previewV) previewV.remove();

previewH = document.createElement("div");

previewH.style.position = "absolute";
previewH.style.background = "red";
previewH.style.height = "3px";

previewH.style.left = startPoint.x + "px";
previewH.style.top = startPoint.y + "px";
previewH.style.width = Math.abs(e.offsetX - startPoint.x) + "px";

canvas.appendChild(previewH);
        previewV = document.createElement("div");

previewV.style.position = "absolute";
previewV.style.background = "red";
previewV.style.width = "3px";

previewV.style.left = e.offsetX + "px";
previewV.style.top = Math.min(startPoint.y, e.offsetY) + "px";
previewV.style.height = Math.abs(e.offsetY - startPoint.y) + "px";

canvas.appendChild(previewV);
});
    canvas.addEventListener("mouseup", function () {

    drawing = false;
    });

});
