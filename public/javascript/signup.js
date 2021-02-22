//async function 
async function signupFormHandler(event) {
    event.preventDefault();
    const username = document.querySelector('#username-signup');
    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');   
    if (email && password) {
      fetch('/api/user', {
            method: 'POST',
            body: JSON.stringify({
                username: username.value,
                email: email.value,
                password: password.value
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(function() {
            console.log('is this happening')
            document.location.replace('/dashboard');
        })
        .catch(err => console.log(err));
    }
console.log('brrrrrr');
};

document.querySelector('#signup-btn').addEventListener('submit', signupFormHandler);
