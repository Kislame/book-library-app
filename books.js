const myLibrary = [];

const addBookBtn = document.querySelector("#addBook");
const form = document.querySelector("#book-form");
const title = document.querySelector("#book-name");
const pagesNumber = document.querySelector("#book-pages");
const answer = document.querySelector("#answer");
const author = document.querySelector("#book-author");
const books = document.querySelector(".books");
const bookFormContainer = document.querySelector("#form-container");

function Book(title, author, pages, read) {
  // the constructor...
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;

  this.info = () => {
    return `${this.title} written by ${this.author} it has ${this.pages} pages read status: ${this.read}`;
  };
}

Book.prototype.changeRead = function () {
  this.read = !this.read;
};

function addBookToLibrary(data) {
  const newBook = new Book(
    data.title,
    data.author,
    data.pagesNumber,
    data.answerValue
  );
  myLibrary.push(newBook);
  console.log(myLibrary);
  // myLibrary.forEach((book, index) => {
  //   createBook(book, index);
  // });
  renderBooks();
  bookFormContainer.classList.toggle("show");
  bookFormContainer.classList.toggle("hidden");
  addBookBtn.classList.toggle("hidden");

  // do stuff here
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let obj = {
    title: title.value,
    author: author.value,
    pagesNumber: pagesNumber.value,
    answerValue: answer.checked,
  };
  addBookToLibrary(obj);
});

function createBook(obj, index) {
  const div = document.createElement("div");
  const bookTitle = document.createElement("h3");
  bookTitle.textContent = obj.title;
  const bookAuthor = document.createElement("p");
  bookAuthor.textContent = obj.author;
  const numberOfPages = document.createElement("span");
  numberOfPages.textContent = obj.pages;
  const answer = document.createElement("p");
  answer.innerText = obj.read
    ? "i have read the book"
    : "i didnt read the book yet";

  const delBtn = document.createElement("button");
  delBtn.classList.add("delete-book");
  delBtn.textContent = "remove";
  delBtn.addEventListener("click", () => {
    removeBook(index);
  });

  const changeReadState = document.createElement("button");
  changeReadState.classList.add("change-btn");
  changeReadState.textContent = "change read status";
  changeReadState.addEventListener("click", () => {
    change(index);
    answer.innerText = obj.read
      ? "i have read the book"
      : "i didnt read the book yet";
  });

  div.append(
    bookTitle,
    bookAuthor,
    numberOfPages,
    answer,
    delBtn,
    changeReadState
  );
  div.classList.add("book");
  div.dataset.id = index;
  books.append(div);
}

function renderBooks() {
  const bookList = books.querySelectorAll(".book");
  // const dataindexs = Array.from(bookList).map((book) => book.dataset.id);
  // console.log(dataindexs);

  bookList.forEach((item) => {
    item.remove();
  });

  myLibrary.forEach((book, index) => {
    createBook(book, index);
  });
}

function removeBook(id) {
  const index = myLibrary.findIndex((book, index) => index === id);
  myLibrary.splice(index, 1);
  const book = document.querySelector(`[data-id="${id}"]`);
  book.remove();
}

function change(id) {
  myLibrary.forEach((book, index) => {
    if (index == id) {
      book.changeRead();
      console.log(book.info());
    }
  });
}

addBookBtn.addEventListener("click", () => {
  bookFormContainer.classList.toggle("hidden");
  bookFormContainer.classList.toggle("show");
  addBookBtn.classList.toggle("hidden");
});
