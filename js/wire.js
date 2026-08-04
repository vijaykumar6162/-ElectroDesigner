// =========================
// Wire System
// =========================

console.log("Wire Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const canvas = document.getElementById("drawingCanvas");

    canvas.addEventListener("click", function () {

        if (window.currentTool !== "wire") return;

        alert("Canvas Ready For Wire");

    });

});
