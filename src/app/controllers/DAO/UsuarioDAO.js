const db = require('../../../config/mysql');
const bcrypt = require('bcrypt');
const Usuario = require('../../models/Usuario');

class UsuarioDAO {
    queries(){
        return {
            findByEmail: 'SELECT * FROM usuario WHERE email = ?',
            findByOrganizacaoId: 'SELECT * FROM usuario WHERE id_organizacao = ?',
            registrar: 'INSERT INTO usuario SET ?;',
        };
    }
    findByEmail(email){
        return new Promise((resolve, reject) => {
            db.query(this.queries()
            .findByEmail, email, (erro, resultado) => {
                if(erro){
                    console.log(erro);
                    return reject(erro);
                }
                else {
                    var string=JSON.stringify(resultado);
                    var json =  JSON.parse(string);
                    var usuario = json[0];

                    return resolve(usuario);
                }
            })
        });
    }

    findByOrganizacaoId(id){
        console.log(this.queries().findByOrganizacaoId);
        console.log(id);
        return new Promise((resolve, reject) => {
            db.query(this.queries()
            .findByOrganizacaoId, id,
            (erro, resultado) => {
                if(erro){
                    console.log(erro);
                    return reject(erro);
                }
                else {
                    if(resultado[0] == null){
                        return reject('Nenhum usuario encontrado para a organização informada.');
                    }
                    return resolve(resultado);
                }
            });
        });
    }
    registrar(usuarioForm){
        return new Promise((resolve, reject) => {
            
            bcrypt.hash(usuarioForm.senha, 10)
            .then(hashSenha => {
                usuarioForm.senha = hashSenha;
                resolve(usuarioForm);
            })
            .catch(erro => reject(erro));
        });
    }

    validaSenha(senha, senhaHash){
        return bcrypt.compare(senha, senhaHash).then((res) => {
            return res;
        })
        .catch(erro => reject(erro));
    }
}
module.exports = UsuarioDAO;