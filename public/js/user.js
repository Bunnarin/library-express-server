const PORT = 3000;
const usernameField = $('#username');
const passwordField = $('#password');
const loginBtn = $('#login');
const registerBtn = $('#register');

loginBtn.on('click', login);
registerBtn.on('click', register);

function login(){
    let username = usernameField.val();
    let password = passwordField.val();
    let data = {
        username: username,
        password: password,
    };
    axios.post(`http://localhost:${PORT}/user/login`, data)
        .then(res => window.location.href="/book")
        .catch(err => alert(err));
}

function register(){
    let username = usernameField.val();
    let password = passwordField.val();
    let data = {
        username: username,
        password: password,
    };

    axios.post(`http://localhost:${PORT}/user/register`, data)
        .then(res => {alert(res.data)})
        .catch(err => {alert(err)});
}