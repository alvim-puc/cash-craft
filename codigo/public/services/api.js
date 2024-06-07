class Api {
  constructor() {
    this.base = "http://localhost:3080/api/clientes";
  }

  /** CRUD Cliente */

  async createClient(body) {
    try {
      const response = await fetch(this.base, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.statusText;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async readClient(id) {
    try {
      const response = await fetch(`${this.base}/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async updateClient(id, body) {
    try {
      const response = await fetch(`${this.base}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.status;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async deleteClient(id) {
    try {
      const response = await fetch(`${this.base}/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.status;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }

  async getAllClients() {
    try {
      const response = await fetch(this.base, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        }
      });

      if(!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}

export default Api;
