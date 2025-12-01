const tooltip = document.getElementById("tooltip");

document.querySelectorAll(".code-term").forEach((term) => {
    term.addEventListener("mouseenter", (e) => {
        tooltip.textContent = e.target.dataset.info;
        tooltip.style.display = "block";
    });

    term.addEventListener("mousemove", (e) => {
        tooltip.style.left = e.pageX + 15 + "px";
        tooltip.style.top = e.pageY + 15 + "px";
    });

    term.addEventListener("mouseleave", () => {
        tooltip.style.display = "none";
    });
});
