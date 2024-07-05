# Código Fonte

Estruturação do CashCraft:

```plaintext
codigo/  (essa pasta aqui)
│
├── server.js (script que habilita o DB e rotea as páginas usando express e json-server)
│
├── public/
│   ├── assets/
│   │   ├── css/ (arquivos de estilização)
│   |   ├── js/ (scripts relacionados a cada página)
│   |   ├── images/ (imagens utilizadas nas páginas)
│   |   └── data/
│   |        └── db.json (banco de dados do projeto)
│   ├── services/ (componentes de serviço)
|   |    ├── api.js (script que faz o controle de requisições no db.json)
|   |    └── cookies.js (script que manipula os cookies do site)
|   ├── views/ (páginas do projeto)
|   └── index.html (homepage do projeto)
│
├── package.json (dependências do projeto)
└── README.md
```

Estrutura de Dados do CashCraft:

```json
{
    "clientes": [
        {
            "username": "alvino",
            "nome": "Alvim",
            "email": "alvim@teste.bet",
            "senha": "Bernardo123!",
            "salario": 700.5,
            "id": 1
        }
    ],
    "lancamentos": [
        {
            "clienteId": 4,
            "descricao": "Conta de luz",
            "categoriaId": 1,
            "metodoId": 2,
            "valor": 170.00,
            "data": "06-06-2024",
            "id": 1
        }
    ],
    "categorias": [
        {
            "id": 1,
            "tipo": "Despesas"
        },
        {
            "id": 2,
            "tipo": "Entretenimento"
        },
        {
            "id": 3,
            "tipo": "Vestuario"
        },
        {
            "id": 4,
            "tipo": "Alimentação"
        },
        {
            "id": 5,
            "tipo": "Fixos"
        },
        {
            "id": 6,
            "tipo": "Outros"
        }
    ],
    "metodos": [
        {
            "id": 1,
            "tipo": "Dinheiro"
        },
        {
            "id": 2,
            "tipo": "Débito"
        },
        {
            "id": 3,
            "tipo": "Crédito"
        },
        {
            "id": 4,
            "tipo": "Pix"
        }
    ]
}
```
