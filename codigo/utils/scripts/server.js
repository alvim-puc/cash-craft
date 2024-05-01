const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bcrypt = require('bcrypt');
require('dotenv').config();

const Port = process.env.PORT || 3000

server.use(middlewares);
server.use(jsonServer.bodyParser);

server.post('/cadastro', (req, res) => {
    const novoCliente = req.body;

    const senhaCriptografada = bcrypt.hashSync(novoCliente.senha, process.env.bcryptSecret);
    novoCliente.senha = senhaCriptografada;

    const clientes = router.db.get('clientes').value();

    const novoId = clientes.length > 0 ? clientes[clientes.length - 1].id + 1 : 1;
    novoCliente.id = novoId;

    router.db.get('clientes').push(novoCliente).write();
    res.status(201).json(novoCliente.id);
});

server.post('/login', (req, res) => {
    const { username, password } = req.body;

    const cliente = router.db.get('clientes').find({ nome: username }).value();
    if (!cliente) {
      res.status(401).json({ message: 'Usuário não encontrado' });
    } else {
      const senhaValida = bcrypt.compareSync(password, cliente.senha);
      if (senhaValida) {
        res.json({ message: 'Login bem-sucedido', username });
      } else {
        res.status(401).json({ message: 'Credenciais inválidas' });
      }
    }
});
  

server.use(router);

server.listen(Port, () => {
  console.log(`JSON Server is running on port ${Port}`);
});
