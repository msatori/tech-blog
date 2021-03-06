async function loginFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-login').value;
    const password = document.querySelector('#password-login').value;

    if (email && password) {
       fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                email,
                password
            }),
            headers: {'Content-Type': 'application/json'}
        })
        .then(function() {
            document.location.replace('/dashboard');
        })
        .catch(err => console.log(err));
    }
};

document.querySelector('.login-form').addEventListener('submit', loginFormHandler);