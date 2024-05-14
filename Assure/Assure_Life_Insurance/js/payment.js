const cardNameInput = document.querySelector('.cardName');
                const cardNumberInput = document.querySelector('.cardNumber');
                const expiryInput = document.querySelector('.expiry');
                const cvvInput = document.querySelector('.cvv');
                const proceedButton = document.querySelector('.proceed');

                // Add click event listener to the proceed button
        proceedButton.addEventListener('click', function(event) {
                // Prevent form submission if required fields are empty
         if (cardNameInput.value === '' || cardNumberInput.value === '' || expiryInput.value === '' || cvvInput.value === '') {
                event.preventDefault();
                alert('Please fill in all the required fields.');
         }
});