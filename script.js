const salaryInput = document.getElementById("salary");
const percentInputs = document.querySelectorAll(".percent");
const percentInfo = document.getElementById("percentInfo");
const calculateBtn = document.getElementById("calculateBtn");
const resultDiv = document.getElementById("result");
const form = document.getElementById("budgetForm");

function formatNumber(value) {
  return value.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function unformatNumber(value) {
  return value.replace(/\./g, "");
}


function getTotalPercent() {
  let total = 0;
  percentInputs.forEach((input) => {
    total += Number(input.value) || 0;
  });
  return total;
}

function updateButtonState() {
  const total = getTotalPercent();
  percentInfo.textContent = `Ukupno: ${total}%`;
  calculateBtn.disabled = total !== 100 || !salaryInput.value;
}

percentInputs.forEach((input) => {
  input.addEventListener("input", updateButtonState);
});

salaryInput.addEventListener("input", (e) => {
  let rawValue = unformatNumber(e.target.value);

  // dozvoli samo brojeve
  rawValue = rawValue.replace(/\D/g, "");

  const formatted = formatNumber(rawValue);

  e.target.value = formatted;

  updateButtonState();
});


form.addEventListener("submit", (e) => {
  e.preventDefault();

  const salary = Number(unformatNumber(salaryInput.value));

  const values = {};

  percentInputs.forEach((input) => {
    values[input.dataset.key] = (salary * Number(input.value)) / 100;
  });

  resultDiv.classList.remove("show");

  resultDiv.innerHTML = `
  Od plate <strong>${salary.toLocaleString()} RSD</strong>:<br />
  • Na račune ide <strong>${values.racuni.toLocaleString()} RSD</strong><br />
  • Na hranu ide <strong>${values.hrana.toLocaleString()} RSD</strong><br />
  • Na putovanja ide <strong>${values.putovanja.toLocaleString()} RSD</strong><br />
  • Za kućni budžet ide <strong>${values.kuca.toLocaleString()} RSD</strong><br />
  • Za ličnu štednju ide <strong>${values.licno.toLocaleString()} RSD</strong>
`;

  requestAnimationFrame(() => {
    resultDiv.classList.add("show");
  });
});
