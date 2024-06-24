const paymentForm = document.getElementById('paymentForm');
paymentForm.addEventListener("submit", payWithPaystack, false);

// Retrieve the previous amount value from localStorage
document.addEventListener('DOMContentLoaded', function() {
  var amount = localStorage.getItem('amount');
  if (amount) {
      document.getElementById('amount').value = amount;
  }
});

document.getElementById('paymentForm').addEventListener('submit', function(e) {
  e.preventDefault();
  var amount = document.getElementById('amount').value;
  // Save the amount value to localStorage
  localStorage.setItem('amount', amount);
  payWithPaystack();
});

function payWithPaystack(e) {
  e.preventDefault();

  let handler = PaystackPop.setup({
    key: 'pk_live_b115ad14040e0e8b3e0c5f09cbbad902565b5b6b', // Replace with your public key
    email: document.getElementById("email-address").value,
    currency: 'GHS',
    amount: document.getElementById("amount").value * 100,
    ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    // onClose: function(){
    //   alert('Window closed.');
    // },
    callback: function(response){
      let message = 'Payment complete! Reference: ' + response.reference;
      alert(message);
    }
  });

  handler.openIframe();
}

