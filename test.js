import needle from "needle";

const books = [
  {
    bookName: "Harry Potter and the Philosopher’s Stone",
    isbn: "978-0-7475-3269-9",
    author: "J.K Rowling",
    yearPublished: 1997,
  },
  {
    bookName: "Harry Potter and the Chamber of Secrets",
    isbn: "0-7475-3849-2",
    author: "J.K Rowling",
    yearPublished: 1998,
  },
  {
    bookName: "The Little Prince",
    isbn: "978-0156012195",
    author: "Antoine Saint-Exupery",
    yearPublished: 1943,
  },
];

for (let i = 0; i < 3; i++) {
  needle.post("http://localhost:3000/add-book", books[i], (err, res) => {
    console.log(res.body);
  });
}

needle.get(
  "http://localhost:3000/find-by-isbn-author?isbn=978-0-7475-3269-9&author=J.K+Rowling",
  (err, res) => {
    console.log(res.body);
  },
);

needle.get(
  "http://localhost:3000/find-by-author?author=J.K+Rowling",
  (err, res) => {
    console.log(res.body);
  },
);
