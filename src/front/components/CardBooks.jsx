import React from "react";

export const CardBooks = ( {book} ) => {


    


  return (
    <div className="card" style={{ width: "15rem", margin: 15 }}>
      <img
        src={book.cover}
        className="card-img-top"
        alt="El Quijote"
      />
      <div className="card-body">
        <h5 className="card-title">{book.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {book.author}
        </h6>
        <p className="card-text">
         {book.description}
        </p>
        <div className="d-flex gap-2">
          <button className="btn btn-primary btn-sm">Ver más</button>
          <button className="btn btn-outline-secondary btn-sm">❤️</button>
        </div>
      </div>
    </div>
  );
};
