document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("diagnosisForm");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const formData = new FormData(form);

        const payload = {
            age: formData.get("age"),
            sex: formData.get("sex"),
            cp: formData.get("cp"),
            trestbps: formData.get("trestbps"),
            chol: formData.get("chol"),
            fbs: formData.get("fbs"),
            restecg: formData.get("restecg"),
            thalach: formData.get("thalach"),
            exang: formData.get("exang"),
            oldpeak: formData.get("oldpeak"),
            slope: formData.get("slope"),
            ca: formData.get("ca"),
            thal: formData.get("thal")
        };

        const response = await fetch("/api/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        document.getElementById("resultsSection").style.display = "block";

        document.getElementById("resultBox").innerHTML = `
            <h3>${data.diagnosis}</h3>
            <p class="diagnosis-text">${data.expert_decision}</p>
        `;

        document.getElementById("diseaseBar").style.width =
            (data.probability_disease * 100) + "%";

        document.getElementById("noDiseaseBar").style.width =
            (data.probability_no_disease * 100) + "%";

        document.getElementById("diseaseProb").innerText =
            (data.probability_disease * 100).toFixed(1) + "%";

        document.getElementById("noDiseaseProb").innerText =
            (data.probability_no_disease * 100).toFixed(1) + "%";

        const rulesList = document.getElementById("rulesList");

        rulesList.innerHTML = "";

        data.triggered_rules.forEach(rule => {

            const li = document.createElement("li");

            li.textContent = rule;

            rulesList.appendChild(li);

        });

        document.getElementById("accuracy").innerText =
            (data.model_accuracy * 100).toFixed(1) + "%";

    });

});