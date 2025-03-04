import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/add-book", (req, res) => {
  const { bookName, isbn, author, yearPublished } = req.body;
  let hasBook = false;
  try {
    const books = get_books();
    hasBook = books.find(book => book.isbn == isbn) != undefined // if isbn already exists
  } catch (e) {
  }

  if (
    bookName == undefined ||
    bookName == "" ||
    isbn == undefined ||
    isbn == "" ||
    author == undefined ||
    author == "" ||
    yearPublished == undefined ||
    yearPublished == "" || hasBook
  ) {
    return res.send({ success: false });
  }

  const year = +yearPublished;

  fs.appendFileSync("books.txt", `${bookName},${isbn},${author},${year}\n`);

  return res.send({ success: true });
});

function get_books() {
  const books = fs.readFileSync("books.txt").toString();
  return books
    .split("\n") // split by lines
    .slice(0, -1) // remove blank from after the last newline
    .map((x) => {
      const [bookName, isbn, author, year] = x.split(",");
      return {
        bookName,
        isbn,
        author,
        yearPublished: +year,
      };
    });
}

app.get("/find-by-isbn-author", (req, res) => {
  const { isbn, author } = req.query;
  const books = get_books();
  return res.send(books.find((book) => book.isbn == isbn && book.author == author));
});

app.get("/find-by-author", (req, res) => {
  const { author } = req.query;
  const books = get_books();
  return res.send(books.filter((x) => x.author == author));
});

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});
