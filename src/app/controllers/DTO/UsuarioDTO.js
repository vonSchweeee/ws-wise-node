class UsuarioDTO {
    constructor(usuario){
        this.id = usuario.id;
        this.id_organizacao = usuario.id_organizacao;
        this.nome = usuario.nome;
        this.url_imagem = usuario.url_imagem;
    }
}
module.exports = UsuarioDTO;