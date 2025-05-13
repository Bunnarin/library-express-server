const PORT = 3000;
const logoutBtn = $('#logoutBtn');
const display = $('#display');
const listAllBtn = $('#listAllBtn');
const searchBtn = $('#searchBtn');
const titleInput = $('#titleInput');
const authorInput = $('#authorInput');
const isbnInput = $('#isbnInput');
logoutBtn.on('click', () =>
  axios.get(`http://localhost:${PORT}/user/logout`).then(window.location.href="/user"));
listAllBtn.on('click', list_all_books);
searchBtn.on('click', search_book);

async function list_all_books(){
    const response = await axios.get(`http://localhost:${PORT}/book/search`);
    let bookList = response.data;
    const table = createTable(bookList);
    display.empty();
    display.append(table);
}

async function search_book(){
    alert("Searching for books...");
    const response = await axios.post(`http://localhost:${PORT}/book/search`, {}, {
        params: {
            title: titleInput.val(),
            author: authorInput.val(),
            ISBN: isbnInput.val()
        }
    })
    .catch(err => alert(err));
    let bookList = response.data;

    const table = createTable(bookList);
    display.empty();
    display.append(table);
}

function createTable(data) {
    const table = $('<table></table>');

    // Create table header row
    const headerRow = $('<tr></tr>');
    const headers = ['Title', 'Author', 'ISBN'];
    headers.forEach(header => {
        const th = $('<th></th>').text(header);
        headerRow.append(th);
    });
    table.append(headerRow);

    // Create table rows for each data object
    data.forEach(item => {
        const row = $('<tr></tr>');
        const cells = ['title', 'author', 'ISBN'];
        cells.forEach(cellKey => {
            const cell = $('<td></td>');
            if (cellKey === 'title') {
                const link = $('<a></a>').attr('href', `http://localhost:${PORT}/book/review/${item.id}`).text(item.title);
                cell.append(link);
            } else {
                cell.text(item[cellKey]);
            }
            row.append(cell);
        });
        table.append(row);
    });
    return table[0]; // Return the native DOM element
}