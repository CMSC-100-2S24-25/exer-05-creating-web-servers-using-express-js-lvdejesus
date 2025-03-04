import express from "express";
import fs from "fs";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.post("/add-book", (req, res) => {
  const { bookName, isbn, author, yearPublished } = req.body;

  if (
    typeof bookName != "string" ||
    bookName == undefined ||
    bookName == "" ||
    typeof isbn != "string" ||
    isbn == undefined ||
    isbn == "" ||
    typeof author != "string" ||
    author == undefined ||
    author == "" ||
    typeof yearPublished != "string" ||
    yearPublished == undefined ||
    yearPublished == ""
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
