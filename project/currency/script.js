async function get() {
  let amount = document.getElementById("amount").value;
  let currency = document.getElementById("currency").value;

  const response = await fetch("https://open.er-api.com/v6/latest/INR");

  const data = await response.json();
  console.log(data);

  let rate = data.rates[currency];

  let finalAmount = amount * rate;

  document.querySelector("#result").innerText =
    `${amount} INR = ${finalAmount.toFixed(2)} ${currency}`;
}
