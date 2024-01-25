const express = require("express");
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

//Creating a class Book that represents a book in a library.
class Book {
  constructor(title, author, ISBN) {
    // Initialize attributes
    this.title = title;
    this.author = author;
    this.ISBN = ISBN;
  }
  displayInfo() {
    // Display book information
    console.log(
      `Title: ${this.title}\nAuthor: ${this.author}\nISBN: ${this.ISBN}`
    );
  }
}

//Creating a subclass EBook that inherits from the Book class.
class EBook extends Book {
  constructor(title, author, ISBN, fileFormat) {
    super(title, author, ISBN);
    // Initialize fileFormat
    this.fileFormat = fileFormat;
  }
  displayInfo() {
    super.displayInfo();
    console.log(`File Format: ${this.fileFormat}`);
    // Override to display eBook information
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  // Added book to library
  addBook(book) {
    if (book instanceof Book) {
      this.books.push(book);
      console.log(`Book ${book.title} added to  the library`);
    } else {
      throw new Error(
        "Invalid book object. Must be an  instance of the Book class."
      );
    }
  }
  displayBooks() {
    // Display all books in library
    if (this.books.length === 0) {
      console.log("The library is Empty...");
    } else {
      this.books.forEach((book) => {
        book.displayInfo();
        console.log("--------");
      });
    }
  }
  searchByTitle(title) {
    // Search books by title
    const foundBook = this.books.find(
      (book) => book.title.toLowerCase() === title.toLowerCase()
    );
    if (foundBook) {
      return foundBook;
    } else {
      console.log(`Book with title ${title} not found.`);
      return null;
    }
  }
}

const library = new Library();
try {
  const book1 = new Book("Node js Course", "node author", "987654321");
  const ebook1 = new EBook(
    "Python Crash Course",
    "py author",
    "123456789",
    "PDF"
  );

  library.addBook(book1);
  library.addBook(ebook1);

  library.displayBooks();

  const searchResult = library.searchByTitle("Python Crash Course");
  if (searchResult) {
    searchResult.displayInfo();
  }
} catch (error) {
  console.error(`Error: ${error.message}`);
}

app.post("/addBook", (req, res) => {
  // Logic to add a book
  try {
    const { title, author, ISBN, fileFormat } = req.body;
    const newBook = fileFormat
      ? new EBook(title, author, ISBN, fileFormat)
      : new Book(title, author, ISBN);

    library.addBook(newBook);
    res.json({ message: "Book added successfully" });
  } catch (error) {
    console.log(`Error adding book: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/listBooks", (req, res) => {
  // Logic to list books
  try {
    const books = library.books.map((book) => ({
      title: book.title,
      author: book.author,
      ISBN: book.ISBN,
      fileFormat: book.fileFormat || null,
    }));
    res.json(books);
  } catch (error) {
    console.log(`Error listing book: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/deleteBook", (req, res) => {
  // Logic to delete a book
  try {
    const titleToDelete = req.params.title;
    const indexToDelete = library.books.findIdex(
      (book) => book.title.toLowerCase() === titleToDelete.toLowerCase()
    );

    if (indexToDelete !== -1) {
      const deletedBook = library.books.splice(indexToDelete, 1)[0];
      res.json({ message: `Book ${deletedBook.title} deleted successfully.` });
    } else {
      res
        .status(404)
        .json({ error: `Book with title ${titleToDelete} not found.` });
    }
  } catch (error) {
    console.log(`Error delete book: ${error.message}`);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
