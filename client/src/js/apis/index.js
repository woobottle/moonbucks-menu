const BASE_URL = "http://localhost:3000/api";

const MenuApi = {
  async getCategoryMenu (currentCategory) {
    const response = await fetch(`${BASE_URL}/category/${currentCategory}/menu`).then(
      (response) => response.json()
    );
    return response;
  },
  async addNewMenu (currentCategory, name) {
    await fetch(`${BASE_URL}/category/${currentCategory}/menu`, HTTP_METHOD.POST({ name }))
      .then((response) => {
        if (!response.ok) {
          return Promise.reject(response);
        }

        return response.json();
      })
      .then((data) => data)
      .catch((error) => {
        error.json().then((resp) => alert(resp.message));
      });
  },
  async toggleMenu (currentCategory, menuId) {
    await fetch(`${BASE_URL}/category/${currentCategory}/menu/${menuId}/soldout`, HTTP_METHOD.PUT());
  },
  async editMenu (currentCategory, name, menuId) {
    await fetch(`${BASE_URL}/category/${currentCategory}/menu/${menuId}`, HTTP_METHOD.PUT({ name }));
  },
  async removeMenu (currentCategory, menuId) {
    await fetch(`${BASE_URL}/category/${currentCategory}/menu/${menuId}`, HTTP_METHOD.DELETE());
  }
};

const HTTP_METHOD = {
  POST(body) {
    return {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };
  },
  PUT(body) {
    return {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: body ? JSON.stringify(body) : "",
    };
  },
  DELETE() {
    return {
      method: "DELETE",
    };
  },
};

export default MenuApi;