 function calculate() {
      // Reset errors
      document.querySelectorAll('.error').forEach(e => e.style.display = 'none');
 
      const bill = parseFloat(document.getElementById('billAmount').value);
      const tipPct = parseFloat(document.getElementById('serviceQuality').value);
      const persons = parseInt(document.getElementById('persons').value);
 
      let valid = true;
 
      if (isNaN(bill) || bill <= 0) {
        document.getElementById('billError').style.display = 'block';
        valid = false;
      }
      if (isNaN(tipPct)) {
        document.getElementById('serviceError').style.display = 'block';
        valid = false;
      }
      if (isNaN(persons) || persons < 1) {
        document.getElementById('personsError').style.display = 'block';
        valid = false;
      }
 
      if (!valid) {
        document.getElementById('resultBox').classList.remove('show');
        return;
      }
 
      const tipAmount = (bill * tipPct) / 100;
      const totalBill = bill + tipAmount;
      const perPerson = totalBill / persons;
 
      document.getElementById('resBill').textContent = '₹' + bill.toFixed(2);
      document.getElementById('resTipPct').textContent = tipPct + '%';
      document.getElementById('resTip').textContent = '₹' + tipAmount.toFixed(2);
      document.getElementById('resTotal').textContent = '₹' + totalBill.toFixed(2);
      document.getElementById('resPersons').textContent = persons;
      document.getElementById('resPerPerson').textContent = '₹' + perPerson.toFixed(2);
 
      document.getElementById('resultBox').classList.add('show');
    }