const express = require("express");

const app = express();
const axios = require("axios").default;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//MAPEAMENTO DA PASTA PUBLIC
app.use(express.static("public"));

//CONFIGURA O EJS COMO VIEW ENGINE (REDENRIZA AS PÁGINAS DE FRONT-END)
app.set("view engine", "ejs");

//ROTA DE CADASTRO DE CATEGORIAS
app.get("/cadastrarCarro", (req, res) => {
	res.render("marca/cadastrarCarro");
});


app.get("/listarCarros", (req, res) => {
	const urlListarCarro = "http://localhost:3000/listarCarros";

	
	axios.get(urlListarCarro).then((response) => {
		
		let carros = response.data;
		res.render("marca/listarCarros", { carros });
	});
});

//ROTA DE LISTAGEM DE EDIÇÃO
app.get("/formEditarCarro/:id", (req, res) => {
	//RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
	let { id } = req.params; // mesmo nome do model
	// console.log(id);

	//CHAMADA DO AXIOS PARA A API:
	const urlListarCarro = `http://localhost:3000/buscarCarro/${id}`;

	axios.get(urlListarCarro).then((response) => {
		let carros = response.data;
		res.render("marca/editarMarca", { carros});
	});
});

//ROTA DE EDIÇÃO
app.post("/alterarDados", (req, res) => {
	console.log(req.body);

	const urlAlterarDados = "http://localhost:3000/alterarDados";

	axios.put(urlAlterarDados, req.body)
		.then((response) => {
            axios.get("http://localhost:3000/listarCarros").then((response) => {
                let carros = response.data;
                console.log("RESPONSE: " + response.data);
                res.render("marca/listarCarros", { carros });
            });
        });
    });
  


app.post("/cadastrarCarroo", (req, res) => {
	const urlcadastrarcarro = "http://localhost:3000/cadastrarCarro";
	console.log(req.body);

	axios
		.post(urlcadastrarcarro, req.body)
		.then((response) => {
            axios.get("http://localhost:3000/listarCarros").then((response) => {
                let carros = response.data;
                console.log("RESPONSE: " + response.data);
                res.render("marca/listarCarros", { carros });
            });
        });
    });

app.get("/delete/:id", (req, res) => {
	//RECEBE O ID DE CATEGORIA QUE VAI SER EDITADO
	let { id } = req.params;// mesmo nome model
	// console.log(id);

	//CHAMADA DO AXIOS PARA A API:
	const urlDeleteCarro = `http://localhost:3000/excluirDados/${id}`;

	axios.delete(urlDeleteCarro).then((response) => {
		axios.get("http://localhost:3000/listarCarros").then((response) => {
			let carros = response.data;
			console.log("RESPONSE: " + response.data);
			res.render("marca/listarCarros", { carros });
		});
	});
});

app.listen(3001, () => {
	console.log("SERVIDOR RODANDO EM: http://localhost:3001");
});
