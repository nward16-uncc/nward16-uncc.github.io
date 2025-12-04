document.addEventListener("DOMContentLoaded", () => {
    const escapeHtml = (str) => (
        String(str || "")
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;")
    );

    const form = document.getElementById("introForm");
    const clearBtn = document.getElementById("clearBtn");
    const resetBtn = form.querySelector('button[type="reset"]');
    const addCourseBtn = document.getElementById("addCourse");
    const courseList = document.getElementById("coursesSection");
    const fileInput = form.querySelector("input[type='file'][name='picture']");
    const previewImage = document.getElementById("previewImage");
    const previewCaption = document.getElementById("previewCaption");
    const defaultPreviewSrc = previewImage ? previewImage.src : "";
    const defaultCaption = previewCaption ? previewCaption.textContent : "";

    const originalValues = {};
    form.querySelectorAll("input, textarea").forEach((input) => (
        input.type !== "file" && (originalValues[input.name] = input.value)
    ));

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const requiredFields = ["firstName", "lastName", "ackStatement", "ackDate"];
        for (let id of requiredFields) {
            const el = form.querySelector(`[name="${id}"]`);
            if (el && !el.value.trim()) {
                alert("Please fill out all required fields.");
                return;
            }
        }

        const data = Object.fromEntries(new FormData(form).entries());
        const main = document.querySelector("main");

        const courseDivs = courseList.querySelectorAll(".course, .course-entry, section.course, section.course-entry");
        const courses = [];
        courseDivs.forEach((div) => {
            const dept = (div.querySelector("input[name='dept[]'], input[name='department[]']") || { value: "" }).value;
            const num = (div.querySelector("input[name='num[]'], input[name='number[]']") || { value: "" }).value;
            const name = (div.querySelector("input[name='cname[]'], input[name='name[]'], input[name='courseName[]']") || { value: "" }).value;
            const reason = (div.querySelector("input[name='reason[]']") || { value: "" }).value;
            if (dept || num || name || reason) courses.push(`${dept}${dept && num ? "-" : ""}${num}: ${name} — ${reason}`);
        });

        const bullets = [];
        for (let i = 1; i <= 7; i++) {
            const val = data[`bullet${i}`] || "";
            if (val.trim()) bullets.push(val);
        }

        const links = [];
        for (let i = 1; i <= 5; i++) {
            const val = data[`link${i}`] || "";
            if (val.trim()) links.push(`<a href="${val}" target="_blank" rel="noopener noreferrer">${val}</a>`);
        }

        const pictureSrc = fileInput && fileInput.files[0] ? URL.createObjectURL(fileInput.files[0]) : defaultPreviewSrc;

        main.innerHTML = `
      <figure class="small-image">
        <img src="${pictureSrc}" alt="${escapeHtml(data.picCaption || "")}">
        <figcaption><em>${escapeHtml(data.picCaption || "")}</em></figcaption>
      </figure>
      <p>${escapeHtml(data.personalStatement || "")}</p>

      <h2>Personal Background</h2>
      <p>${escapeHtml(bullets[0] || "")}</p>

      <h2>Professional Background</h2>
      <p>${escapeHtml(bullets[1] || "")}</p>

      <h2>Academic Background</h2>
      <p>${escapeHtml(bullets[2] || "")}</p>

      <h2>Primary Computer</h2>
      <p>${escapeHtml(bullets[3] || "")}</p>

      <h2>Courses I’m Taking & Why</h2>
      <ul>${courses.map((c) => (`<li>${escapeHtml(c)}</li>`)).join("")}</ul>

      <h2>Funny/Interesting Item to Remember Me By</h2>
      <p>${escapeHtml(data.funnyThing || "")}</p>

      <blockquote>“${escapeHtml(data.quote || "")}” ~ ${escapeHtml(data.quoteAuthor || "")}</blockquote>

      <h2>Something I’d Like to Share</h2>
      <p>${escapeHtml(data.share || "")}</p>

      <h3>Links</h3>
      <ul>${links.map((l) => (`<li>${l}</li>`)).join("")}</ul>

      <p><a href="#" id="resetLink">Reset Form</a></p>
    `;

        const resetLink = document.getElementById("resetLink");
        resetLink && resetLink.addEventListener("click", (ev) => (
            ev.preventDefault(),
            location.reload()
        ));
    });

    clearBtn && clearBtn.addEventListener("click", (e) => (
        e.preventDefault(),
        form.querySelectorAll("input, textarea").forEach((input) => (
            input.type.toLowerCase() === "file" ? input.value = "" : input.value = ""
        )),
        previewImage && (previewImage.src = ""),
        previewCaption && (previewCaption.textContent = "")
    ));

    resetBtn && resetBtn.addEventListener("click", () => (
        setTimeout(() => (
            Object.keys(originalValues).forEach((key) => {
                const input = form.querySelector(`[name="${key}"]`);
                input && (input.value = originalValues[key]);
            }),
            previewImage && (previewImage.src = defaultPreviewSrc),
            previewCaption && (previewCaption.textContent = defaultCaption)
        ), 10)
    ));

    addCourseBtn && courseList && addCourseBtn.addEventListener("click", () => {
        const section = document.createElement("section");
        section.className = "course-entry";
        section.innerHTML = `
        <label>Department:
          <input type="text" name="department[]" placeholder="Department">
        </label>
        <label>Number:
          <input type="text" name="number[]" placeholder="Number">
        </label>
        <label>Course Name:
          <input type="text" name="courseName[]" placeholder="Course Name">
        </label>
        <label>Reason:
          <input type="text" name="reason[]" placeholder="Reason">
        </label>
        <button type="button" class="deleteCourse">Delete</button>
      `;
        courseList.insertBefore(section, addCourseBtn);
        const del = section.querySelector(".deleteCourse");
        del && del.addEventListener("click", () => section.remove());
    });

    courseList && courseList.addEventListener("click", (e) => (
        e.target.classList.contains("deleteCourse") && e.target.closest(".course, .course-entry") && e.target.closest(".course, .course-entry").remove()
    ));

    fileInput && previewImage && fileInput.addEventListener("change", (e) => {
        const f = e.target.files[0];
        if (f) {
            const reader = new FileReader();
            reader.onload = (ev) => (previewImage.src = ev.target.result);
            reader.readAsDataURL(f);
        } else previewImage.src = defaultPreviewSrc;
    });
});

