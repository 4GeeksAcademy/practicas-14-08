import React from "react";
import styles from "../styles/books.module.css";

export const CardBooks = ({ book }) => {
  return (
    <>
      <div className="col-md-4 my-4 mx-2">
        <div className={styles.bookCard}>
          <div className={styles.bookCoverContainer}>
            {book.cover ? (
              <img
                src={book.cover}
                alt={book.title}
                className={styles.bookCover}
              />
            ) : null}
          </div>

          {/* Cuerpo de la tarjeta */}
          <div className={styles.bookBody}>
            <h5 className={styles.bookTitle}>{book.title}</h5>

            <div className={styles.bookAuthor}>
              <i className="fas fa-user-edit" style={{ fontSize: "12px" }}></i>
              {book.author}
            </div>

            <p className={styles.bookDescription}>{book.description}</p>

            <div className={styles.bookActions}>
              <div className="d-flex gap-2 align-items-center">
                <button className={styles.btnPrimaryCustom}>
                  <i className="fas fa-eye me-1"></i>
                  Ver más
                </button>
                <button className={styles.btnFavorite}>❤️</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
