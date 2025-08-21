import styles from "../styles/authors.module.css";

export const CardAuthors = ({ author }) => {
  return (
    <>
      <div className={styles.card}>
        <h2 className={styles.authorName}>✍️ {author.name}</h2>

        <p className={styles.booksHeader}>
          📖 Libros ({author.books.length}):
        </p>

        <ul className={styles.bookList}>
          {author.books.map((book) => (
            <li key={book.id} className={styles.bookItem}>
              {book}
            </li>
          ))}
        </ul>
        
          <div className={`${styles.stats} mt-auto`}>
            {author.books.length === 1
              ? "1 libro publicado"
              : `${author.books.length} libros publicados`}
          </div>
        </div>
      
    </>
  );
};
