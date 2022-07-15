let myLibrary = [];

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }
}

// GET BOOKS FROM LOCAL STORAGE
if (localStorage.getItem("books") === null) {
  myLibrary = [];
} else {
  const booksFromStorage = JSON.parse(localStorage.getItem("books"));
  myLibrary = booksFromStorage;
}

function showLibraryInfo() {
  const booksRead = document.querySelector("#books-read");
  const booksUnread = document.querySelector("#books-unread");
  const totalBooks = document.querySelector("#total-books");
  let readCounter = 0;
  let unreadCounter = 0;
  booksRead.textContent = 0;
  booksUnread.textContent = 0;
  for (let i = 0; i < myLibrary.length; i += 1) {
    if (myLibrary[i].status === true) {
      readCounter += 1;
      booksRead.textContent = readCounter;
    } else if (myLibrary[i].status === false) {
      unreadCounter += 1;
      booksUnread.textContent = unreadCounter;
    }
  }
  totalBooks.textContent = myLibrary.length;
}

function showBooksInLibrary() {
  // SAVE TO LOCAL STORAGE
  localStorage.setItem("books", JSON.stringify(myLibrary));
  showLibraryInfo();

  console.log(myLibrary);

  const bookList = document.querySelector("#tableBody");
  bookList.textContent = "";

  for (let i = 0; i < myLibrary.length; i += 1) {
    tableBody = document.getElementById("tableBody");

    // console.log(myLibrary);

    let uiString = `<tr>
    
          <td>${myLibrary[i].title}</td>
          <td>${myLibrary[i].pages}</td>
          <td>${myLibrary[i].author}</td> 
          <td>${myLibrary[i].status}</td> 
          <td><button onclick=>Delete</button></td>                    
          </tr>`;
    tableBody.innerHTML += uiString;
  }
}

function addBookToLibrary(title, author, pages, status) {
  const book = new Book(title, author, pages, status);
  myLibrary.push(book);
  showBooksInLibrary();
}

// FORM VALIDATION
function validateForm() {
  const form = document.querySelector("form");
  const titleInput = document.querySelector("#title");
  const titleErr = document.querySelector(".title");
  const nameInput = document.querySelector("#name");
  const nameErr = document.querySelector(".name");
  const numberInput = document.querySelector("#number");
  const numberErr = document.querySelector(".number");
  const checkbox = document.querySelector('input[name="checkbox"]');
  if (titleInput.value === "") {
    titleErr.style.display = "block";
  } else {
     titleErr.style.display = "none";
   }
   if (nameInput.value === "") {
     nameErr.style.display = "block";
   } else {
     nameErr.style.display = "none";
   }
  if (
     numberInput.value === "" ||
     numberInput.value.match(/[^1-9]/) ||
     numberInput.value <= 0
   ) {
     numberErr.style.display = "block";
   } else {
     numberErr.style.display = "none";
   }


  if (
    titleInput.value !== "" &&
    nameInput.value !== "" &&
    numberInput.value !== "" &&
    numberInput.value > 0
  ) {
    if (checkbox.checked) {
      addBookToLibrary(
        titleInput.value,
        nameInput.value,
        numberInput.value,
        true
      );
    } else {
      addBookToLibrary(
        titleInput.value,
        nameInput.value,
        numberInput.value,
        false
      );
    }
    form.reset();
  }
}

// MODAL FOR BOOKS REMOVAL
function manipulateModal() {
  const modal = document.querySelector("#modal");
  modal.style.display = "block";
  modal.addEventListener("click", (event) => {
    const { target } = event;
    if (target.classList.contains("close")) {
      modal.style.display = "none";
    } else if (target.classList.contains("confirm-removal")) {
      myLibrary = [];
      modal.style.display = "none";
    }
  });
}

function listenClicks() {
  document.addEventListener("click", (event) => {
    const { target } = event;
    const tr = target.parentNode.parentNode.rowIndex - 1;
    if (target.id === "add-book") {
      validateForm(event);
    } else if (target.id === "delete-all-btn") {
      manipulateModal();
    } else if (target.classList.contains("fa-trash-alt")) {
      myLibrary.splice(tr, 1);
    } else if (target.classList.contains("fa-check")) {
      target.classList.remove("fa-check");
      target.classList.add("fa-times");
      myLibrary[tr].status = false;
    } else if (target.classList.contains("fa-times")) {
      target.classList.remove("fa-times");
      target.classList.add("fa-check");
      myLibrary[tr].status = true;
    }
    showBooksInLibrary();
  });
}

function deleteAllBooks() {
  alert("Delete the  book");
  localStorage.clear();
}

showBooksInLibrary();
// listenClicks();