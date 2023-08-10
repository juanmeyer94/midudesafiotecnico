"use client";

import { useState, useMemo, useEffect } from "react";
import type { Book } from "./types";
import FavsModal from "./FavsModal"


export default function Home ({books, genres}: {books: Book[], genres: Book["genre"]}) {
  const [genre, setGenre] = useState<string>("");
  const [favs, setFavs] = useState<string[]>([]);
  const [pages, setPages] = useState<number>(0);
  const [modal, setModal] = useState<boolean>(false);

  const closeModal = () => {
     setModal(false)
  }


  const matches = useMemo(() => {
    if (modal) {
      return books.filter((book) => favs.includes(book.ISBN));
      
    } else {
     
      if (genre === "All") return books;
  
      return books.filter((book) => {
        if (pages && book.pages > pages) return false;
        if (genre && !book.genre.includes(genre)) return false;
  
        return true;
      });
    }
  }, [modal, genre, books, pages, favs]);
  

  function onFavsChanges(callback: (favs: Book["ISBN"][]) => void) {
    function getFavsList() {
      const favsList = JSON.parse(localStorage.getItem("favs") ?? "[]");
      callback(favsList);
    }

    window.addEventListener("storage", getFavsList);
    getFavsList();

    return () => window.removeEventListener("storage", getFavsList);
  }

  function handleBookClick(book: Book["ISBN"]) {
    const draft = favs.includes(book)
      ? favs.filter((favs) => favs !== book)
      : [...favs, book];
    setFavs(draft);
    localStorage.setItem("favs", JSON.stringify(draft));
  }

  useEffect(() => {
    
    const unsuscribe = onFavsChanges(setFavs);

    return () => unsuscribe();
  }, []);

  return (
    <article className="grid gap-4">
      <nav>
        <p>Buscar por género</p>
      <label  className="sr-only">Underline select</label>
        <select
        className="block py-2.5 px-0 w-full text-xl text-gray-500 bg-transparent border-0 border-b-2 border-gray-200 appearance-none dark:text-gray-400 dark:border-gray-700 focus:outline-none focus:ring-0 focus:border-gray-200 peer"
          value={genre}
          onChange={(event) => {
            setGenre(event.target.value);
          }}
        >
          <option value="All">Todos</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
        <p className="mt-2">Filtrar por paginas</p>
        <input
        className="py-1 px-1 my-1 mx-1"
    type="range"
    min={0}
    max={1500} 
    value={pages}
    onChange={(event) => {
      const newPages = parseInt(event.target.value);
      setPages(newPages);
    }}
  />
  <span className="py-2 px-2 my-2 mx-2 bg-cyan-700 rounded-md">{pages}</span>
    <button className="py-4 mx-4 my-4 px-4 bg-cyan-700 rounded-lg" onClick={() => {
      setModal(true);
    }}> Mis Favoritos</button>
         {modal && <FavsModal closemodal={closeModal} books={matches} favs={favs} handleBookClick={handleBookClick}/>}

      </nav>
      <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 ">
        
        {matches.map((book) => (
          <li
            key={book.ISBN}
            onClick={() => handleBookClick(book.ISBN)}
            className="grid gap-4"
          >
            <img
              className="aspect-[9/14] object-cover"
              src={book.cover}
              alt={book.title}
            />
            <h2 className="text-red-400">
              {favs.includes(book.ISBN) ? <span>❤️</span> : <span>🤍</span>}
              {book.title}
            </h2>
            <p>{book.synopsis}</p>
          </li>
        ))}
      
      </ul>
      
    </article>
  );
}
