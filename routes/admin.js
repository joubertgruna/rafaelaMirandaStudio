var express = require('express');
var router = express.Router();
const db = require('../db/conn')

/* GET users listing. */

router.get('/', function (req, res, next) {
  res.render('./dashBoard/index', { title: 'Express' });
});
router.get('/create-cliente', function (req, res, next) {
  res.render('./dashBoard/createCliente', { title: 'Cliente' });
});
router.post('/create-cliente', (req, res, next) => {
  const nome = req.body.nome
  const email = req.body.email
  const senha = req.body.senha
  const telefone = req.body.telefone

  const validate = { nome, email, senha, telefone }
  // Insere os dados do cliente no banco de dados
  db('Cliente').insert({
    nome: nome,
    email: email,
    senha: senha,
    telefone: telefone,


  })
    .then((cliente) => {
      console.log('RTN INSERIDO >> ', cliente)
      res.redirect('/admin/listar-cliente'); // Move a chamada para dentro deste callback
    })
    .catch((error) => {
      console.error('Erro ao inserir o cliente:', error);
      res.status(500).send(`Erro ao inserir o cliente: ${error.message}`);
    });

  console.log("RTN >> ", validate)
})
// Rota para listar clientes
router.get('/listar-cliente', async (req, res, next) => {
  try {
    // Busca todos os clientes do banco de dados
    const clientes = await db('Cliente').select('*');

    // Renderiza a view 'listarCliente' passando os dados dos clientes
    res.render('./dashBoard/listarCliente', { title: 'Clientes', clientes: clientes });
  } catch (error) {
    console.error("Erro ao listar clientes:", error);
    res.status(500).send('Erro ao listar clientes');
  }
});
// Rota para editar cliente
router.get('/editar-cliente/:id', async (req, res, next) => {
  const clienteId = req.params.id; // Obtém o id da URL

  try {
    // Busca o cliente pelo ID
    const cliente = await db('Cliente').where({ id: clienteId }).first();
    
    if (!cliente) {
      return res.status(404).send('Cliente não encontrado');
    }

    // Renderiza a view 'editarCliente' passando os dados do cliente
    res.render('./dashBoard/editarCliente', { title: 'Editar Cliente', cliente: cliente });
  } catch (error) {
    console.error("Erro ao buscar cliente:", error);
    res.status(500).send('Erro ao buscar cliente');
  }
});
// Rota para atualizar o cliente
router.post('/atualizar-cliente/:id', async (req, res, next) => {
  const clienteId = req.params.id; // Obtém o id do cliente a partir da URL
  const { nome, email, telefone } = req.body; // Obtém os novos dados enviados pelo formulário

  try {
    // Atualiza o cliente no banco de dados
    await db('Cliente')
      .where({ id: clienteId })
      .update({
        nome: nome,
        email: email,
        telefone: telefone
        // Adicione aqui mais campos, conforme necessário
      });

    // Redireciona para a página de listagem de clientes ou outra página após a atualização
    res.redirect(`/admin/editar-cliente/${clienteId}`);
  } catch (error) {
    console.error("Erro ao atualizar cliente:", error);
    res.status(500).send('Erro ao atualizar cliente');
  }
});
// Rota para deletar o cliente
router.post('/deletar-cliente', async (req, res, next) => {
  const clienteId = req.body.id; // Obtém o id do cliente da URL

  try {
    // Deleta o cliente do banco de dados
    await db('Cliente')
      .where({ id: clienteId })
      .del();

    // Redireciona para a listagem de clientes após a exclusão
    res.redirect('/admin/listar-cliente');
  } catch (error) {
    console.error("Erro ao deletar cliente:", error);
    res.status(500).send('Erro ao deletar cliente');
  }
});

// Rota para exibir o formulário de criação de serviço
router.get('/create-servico', (req, res, next) => {
  res.render('./dashBoard/createServico', { title: 'Criar Serviço' });
});
// Rota para criar um novo serviço
router.post('/create-servico', async (req, res, next) => {
  const { nome, descricao, preco, duracao } = req.body;

  try {
    // Insere um novo serviço no banco de dados
    await db('Servico').insert({
      nome: nome,
      descricao: descricao,
      preco: preco,
      duracao: duracao,
      data_criacao: db.fn.now() // Define a data de criação como a data atual
    });

    // Redireciona para a página de listagem de serviços após a criação
    res.redirect('/admin/listar-servicos');
  } catch (error) {
    console.error("Erro ao criar serviço:", error);
    res.status(500).send('Erro ao criar serviço');
  }
});
// Rota para listar todos os serviços
router.get('/listar-servicos', async (req, res, next) => {
  try {
    // Busca todos os serviços no banco de dados
    const servicos = await db('Servico').select('*');

    // Renderiza a view de listagem de serviços passando os dados
    res.render('./dashBoard/listServicos', { title: 'Serviços', servicos });
  } catch (error) {
    console.error("Erro ao listar serviços:", error);
    res.status(500).send('Erro ao listar serviços');
  }
});
// Rota para editar serviço
router.get('/editar-servico/:id', async (req, res, next) => {
  const servicoId = req.params.id;

  try {
    // Busca o serviço pelo ID
    const servico = await db('Servico').where({ id: servicoId }).first();

    if (!servico) {
      return res.status(404).send('Serviço não encontrado');
    }

    // Renderiza a view de edição passando os dados do serviço
    res.render('./dashBoard/editarServico', { title: 'Editar Serviço', servico });
  } catch (error) {
    console.error("Erro ao buscar serviço:", error);
    res.status(500).send('Erro ao buscar serviço');
  }
});
// Rota para atualizar serviço
router.post('/editar-servico/:id', async (req, res, next) => {
  const servicoId = req.params.id;
  const { nome, descricao, preco, duracao } = req.body;

  try {
    // Atualiza os dados do serviço no banco
    await db('Servico')
      .where({ id: servicoId })
      .update({
        nome: nome,
        descricao: descricao,
        preco: preco,
        duracao: duracao,
        data_criacao: db.fn.now() // Atualiza a data de criação, se necessário
      });

    // Redireciona para a página de listagem de serviços após a atualização
    res.redirect('/admin/listar-servicos');
  } catch (error) {
    console.error("Erro ao atualizar serviço:", error);
    res.status(500).send('Erro ao atualizar serviço');
  }
});







module.exports = router;
