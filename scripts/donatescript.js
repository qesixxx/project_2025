document.addEventListener('DOMContentLoaded', function() {
    const options = document.querySelectorAll('.donation-option');
    const boostyForm = document.getElementById('boostyForm');
    const boostyAmount = document.getElementById('boostyAmount');
    const customAmountBlock = document.getElementById('customAmountBlock');
    const customAmount = document.getElementById('customAmount');
    const customDonateLink = document.getElementById('customDonateLink');
    

    options.forEach(option => {
        option.addEventListener('click', function() {
            const amount = this.getAttribute('data-amount');
            
            if (amount === 'other') {
                boostyForm.style.display = 'none';
                customAmountBlock.style.display = 'block';
            } else {
                boostyAmount.value = amount;
                boostyForm.style.display = 'block';
                customAmountBlock.style.display = 'none';
            }
        });
    });
    

    customDonateLink.addEventListener('click', function(e) {
        e.preventDefault();
        const amount = customAmount.value;
        if (amount >= 50) {
            window.open(`https://boosty.to/ваш_ник/donate?amount=${amount}`, '_blank');
        } else {
            alert('Минимальная сумма пожертвования - 50₽');
        }
    });
    

    boostyAmount.value = '300';
});