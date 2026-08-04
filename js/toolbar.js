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

    window.currentTool = "select";

    wireTool.addEventListener("click", () => {

        window.currentTool = "wire";

        alert("Wire Tool Activated");

    });

    selectTool.addEventListener("click", () => {

        window.currentTool = "select";

        alert("Select Tool Activated");

    });

});
