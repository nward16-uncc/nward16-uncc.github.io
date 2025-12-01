document.addEventListener("DOMContentLoaded", function () {

    const initial = document.getElementById("initial");
    const escalate = document.getElementById("escalate");

    const feedbackInitial = document.getElementById("initial-feedback");
    const feedbackEscalate = document.getElementById("escalate-feedback");

    const button = document.getElementById("check-answers");

    const footholdKeywords = [
        "nmap", "ftp", "anonymous", "gobuster", "ssh", "enum", "scan"
    ];

    const escalateKeywords = [
        "sudo -l", "uname -a", "id", "suid", "kernel", "priv", "enumeration", "linpeas", "pspy"
    ];

    function checkAnswer(input, keywords, feedbackElement) {
        const text = input.value.toLowerCase();

        const matched = keywords.some((kw) => text.includes(kw));

        if (text.trim() === "") {
            feedbackElement.textContent = "";
            feedbackElement.className = "feedback";
            return;
        }

        if (matched) {
            feedbackElement.textContent = "✔ Correct approach!";
            feedbackElement.className = "feedback correct";
        } else {
            feedbackElement.textContent = "✘ Not wrong, but not typical based on earlier examples.";
            feedbackElement.className = "feedback incorrect";
        }
    }

    button.addEventListener("click", () => {
        checkAnswer(initial, footholdKeywords, feedbackInitial);
        checkAnswer(escalate, escalateKeywords, feedbackEscalate);
    });

});
