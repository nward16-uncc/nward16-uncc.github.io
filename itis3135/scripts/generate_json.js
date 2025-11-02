document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("introForm");
    const generateBtn = document.getElementById("generateJsonBtn");

    if (!form || !generateBtn) return;

    generateBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const formData = new FormData(form);

        const jsonData = {
            firstName: formData.get("firstName"),
            preferredName: formData.get("nickname"),
            middleInitial: formData.get("middleName"),
            lastName: formData.get("lastName"),
            divider: formData.get("divider"),
            mascotAdjective: formData.get("mascotAdj"),
            mascotAnimal: formData.get("mascotAnimal"),
            image: "images/atl_zoo.jpg",
            imageCaption: formData.get("picCaption"),
            personalStatement: formData.get("personalStatement"),
            personalBackground: formData.get("bullet1"),
            professionalBackground: formData.get("bullet5"),
            academicBackground: formData.get("bullet3"),
            subjectBackground: formData.get("bullet2"),
            primaryComputer: formData.get("bullet6"),
            funnyThing: formData.get("funnyThing"),
            share: formData.get("share"),
            quote: formData.get("quote"),
            quoteAuthor: formData.get("quoteAuthor"),
            courses: [
                {
                    department: formData.getAll("dept[]")[0],
                    number: formData.getAll("num[]")[0],
                    name: formData.getAll("cname[]")[0],
                    reason: formData.getAll("reason[]")[0]
                },
                {
                    department: formData.getAll("dept[]")[1],
                    number: formData.getAll("num[]")[1],
                    name: formData.getAll("cname[]")[1],
                    reason: formData.getAll("reason[]")[1]
                },
                {
                    department: formData.getAll("dept[]")[2],
                    number: formData.getAll("num[]")[2],
                    name: formData.getAll("cname[]")[2],
                    reason: formData.getAll("reason[]")[2]
                },
                {
                    department: formData.getAll("dept[]")[3],
                    number: formData.getAll("num[]")[3],
                    name: formData.getAll("cname[]")[3],
                    reason: formData.getAll("reason[]")[3]
                },
                {
                    department: formData.getAll("dept[]")[4],
                    number: formData.getAll("num[]")[4],
                    name: formData.getAll("cname[]")[4],
                    reason: formData.getAll("reason[]")[4]
                }
            ],
            links: [
                { name: "LinkedIn", href: formData.get("link1") },
                { name: "GitHub", href: formData.get("link2") },
                { name: "Portfolio", href: formData.get("link3") },
                { name: "Instagram", href: formData.get("link4") },
                { name: "Email", href: formData.get("link5") }
            ]
        };

        const formattedJson = JSON.stringify(jsonData, null, 2);

        const main = document.querySelector("main");
        main.innerHTML = `
            <h2>Introduction JSON</h2>
            <section>
                <pre><code class="language-json">${formattedJson}</code></pre>
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

