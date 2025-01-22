type BookFormat = "hardcover" | "paperback" | "ebook";
// enum
enum Genre {
  classic = "Classic",
  nonclassic = "Non-Classic",
  historical = "Historical",
  romance = "Romance",
}

type Book = {
  id: number;
  title: string;
  author: string;
  genre: Genre;
  quantity: number;
};

//  intersection type
type LibraryBook = Book & {
  format: BookFormat;
};

const Library: LibraryBook[] = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: Genre.classic,
    quantity: 5,
    format: "hardcover",
  },
];
