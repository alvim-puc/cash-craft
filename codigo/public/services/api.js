const superagent = require('superagent');

class api {
    constructor() {
    this.base = "http://localhost:3080/api/clientes";
  }

  /** CRUD Cliente */

  async createClient(body) {
      try {
        const response = await superagent
          .post(this.base)
          .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
          .send(body);
        return response.statusCode;
      } catch (err) {
        console.error(err);
        throw err;
      }
  }

  async readClient(id) {
      try {
        const response = await superagent
          .get(this.base + `/${id}`)
          .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        return response.body;
      } catch (err) {
        console.error(err);
        throw err;
      }
  }

  async updateClient(id, body) {
      try {
        const response = await superagent
          .put(this.base + `/${id}`)
          .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
          .send(body);
        return response.statusCode;
      } catch (err) {
        console.error(err);
        throw err;
      }
  }

  async deleteClient(id) {
      try {
        const response = await superagent
          .delete(this.base + `/${id}`)
          .set({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          })
        return response.statusCode;
      } catch (err) {
        console.error(err);
        throw err;
      }
  }


  /** CRUD Fixos */

  /** CRUD Transações */
}

export default api;