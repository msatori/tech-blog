//async function 
async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');   

    if (email && password) {
      fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function() {
            document.location.replace('/dashboard');
        })
        .catch(err => console.log(err));
    }
console.log();
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
