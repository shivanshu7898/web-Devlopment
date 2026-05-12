function fmt(n) {
  return "₹" + n.toFixed(2);
}

function calculate() {
  const input = document.getElementById("units").value.trim();
  const errEl = document.getElementById("error-msg");

  if (input === "" || isNaN(input) || parseInt(input) <= 0) {
    errEl.textContent = "Please enter a valid positive number.";
    document.getElementById("result-section").style.display = "none";
    return;
  }

  errEl.textContent = "";
  const units = parseInt(input);

  const s1 = Math.min(units, 50);
  const s2 = Math.min(Math.max(units - 50, 0), 150);
  const s3 = Math.min(Math.max(units - 200, 0), 250);
  const s4 = Math.max(units - 450, 0);

  const subtotal = s1 * 0.5 + s2 * 0.75 + s3 * 1.2 + s4 * 1.5;
  const surcharge = subtotal * 0.2;
  const grandTotal = subtotal + surcharge;

  document.getElementById("bill-body").innerHTML = `
      <div class="bill-row">
        <span class="label">Subtotal</span>
        <span class="amount">${fmt(subtotal)}</span>
      </div>
      <div class="bill-row">
        <span class="label">Surcharge (20%)</span>
        <span class="amount">${fmt(surcharge)}</span>
      </div>
      <div class="grand-row">
        <span>Grand Total</span>
        <span>${fmt(grandTotal)}</span>
      </div>
    `;

  document.getElementById("result-section").style.display = "block";
}

function resetAll() {
  document.getElementById("units").value = "";
  document.getElementById("error-msg").textContent = "";
  document.getElementById("result-section").style.display = "none";
}

document.getElementById("units").addEventListener("keydown", function (e) {
  if (e.key === "Enter") calculate();
});
