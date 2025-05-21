document.querySelector('.volunteer-form').addEventListener('submit', function (e) {
    let isValid = true;

    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });

    const requiredFields = ['#name', '#phone'];
    requiredFields.forEach(selector => {
        const field = document.querySelector(selector);
        if (!field.value.trim()) {
            field.closest('.form-group').classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) {
        e.preventDefault();
    }
});
document.querySelectorAll('input[required], textarea[required]').forEach(input => {
    input.addEventListener('blur', function () {
        const group = this.closest('.form-group');
        if (!this.value.trim()) {
            group.classList.add('error');
        } else {
            group.classList.remove('error');
        }
    });

    input.addEventListener('input', function () {
        const group = this.closest('.form-group');
        if (this.value.trim()) {
            group.classList.remove('error');
        }
    });
});

document.querySelector('.volunteer-form').addEventListener('submit', function (e) {
    e.preventDefault(); 

    let isValid = true;

    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });


    const requiredFields = ['#name', '#phone'];
    requiredFields.forEach(selector => {
        const field = document.querySelector(selector);
        if (!field.value.trim()) {
            field.closest('.form-group').classList.add('error');
            isValid = false;
        }
    });

    if (!isValid) return;


    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        phone: document.getElementById('phone').value.trim(),
        help: document.getElementById('help').value.trim(),
        timestamp: new Date().toISOString()
    };


    const key = 'volunteerApplications';
    const stored = localStorage.getItem(key);
    const applications = stored ? JSON.parse(stored) : [];

    applications.push(formData);
    localStorage.setItem(key, JSON.stringify(applications));


    document.querySelector('#success-message').style.display = 'block';


    this.reset();
});