const express= require('express');
const router = express.Router();
// const { Model } = require('sequelize');

const categoria =require('../model/categoria');

router.get('/get',(req,res)=>{
res.send('<H1> Ola </H1>');
});
// select * from 
router.get('/listarCarros', (req, res)=>{
    categoria.findAll()
            .then(
                (categoria)=>{
                    return res.status(200).json(categoria);
                }
            ).catch((erro)=>{
                return res.status(400).json({
                    erroStatus: true,
                    erroMensagem: erro
                });
            });
    }
);
// select where id 
router.get('/buscarCarro/:id', (req, res)=>{
    let {id} = req.params;
    categoria.findByPk(id)
        .then(
                (categoria)=>{
                res.status(200).json(categoria);
                }
        ).catch(
                (erro)=>{
                         return res.status(400).json({
                         erroStatus: true,
                         erroMensagem: 'Erro ao buscar carro',
                        erroBancoDeDados: erro
                         });
        }
    );
});
// insert
router.post('/cadastrarCarro',(req,res)=>{
    const carro = {cod_carro, cor, ano, marca, placa, modelo} = req.body;
    categoria.create(
     {
         cod_carro,
         cor,
         ano,
         marca,
         placa,
         modelo
     } 
         ).then(
            ()=>{
                    return res.status(200).json({
                    erroStatus: false,
                    mensagemStatus: 'Carro Inserido com sucesso!'  
                 });
                }   
    ).catch(
            (erro)=>{
                     return res.status(400).json({
                     erroStatus: true,
                     mensagemStatus: 'Erro ao gravar dados!',
                     erroBancoDeDados: erro   
                    });
            }        
    );       
});
//editar
router.put('/alterarDados', (req, res)=>{



    //RECEBENDO OS DADOS:
    let {id,cod_carro,cor,ano,placa,marca,modelo} = req.body;;
    console.log(req.body);
    //ALTERANDO OS DADOS:
    categoria.update(
        {cod_carro,cor,ano,placa,marca,modelo},
	 		
        {where:{id}}
    ).then( ()=>{

        return res.status(200).json({
            erroStatus: false,
            menssagemStatus: 'Dados alterados com sucesso!'
        });

    }).catch(
        (erro)=>{
                    return res.status(400).json({
                        erroStatus: true,
                        erroMessagem: 'Houve um erro ao alterar os dados',
                        erroBancoDados: erro
                    });
        }
    );

});
// delete
router.delete('/excluirDados/:id', (req,res)=>{
let{id} = req.params;
    categoria.destroy(
         {where:{id}}
     ).then(
             ()=>{
                    return res.status(200).json({
                    erroStatus: false,
                    menssagemStatus: 'Dados excluido com sucesso!'
                    });   
            }
     ).catch(
             (erro)=>{
                    return res.status(400).json({
                    erroStatus: true,
                    menssagemStatus: 'Erro ao excluir dados!'
             });   
        }     
     );
});  
module.exports = router;