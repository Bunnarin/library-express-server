const PORT = 3000;
const display = document.getElementById('display');
const logoutBtn = document.getElementById('logoutBtn');
const postBtn = document.getElementById('postBtn');
const deleteBtn = document.getElementById('deleteBtn');
const inputField = document.getElementById('inputField');
const bookID = window.bookID;

logoutBtn.addEventListener('click',() => 
    axios.get(`http://localhost:${PORT}/user/logout`).then(res=>window.location.href="/user").catch(err=>alert(err)));
postBtn.addEventListener('click', post_review);
deleteBtn.addEventListener('click', delete_review);

display_reviews();

function post_review(){
    const review = inputField.value;
    const data = { review: review };
    const req = axios.post(`http://localhost:${PORT}/book/review/${bookID}`, data)
        .then(res => {alert(res.data)})
        .catch(err => {alert(err)});
}

function display_reviews(){
    const reviewList = JSON.parse(display.textContent);
    display.innerHTML = '';
    for (const key in reviewList){
        const review = document.createElement('li');
        review.innerHTML = JSON.stringify(reviewList[key]);
        display.appendChild(review);
    }
}

function delete_review(){
    let req = axios.delete(`http://localhost:${PORT}/book/review/${bookID}`)
    .then(res => alert(res.data))
    .catch(err => alert(err));
}