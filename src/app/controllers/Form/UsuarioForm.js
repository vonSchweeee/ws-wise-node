class UsuarioForm {
    constructor(reqBody){
        this.id_organizacao = reqBody.id_organizacao;
        this.nome = reqBody.nome;
        this.email = reqBody.email;
        this.senha = reqBody.senha;
    }
    setSenha(senha){
        this.senha = senha;
    }
}
module.exports = UsuarioForm;