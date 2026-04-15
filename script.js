const emailList = document.getElementById("emailList");
const button = document.getElementById("generateBtn");
const loader = document.getElementById("loader");

function generateEmails() {
    emailList.innerHTML = "";
    loader.classList.remove("d-none");

    const promises = [];

    for (let i = 0; i < 10; i++) {
        promises.push(
            fetch("https://flynn.boolean.careers/exercises/api/random/mail")
                .then(res => res.json())
        );
    }

    Promise.all(promises)
        .then(results => {
            loader.classList.add("d-none");

            results.forEach((result, index) => {
                const li = document.createElement("li");
                li.className = "list-group-item d-flex justify-content-between align-items-center";

                li.innerHTML = `
                    <span>${result.response}</span>
                    <span class="badge bg-primary rounded-pill">${index + 1}</span>
                `;

                emailList.appendChild(li);
            });
        })
        .catch(error => {
            loader.classList.add("d-none");
            console.error("Errore:", error);
        });
}

// click bottone
button.addEventListener("click", generateEmails);

// auto-load iniziale
generateEmails();