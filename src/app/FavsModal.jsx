const FavsModal = ({ closemodal, books, favs, handleBookClick }) => {

    return (
        <div className="fixed top-0 left-0 flex items-center justify-center w-screen h-screen bg-gray-900 bg-opacity-50">
        <div className="bg-white rounded-lg shadow-lg w-[80%]">
          <div className="p-4 flex items-center justify-between bg-cyan-700 text-white">
            <h3 className="text-2xl font-bold -my-4">LIBROS FAVORITOS</h3>
            <button className="text-white hover:text-gray-300 focus:outline-none" onClick={closemodal}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="p-4">
            <div className="px-8 py-8 items-center mx-12 my-4">
              <div className="bg-gray-900 p-4 rounded-lg">
                <h4 className="text-lg font-bold text-center">Mis libros favoritos</h4>
                <ul className="grid w-full grid-cols-[repeat(auto-fill,minmax(240px,1fr))] gap-4 ">
        
        {books.map((book) => (
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
              </div>
            </div>
          </div>
         
        </div>
      </div>
      
    );
};

export default FavsModal;
