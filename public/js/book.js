const PORT = 3000;
const logoutBtn = document.getElementById('logoutBtn');
const display = document.getElementById('display');
const listAllBtn = document.getElementById('listAllBtn');
const searchBtn = document.getElementById('searchBtn');
const titleInput = document.getElementById('titleInput');
const authorInput = document.getElementById('authorInput');
const isbnInput = document.getElementById('isbnInput');

logoutBtn.addEventListener('click',() => 
  axios.get(`http://localhost:${PORT}/user/logout`).then(window.location.href="/user").catch(err=>alert(err)));
listAllBtn.addEventListener('click',list_all_books);
searchBtn.addEventListener('click',search_book);

async function list_all_books(){
    const response = await axios.get('http://localhost:3000/book/search')
    let bookList = response.data;
    const table = createTable(bookList);
    display.innerHTML="";
    display.appendChild(table);
}
async function search_book(){
    const response = await axios.post('http://localhost:3000/book/search',{},{
        params: {
            title: titleInput.value,
            author: authorInput.value,
            isbn: isbnInput.value
        }
    })
    .catch(err => alert(err));
    let bookList = response.data;
    const table = createTable(bookList);
    display.innerHTML="";
    display.appendChild(table);
}

function createTable(data) {
    const table = document.createElement('table');
  
    // Create table header row
    const headerRow = table.insertRow();
    const headers = ['Title', 'Author', 'ISBN']; 
    headers.forEach(header => {
      const th = document.createElement('th');
      th.textContent = header;
      headerRow.appendChild(th);
    });
  
    // Create table rows for each data object
    data.forEach(item => {
      const row = table.insertRow();
      const cells = ['title', 'author', 'ISBN']; 
      cells.forEach(cellKey => {
        const cell = row.insertCell();
        if (cellKey === 'title') {
          const link = document.createElement('a');
          link.href = `http://localhost:${PORT}/book/review/${item.id}`; // Include bookID in the URL
          link.textContent = item.title;
          cell.appendChild(link);
        } else {
          cell.textContent = item[cellKey];
        }
      });
    });
    return table;
}
