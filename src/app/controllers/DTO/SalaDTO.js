class SalaDTO{
    constructor(sala){
        this.id = sala.id;
        this.id_organizacao = sala.id_organizacao;
        this.nome = sala.nome;
        this.lugares_disponiveis = sala.lugares_disponiveis;
        this.possui_ac = sala.possui_ac;
        this.url_imagem = sala.url_imagem;
    }
}
module.expots = SalaDTO;