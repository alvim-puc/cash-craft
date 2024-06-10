import Api from "../../services/api.js"
const api = new Api()

import { Cookie } from "../../services/cookie.js"
const cookies = new Cookie()

document.addEventListener('DOMContentLoaded', async () => {
    const cliente = await api.readClient(cookies.getCookie('username'))
    carregaCLiente(cliente)

    const editBtn = document.getElementById('edit-btn')
    const form = document.getElementById('client-form')
    let saveBtn;

    editBtn.addEventListener('click', (event) => {
        event.preventDefault()

        // Ativar os campos do formulário
        form.elements['name'].disabled = false
        form.elements['email'].disabled = false
        form.elements['salary'].disabled = false
        form.elements['password'].disabled = false
        form.elements['password'].required = true
        form.elements['password'].value = ''

        // Desabilitar o botão de edição
        editBtn.disabled = true;

        if (!saveBtn) {
            carregaCLiente(cliente);
            saveBtn = document.createElement('button')
            saveBtn.type = 'submit'
            saveBtn.className = 'btn btn-save'
            saveBtn.textContent = 'Salvar'

            form.appendChild(saveBtn)

            form.addEventListener('submit', async () => {
                const formData = new FormData(form)

                const body = {
                    nome: formData.get('name') || cliente.nome,
                    email: formData.get('email') || cliente.email,
                    salario: parseFloat(formData.get('salary').replace('$', '')) || cliente.salario
                };

                if(cliente.senha !== formData.get('password'))
                    return alert('Senha incorreta')

                try {
                    const status = await api.updateClient(body, cliente.id)
                    console.log('Cliente atualizado com sucesso ', status)

                    if (status === 200 || status === 201) {
                        alert('Cliente atualizado com sucesso')
                    } else {
                        return alert('Erro ao atualizar o cliente')
                    }

                    // Desabilitar os campos do formulário após a edição
                    form.elements['name'].disabled = true
                    form.elements['email'].disabled = true
                    form.elements['salary'].disabled = true
                    form.elements['password'].disabled = true

                    // Ativar o botão de edição novamente
                    editBtn.disabled = false

                    // Remover o botão "Salvar"
                    form.removeChild(saveBtn)
                    saveBtn = null
                } catch (error) {
                    console.error('Erro ao atualizar o cliente:', error)
                }
            })
        }
    })
})

const carregaCLiente = (cliente) => {
    try {
        document.getElementById('name').value = cliente.nome
        document.getElementById('email').value = cliente.email
        document.getElementById('salary').value = cliente.salario.toFixed(2)
        document.getElementById('user-name').textContent = cliente.username
    
    } catch (error) {
        console.error('Erro ao carregar as informações do cliente:', error)
    }
}