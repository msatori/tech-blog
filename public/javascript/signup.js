//async function 
async function signupFormHandler(event) {
    event.preventDefault();

    const email = document.querySelector('#email-signup');
    const password = document.querySelector('#password-signup');   

    if (email && password) {
      fetch('/api/users', {
            method: 'post',
            body: JSON.stringify({
         
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
console.log('please');
};

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);
