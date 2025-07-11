const apiKey = "95284e539dd13b57bd6d9a66";

const dropdowns = document.querySelectorAll(".from-to select");

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option")
        newOption.innerText = currCode;
        newOption.value = currCode
        if (select.name === "from" && currCode === "USD") {
            newOption.selected = "selected";
        }
        if (select.name === "to" && currCode === "INR") {
            newOption.selected = "selected";
        }
        select.append(newOption);

    }
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);

    });
}

function updateFlag(element) {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

let btn = document.querySelector(".btn");

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
   let amount = document.querySelector("#amount");
let amtVal = parseFloat(amount.value);
let resultPara = document.querySelector(".result");

if (isNaN(amtVal) || amtVal <= 0) {
    resultPara.textContent = "Enter a valid amount greater than 0";
    resultPara.style.color = "red";
    return;
}
    try {
        const from = document.getElementById("from").value;
        const to = document.getElementById("to").value;
        const resultPara = document.querySelector(".result");
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${from}`);
        const data = await response.json();

        if (data.result === "success") {
            const rate = data.conversion_rates[to];

            const converted = (amtVal * rate).toFixed(2);
            resultPara.textContent = `${amtVal} ${from} = ${converted} ${to}`;
            resultPara.style.fontSize="1.2rem";
             resultPara.style.color = "black";

        } else {
            resultPara.textContent = "API Error: " + data["error-type"];
        }
    } catch (error) {
        resultPara.textContent = "Network error";
    }
});

