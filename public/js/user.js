const PORT = 3000;
const usernameField = document.getElementById('username');
const passwordField = document.getElementById('password');
const loginBtn = document.getElementById('login');
const registerBtn = document.getElementById('register');
loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);

function login(){
    let username = usernameField.value;
    let password = passwordField.value;
    let data = {
        username: username,
        password: password,
    }
    let req = axios.post(`http://localhost:${PORT}/user/login`, data)
    .then(res => window.location.href="/book")
    .catch(err => alert(err));
}

function register(){
    let username = usernameField.value;
    let password = passwordField.value;
    let data = {
        username: username,
        password: password,
    }
    
    let req = axios.post(`http://localhost:${PORT}/user/register`, data);
    req.then(res => {alert(res.data)})
    .catch(err => {alert(err)});
}