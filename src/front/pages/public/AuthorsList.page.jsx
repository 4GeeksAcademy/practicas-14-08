import { useEffect, useState } from "react";
import { getAuthors } from "../../service/service.api";
import styles from "../../styles/authors.module.css";
import {CardAuthors} from "../../components/CardAuthors";

export const AuthorsList = () => {
  const [showAuthors, setShowAuthors] = useState([]);

  const authorsExtract = async () => {
    const data = await getAuthors();
    setShowAuthors(data);
  };

  useEffect(() => {
    authorsExtract();
  }, []);

  return (
    <>
      <div className={styles.container} style={{backgroundColor: '#e3f2fd'}}>
        <h1 className={styles.title}>🖋️ Nuestros Autores 🖋️</h1>

        <div className={styles.grid}>
          {showAuthors.map((author) => (
            <CardAuthors key={author.id} author={author} />
          ))}
        </div>
      </div>
    </>
  );
};
