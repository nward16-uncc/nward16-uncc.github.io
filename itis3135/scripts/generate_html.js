document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    const generateBtn = document.getElementById("generateHtmlBtn");

    if (!form || !generateBtn) return;

    function escapeHtml(str) {
        return String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    }

    generateBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const formData = new FormData(form);

        const firstName = escapeHtml(formData.get("firstName"));
        const middleInitial = escapeHtml(formData.get("middleName"));
        const preferredName = escapeHtml(formData.get("nickname"));
        const lastName = escapeHtml(formData.get("lastName"));
        const divider = escapeHtml(formData.get("divider"));
        const mascotAdj = escapeHtml(formData.get("mascotAdj"));
        const mascotAnimal = escapeHtml(formData.get("mascotAnimal"));
        const picSrc = "images/atl_zoo.jpg";
        const picCaption = escapeHtml(formData.get("picCaption"));
        const personalStatement = escapeHtml(formData.get("personalStatement"));
        const bullets = [
            escapeHtml(formData.get("bullet1")),
            escapeHtml(formData.get("bullet2")),
            escapeHtml(formData.get("bullet3")),
            escapeHtml(formData.get("bullet4")),
            escapeHtml(formData.get("bullet5")),
            escapeHtml(formData.get("bullet6")),
            escapeHtml(formData.get("bullet7"))
        ];

        const courses = [
            {
                department: escapeHtml(formData.getAll("dept[]")[0]),
                number: escapeHtml(formData.getAll("num[]")[0]),
                name: escapeHtml(formData.getAll("cname[]")[0]),
                reason: escapeHtml(formData.getAll("reason[]")[0])
            },
            {
                department: escapeHtml(formData.getAll("dept[]")[1]),
                number: escapeHtml(formData.getAll("num[]")[1]),
                name: escapeHtml(formData.getAll("cname[]")[1]),
                reason: escapeHtml(formData.getAll("reason[]")[1])
            },
            {
                department: escapeHtml(formData.getAll("dept[]")[2]),
                number: escapeHtml(formData.getAll("num[]")[2]),
                name: escapeHtml(formData.getAll("cname[]")[2]),
                reason: escapeHtml(formData.getAll("reason[]")[2])
            },
            {
                department: escapeHtml(formData.getAll("dept[]")[3]),
                number: escapeHtml(formData.getAll("num[]")[3]),
                name: escapeHtml(formData.getAll("cname[]")[3]),
                reason: escapeHtml(formData.getAll("reason[]")[3])
            },
            {
                department: escapeHtml(formData.getAll("dept[]")[4]),
                number: escapeHtml(formData.getAll("num[]")[4]),
                name: escapeHtml(formData.getAll("cname[]")[4]),
                reason: escapeHtml(formData.getAll("reason[]")[4])
            }
        ];

        const links = [
            { name: "LinkedIn", href: escapeHtml(formData.get("link1")) },
            { name: "GitHub", href: escapeHtml(formData.get("link2")) },
            { name: "Portfolio", href: escapeHtml(formData.get("link3")) },
            { name: "Instagram", href: escapeHtml(formData.get("link4")) },
            { name: "Email", href: escapeHtml(formData.get("link5")) }
        ];

        let htmlContent = `<h2>Introduction HTML</h2>\n`;
        htmlContent += `<h3>${firstName} ${middleInitial} "${preferredName}" ${lastName} ${divider} ${mascotAdj} ${mascotAnimal}</h3>\n`;
        htmlContent += `<figure>\n<img src="${picSrc}" alt="${picCaption}" />\n<figcaption>${picCaption}</figcaption>\n</figure>\n`;
        htmlContent += `<p>${personalStatement}</p>\n`;
        htmlContent += `<ul>\n`;
        htmlContent += `<li><strong>Personal Background:</strong> ${bullets[0]}</li>\n`;
        htmlContent += `<li><strong>Subject Background:</strong> ${bullets[1]}</li>\n`;
        htmlContent += `<li><strong>Academic Background:</strong> ${bullets[2]}</li>\n`;
        htmlContent += `<li><strong>Primary Computer:</strong> ${bullets[5]}</li>\n`;
        htmlContent += `<li><strong>Professional Background:</strong> ${bullets[4]}</li>\n`;
        htmlContent += `<li><strong>Hobbies / Fun Fact:</strong> ${bullets[6]}</li>\n`;
        htmlContent += `</ul>\n`;

        htmlContent += `<h4>Courses I’m Taking & Why</h4>\n<ul>\n`;
        courses.forEach((c) => {
            htmlContent += `<li><strong>${c.department} ${c.number} - ${c.name}:</strong> ${c.reason}</li>\n`;
        });
        htmlContent += `</ul>\n`;

        htmlContent += `<h4>Links</h4>\n<ul>\n`;
        links.forEach((l) => {
            htmlContent += `<li><a href="${l.href}" target="_blank">${l.name}</a></li>\n`;
        });
        htmlContent += `</ul>\n`;

        const main = document.querySelector("main");
        main.innerHTML = `
            <h2>Introduction HTML</h2>
            <section>
                <pre><code class="language-html">${escapeHtml(htmlContent)}</code></pre>
                <br>
                <button id="backBtn" type="button">Go Back to Form</button>
            </section>
        `;

        if (window.hljs) {
            hljs.highlightAll();
        }

        const backBtn = document.getElementById("backBtn");
        if (backBtn) {
            backBtn.addEventListener("click", () => location.reload());
        }
    });
});
