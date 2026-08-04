// =========================
// Wire Tool
// =========================

console.log("Wire Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("drawingCanvas");

    let startPoint = null;

    canvas.addEventListener("click", function (e) {

        if (window.currentTool !== "wire") return;

        if (startPoint === null) {

            startPoint = {
                x: e.offsetX,
                y: e.offsetY
            };

            alert("Wire Start Selected");

        } else {

            alert("Wire End Selected");

            startPoint = null;

        }

    });

});
