import Home from "./client";
import data from "./books.json";
import type { Book } from "./types";

const books: Book[] = data.library.map((data) => data.book);
const genres: Book["genre"][] = Array.from(new Set(books.map((books) => books.genre)));

export default function name() {
    

    return <Home books={books} genres={genres}/>
}