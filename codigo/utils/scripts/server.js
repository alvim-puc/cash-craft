const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
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

server.post('/enviar_email', (req, res) => {
    const { email, mensagem } = req.body;
    
    const transporter = nodemailer.createTransport({
	    host: process.env.SMTP_SERVER, //Endereço do servidor SMTP que permite envio sem autenticação
	    port: process.env.SMTP_PORT, //Porta do servidor SMTP
	    secure: false //Se o uso de SSL/TLS é necessário
    });

    const mailOptions = {
        from: email,
        to: `${process.env.COD_PPL}@sga.pucminas.br`,
        subject: 'Novo feedback do site',
        text: `Mensagem: ${mensagem}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).send('Ocorreu um erro ao enviar o e-mail.');
        } else {
            console.log('E-mail enviado:', info.response);
            res.status(200).send('E-mail enviado com sucesso!');
        }
    });
});  

server.use(router);

server.listen(Port, () => {
  console.log(`JSON Server is running on port ${Port}`);
});
