import Api from "../../services/api.js"
const api = new Api();

import { Cookie } from "../../services/cookie.js"
const cookies = new Cookie();

/** Exibir infos do cliente */
document.addEventListener('DOMContentLoaded', async () => {
    try {
        const cliente = await api.readClient(cookies.getCookie('username'))
        document.getElementById('name').value = cliente.nome
        document.getElementById('email').value = cliente.email
        document.getElementById('salary').value = cliente.salario.toFixed(2) + '$'
        document.getElementById('user-name').textContent = cliente.username
    } catch (error) {
        console.error('Erro ao carregar as informações do cliente:', error)
    }
})
