const urlApi = import.meta.env.VITE_BACKEND_URL;

export const createUser = async (newUser) => {
  try {
    const response = await fetch(`${urlApi}/api/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.msg || "Error desconocido",
        status: response.status,
      };
    };
    return {
      success: true,
      data: data,
      token: data.token,
    };
  } catch (error) {
    return { error: error.msg };
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch(`${urlApi}/api/users/login`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({email, password})
    });
    const data = await response.json();
    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.msg || data.message || "Error desconocido",
        status: response.status,
      };
    }
    return {
      success: true,
      data: data,
      token: data.token
    };
  } catch (error) {
    return { error: error.msg };
  }
};

export const createAuthors = async () => {
  const authorsDict = [
  {"name": "Gabriel García Márquez"},
  {"name": "Miguel de Cervantes"},
  {"name": "George Orwell"},
  {"name": "J.K. Rowling"},
  {"name": "Stephen King"},
  {"name": "Isabel Allende"}
];
  
  try {
    const responses = await Promise.all(
      authorsDict.map(async (autor) => {
        const response = await fetch(`${urlApi}/api/author`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: autor.name })
        });
        
        const data = await responses.json();
        return { autor: autor.name, success: response.ok, data };
      })
    );
    
  } catch (error) {
    console.error('Error:', error);
  }
};

export const createBooks = async () => {
  const booksDict = [
  {
    'titulo': "Cien años de soledad",
    'cover': "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
    'descripcion': "Una saga familiar que narra la historia de los Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo. Una obra maestra del realismo mágico que explora temas de amor, soledad, guerra y el paso del tiempo.",
    'autor_id': 1  // Gabriel García Márquez
  },
  {
    'titulo': "El amor en los tiempos del cólera",
    'cover': "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=300&h=400&fit=crop",
    'descripcion': "La historia de amor entre Florentino Ariza y Fermina Daza que abarca más de cincuenta años. Una exploración poética del amor en todas sus formas: joven, maduro, obsesivo y eterno, ambientada en el Caribe colombiano.",
    'autor_id': 1  // Gabriel García Márquez
  },
  {
    'titulo': "El ingenioso hidalgo don Quijote de la Mancha",
    'cover': "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
    'descripcion': "Las aventuras del caballero Don Quijote y su fiel escudero Sancho Panza. Una sátira de las novelas de caballería que se convirtió en una reflexión profunda sobre la realidad, los sueños y la naturaleza humana.",
    'autor_id': 2  // Miguel de Cervantes
  },
  {
    'titulo': "1984",
    'cover': "https://images.unsplash.com/photo-1495640388908-05fa85288e61?w=300&h=400&fit=crop",
    'descripcion': "Una distopía que presenta un futuro totalitario donde el Gran Hermano vigila cada movimiento de los ciudadanos. Una advertencia sobre el poder absoluto, la manipulación de la información y la pérdida de la libertad individual.",
    'autor_id': 3  // George Orwell
  },
  {
    'titulo': "Rebelión en la granja",
    'cover': "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop",
    'descripcion': "Una fábula política sobre los animales de una granja que se rebelan contra sus dueños humanos, esperando crear una sociedad donde todos los animales sean iguales. Una alegoría sobre la corrupción del poder y los regímenes totalitarios.",
    'autor_id': 3  // George Orwell
  },
  {
    'titulo': "Harry Potter y la piedra filosofal",
    'cover': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
    'descripcion': "Un joven huérfano descubre que es un mago y es admitido en el Colegio Hogwarts de Magia y Hechicería. El inicio de una saga épica sobre la amistad, el valor y la lucha entre el bien y el mal en el mundo mágico.",
    'autor_id': 4  // J.K. Rowling
  },
  {
    'titulo': "It (Eso)",
    'cover': "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&h=400&fit=crop",
    'descripcion': "Una entidad maligna aterroriza el pueblo de Derry cada 27 años. Un grupo de niños debe enfrentarse a sus miedos más profundos para derrotar a esta criatura que adopta diferentes formas, siendo la más conocida la de un payaso llamado Pennywise.",
    'autor_id': 5  // Stephen King
  },
  {
    'titulo': "La casa de los espíritus",
    'cover': "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
    'descripcion': "La saga de la familia del Valle a través de cuatro generaciones, desde principios del siglo XX hasta la época de la dictadura militar. Una novela que mezcla realismo mágico con crítica social y política en América Latina.",
    'autor_id': 6  // Isabel Allende
  }
];
  try {
    const responses = await Promise.all(
      booksDict.map(async (book) => {
        const response = await fetch(`${urlApi}/api/book/${book.autor_id}`, {
          method: 'POST',
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: book.titulo,
            cover: book.cover,
            description: book.descripcion
          })
        });
        
        const data = await response.json();
        return { book: book.titulo, success: response.ok, data };
      })
    );
    
  } catch (error) {
    console.error('Error:', error);
  }
    
};

export const getBooks = async () => {
  
}

