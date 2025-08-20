import { useEffect, useState } from "react";
import { getBooks } from "../../service/service.api";
import { CardBooks } from "../../components/CardBooks";


export const Home = () => {

  const [books, setBooks] = useState([])
  
  const bookExtract = async ()=> {
    const data = await getBooks()
    setBooks(data)
    
  }

  useEffect(()=>{
    bookExtract()
  },[])

  console.log(books);
  


  return (
    <>
      <div className="container">
        
        {
            books.map(book => (
              <CardBooks key={book.id} book={book}/>
            ))
        }

      </div>

    </>
  );
};
