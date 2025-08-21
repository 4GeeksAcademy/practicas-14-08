import { useEffect, useState } from "react";
import { getBooks } from "../../service/service.api";
import { CardBooks } from "../../components/CardBooks";

export const BooksList = () => {
  const [books, setBooks] = useState([]);

  const bookExtract = async () => {
    const data = await getBooks();
    setBooks(data);
  };

  useEffect(() => {
    bookExtract();
  }, []);
  
  return (
    <>
      <div className="container mt-4">
        <h2 className="text-center mb-4 text-white">Biblioteca de Libros</h2>
        <div className="row d-flex justify-content-center">
          {books.map((book) => (
            <CardBooks key={book.id} book={book} className="col-md-4 mb-4" />
          ))}
        </div>
      </div>
    </>
  );
};
