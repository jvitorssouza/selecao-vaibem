export interface ISefazServiceResponse {
    atividade_principal: Atividade[];
    data_situacao: string;
    tipo: string;
    nome: string;
    telefone: string;
    email: string;
    atividades_secundarias: Atividade[];
    situacao: string;
    bairro: string;
    logradouro: string;
    numero: string;
    cep: string;
    municipio: string;
    fantasia: string;
    porte: string;
    abertura: string;
    natureza_juridica: string;
    uf: string;
    cnpj: string;
    ultima_atualizacao: string;
    status: string;
    complemento: string;
    efr: string;
    motivo_situacao: string;
    situacao_especial: string;
    data_situacao_especial: string;
    capital_social: string;
    qsa: any[];
    extra: Extra;
    billing: Billing;
}

export interface Atividade {
    text: string;
    code: string;
}

export interface Billing {
    free: boolean;
    database: boolean;
}

export interface Extra {}
