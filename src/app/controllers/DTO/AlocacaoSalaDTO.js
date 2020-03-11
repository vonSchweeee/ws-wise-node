class AlocacaoSalaDTO{
    constructor(alocacao){
        this.id = alocacao.id;
        this.id_sala = alocacao.id_sala;
        this.id_usuario = alocacao.id_usuario;
        this.descricao = alocacao.descricao;
        this.data_hora_inicio = alocacao.data_hora_inicio;
        this.data_hora_fim = alocacao.data_hora_fim;
    }
    set data_hora_inicio(data_hora_inicio) {
        this.data_hora_inicio = data_hora_inicio;
    }
    set data_hora_fim(data_hora_fim) {
        this.data_hora_fim = data_hora_fim;
    }
}
module.exports = AlocacaoSalaDTO;