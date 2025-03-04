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

app.get("/find-by-isbn-author", (req, res) => {
  const { isbn, author } = req.query;

  const books = fs.readFileSync("books.txt").toString();
  const booksObject = books
    .split("\n")
    .slice(0, -1)
    .map((x) => {
      const [bookName, isbn, author, year] = x.split(",");
      return {
        bookName,
        isbn,
        author,
        yearPublished: +year,
      };
    });

  for (let i = 0; i < booksObject.length; i++) {
    const { bookName, isbn, author, yearPublished } = booksObject[i];
    if (isbn == req.query.isbn && author == req.query.author) {
      return res.send(booksObject[i]);
    }
  }

  return res.send({});
});

app.get("/find-by-author", (req, res) => {
  const { author } = req.query;

  const books = fs.readFileSync("books.txt").toString();
  const booksObject = books
    .split("\n")
    .slice(0, -1)
    .map((x) => {
      const [bookName, isbn, author, year] = x.split(",");
      return {
        bookName,
        isbn,
        author,
        yearPublished: +year,
      };
    });

  for (let i = 0; i < booksObject.length; i++) {
    const { bookName, isbn, author, yearPublished } = booksObject[i];
    if (author == req.query.author) {
      return res.send(booksObject[i]);
    }
  }

  return res.send({});
});

app.listen(3000, () => {
  console.log("Server started at port 3000.");
});
