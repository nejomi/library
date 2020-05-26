let main = document.querySelector('main');
let bookList = document.querySelector('div.book-list');
let bookCount = document.querySelector('div.book-count');
let scrollStatus = document.querySelector('div.scroll-status');

let close = document.querySelector('img.close');
let addButton = document.querySelector('button.button-add')
let addBook = document.querySelector('button.add-book-button');

let form = document.querySelector('div.form-bg');
let author = document.querySelector('#author');
let title = document.querySelector('#title');
let finished = document.querySelector('#finished')
let unFinished = document.querySelector('#unfinished')

let myLibrary = [];
let closeArr; // for the array of closess
let readArr;

window.addEventListener("load", () => {
    
    render(myLibrary);  
    updateCount();
    checkList();
    loadCloses();
    loadRead ();
    
})

// book constructor
class Book {
    constructor (title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

function checkList() {
    if (bookList.innerText == "") {
        let noBook = document.createElement('div');
        noBook.classList.add("no-book");
        noBook.innerHTML = "no books! add books to start";
        bookList.appendChild(noBook);
    }
}

function clearForm() {
    title.value = "";
    author.value = "";
    pages.value = ""
    finished.check = true;
}
function addBookToLibrary() {  

    if (title.value === "" || author.value === "" || pages.value === "") {
        alert("please fill all fields");
        return;
    }
    let bool;

    if (finished.checked) {
        bool = true;
    }
    else if (unFinished.checked) {
        bool = false;
    }

    let newBook = new Book(title.value, author.value, pages.value, bool)
    myLibrary.push(newBook);
}

function render(library) {

    bookList.innerHTML = "";
    for (i = 0; i < library.length; i++) {
        let book = document.createElement('div');
        book.classList.add('book');

        // create the left div of the book 
        let bookDetailsLeft = document.createElement('div');

        // adds the title to left div
        let bookTitle = document.createElement('div');
        bookTitle.classList.add('book-title');
        bookTitle.innerHTML = myLibrary[i].title;
        if (myLibrary[i].title.length >= 40) // if the title is 40characters or more, add a class that lowers font size
            bookTitle.classList.add('font-lower')
        bookDetailsLeft.appendChild(bookTitle);

        // adds the author to left div
        let bookAuthor = document.createElement('div');
        bookAuthor.classList.add('book-author');
        bookAuthor.innerHTML = myLibrary[i].author; 
        bookDetailsLeft.appendChild(bookAuthor);

        // create the right div of the book
        let bookDetailsRight = document.createElement('div');

        // adds the read status button
        let bookRead = document.createElement('div');
        bookRead.classList.add('button-read');
        if (myLibrary[i].read == true) // if the 'read' value is true then it is complete
            bookRead.innerHTML = "completed"
        else {
            bookRead.innerHTML = "unfinished"
            bookRead.classList.add("unfinished")
        }
        bookDetailsRight.appendChild(bookRead);

        // adds the pages details to the book div
        let bookPages = document.createElement('div');
        bookPages.classList.add('pages');
        bookPages.innerHTML = `${myLibrary[i].pages } pages`;
        bookDetailsRight.appendChild(bookPages);

        // adds a close button to the book
        let delBook = document.createElement('img');
        delBook.classList.add("book-delete", "book-delete:hover");
        delBook.src = "assets/close.svg";
        
        book.appendChild(delBook);
        book.appendChild(bookDetailsLeft);
        book.appendChild(bookDetailsRight);

        
        book.id = `book${i}`;
        bookList.appendChild(book);
    }
}

function updateCount() {
    let count = myLibrary.length;
    if (count == 0) {
        if (bookCount.innerHTML != "") {
            bookCount.innerHTML = ""
        }
        return
    }
        
    bookCount.innerHTML = `books: ${myLibrary.length}`;
    myLibrary.length > 4 ? scrollStatus.style.display = "block" : scrollStatus.style.display = "none" // String.length > 40 add class lower-text
}

close.addEventListener("click", () => {
    form.style.display = "none";
}
)

addButton.addEventListener("click", () => {
    form.style.display = "block";
})

addBook.addEventListener("click", () => {
    addBookToLibrary();
    render(myLibrary);
    loadCloses();
    loadRead();
    checkList();
    updateCount();
    clearForm();
});



function loadCloses () {
    closeArr = Array.from(document.querySelectorAll('div.book'));
    
    for(i=0; i< closeArr.length; i++) {
        let x =closeArr[i].id.substr(-1)
        let func = () => {
            myLibrary.splice(x, 1);
            render(myLibrary);
            loadCloses();
            loadRead();
            checkList();
            updateCount();
        }
        closeArr[i].removeEventListener("click", func);
        closeArr[i].firstChild.addEventListener("click", func)
        
    }
}

function loadRead () {
    readArr = Array.from(document.querySelectorAll('div.book'));
    
    for(i=0; i< readArr.length; i++) {
        let index = readArr[i].id.substr(-1)
        let funct = () => {
            myLibrary[index].read = !myLibrary[index].read;
            render(myLibrary);
            loadCloses();
            loadRead();
        }
        readArr[i].children[2].firstChild.addEventListener("click", funct);
    }

}
myLibrary.push(ben);