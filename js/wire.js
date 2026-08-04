// =========================
// ElectroVolt Wire Tool
// =========================

console.log("Wire Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("drawingCanvas");

    let startPoint = null;

    canvas.addEventListener("click", function (e) {

        if (window.currentTool !== "wire") return;
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

        startPoint = null;

    });

});
