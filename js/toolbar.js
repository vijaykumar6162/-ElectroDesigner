// =========================
// Toolbar Started
// =========================

console.log("Toolbar Loaded");

document.addEventListener("DOMContentLoaded", () => {

    const wireTool = document.getElementById("wireTool");
    const selectTool = document.getElementById("selectTool");

    if (!wireTool || !selectTool) {
        console.error("Toolbar buttons not found");
        return;
    }

  wireTool.addEventListener("click", () => {

    window.currentTool = "wire";

    alert("Wire Tool Activated");

});
