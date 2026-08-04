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

          const horizontal = document.createElement("div");
const vertical = document.createElement("div");

horizontal.style.position = "absolute";
horizontal.style.background = "red";
horizontal.style.height = "3px";

vertical.style.position = "absolute";
vertical.style.background = "red";
vertical.style.width = "3px";

line.style.position = "absolute";
line.style.background = "red";
line.style.height = "3px";
line.style.transformOrigin = "left center";

const endX = e.offsetX;
const endY = e.offsetY;

const length = Math.sqrt(
    (endX - startPoint.x) ** 2 +
    (endY - startPoint.y) ** 2
);

const angle = Math.atan2(
    endY - startPoint.y,
    endX - startPoint.x
) * 180 / Math.PI;

line.style.width = length + "px";
line.style.left = startPoint.x + "px";
line.style.top = startPoint.y + "px";
line.style.transform = `rotate(${angle}deg)`;

canvas.appendChild(line);

startPoint = null;
        }

    });

});
