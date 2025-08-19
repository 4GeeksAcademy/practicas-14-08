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
    }

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
      body: JSON.stringify({email, password}),
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

