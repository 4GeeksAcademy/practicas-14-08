import { useEffect, useState } from "react";
import { getBooks, getBooksFavorites } from "../../service/service.api";
import { CardBooks } from "../../components/CardBooks";
import styles from '../../styles/books.module.css'
import useGlobalReducer from "../../hooks/useGlobalReducer";

export const BooksList = () => {
  const [books, setBooks] = useState([]);
  const {store, dispatch} = useGlobalReducer()
 

  const bookExtract = async () => {
    const data = await getBooks();
    setBooks(data);
  };

 
  const favExtract = async () => {
    const dataExtract = await getBooksFavorites()
    dispatch({
      type: 'favorites',
      payload: dataExtract.favorites
    })
  }

  useEffect(() => {
    bookExtract();
    favExtract()
  }, []);

  console.log(store.favorites.books);
  

  return (
    <>
       <div style={{backgroundColor: '#e3f2fd', minHeight: '100vh', padding: '20px'}}>
        <h2 className="text-center mb-4 text-black fs-1 fw-bold">
          📚 Biblioteca de Libros 📚
        </h2>
        
        <div className="row d-flex justify-content-center">
          {books.map((book) => (
            <CardBooks key={book.id} book={book} />
          ))}
        </div>
      </div>
    </>
  );
};
