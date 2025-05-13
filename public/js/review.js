const PORT = 3000;
const display = $('#display');
const logoutBtn = $('#logoutBtn');
const postBtn = $('#postBtn');
const deleteBtn = $('#deleteBtn');
const inputField = $('#inputField');
const bookID = window.bookID;

logoutBtn.on('click', () =>
    axios.get(`http://localhost:${PORT}/user/logout`).then(res => window.location.href="/user").catch(err => alert(err))
);
postBtn.on('click', post_review);
deleteBtn.on('click', delete_review);

$(document).ready(display_reviews);

function post_review(){
    const review = inputField.val();
    const data = { review: review };
    axios.post(`http://localhost:${PORT}/book/review/${bookID}`, data)
        .then(res => {alert(res.data)})
        .catch(err => {alert(err)});
}

function display_reviews(){
    const reviewList = JSON.parse(display.text());
    display.empty();
    for (const key in reviewList){
        const review = $('<li></li>').text(JSON.stringify(reviewList[key]));
        display.append(review);
    }
}

function delete_review(){
    axios.delete(`http://localhost:${PORT}/book/review/${bookID}`)
    .then(res => alert(res.data))
    .catch(err => alert(err));
}