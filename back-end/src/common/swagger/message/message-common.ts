export const messageCommon = {
  ERROR_DATA: 'Erro de validação dos dados fornecidos.',
  INVALID_ID: 'ID inválido fornecido.',

  // NotFound
  NOT_FOUND_STATUS_DESC:
    'Código HTTP indicando que o recurso solicitado não foi encontrado.',
  NOT_FOUND_MESSAGE: 'Recurso não encontrado ou não existe.',
  NOT_FOUND_MESSAGE_DESC:
    'Mensagem informando que o recurso solicitado não foi localizado.',
  NOT_FOUND_ERROR: 'Not Found',

  // Invalid ID
  INVALID_ID_STATUS_DESC:
    'Código HTTP indicando que a requisição foi inválida.',
  INVALID_ID_MESSAGE: 'ID inválido. O formato do ID não é ObjectId válido.',
  INVALID_ID_MESSAGE_DESC: 'Mensagem explicando o motivo do erro.',
  BAD_REQUEST_ERROR: 'Bad Request',

  // Bad Request
  BAD_REQUEST_STATUS_DESC:
    'Código de status HTTP para erros de requisição malformada.',
  BAD_REQUEST_MESSAGE: 'Requisição inválida. Verifique os dados enviados.',
  BAD_REQUEST_MESSAGE_DESC:
    'Mensagem indicando que os dados fornecidos são inválidos ou malformados.',

  // Conflict
  CONFLICT_STATUS_DESC:
    'Código de status HTTP indicando conflito com o estado atual do recurso.',
  CONFLICT_MESSAGE:
    'Conflito ao processar a requisição. O recurso já existe ou está em uso.',
  CONFLICT_MESSAGE_DESC:
    'Mensagem informando que ocorreu um conflito, geralmente por duplicidade de dados.',
  CONFLICT_ERROR: 'Conflict',

  // Comum
  ERROR_TYPE_DESC: 'Descrição curta do tipo de erro HTTP.',
  ID_DESC: 'ID único do recurso (UUID)',
  ID_EXAMPLE_USER: '2f8bb5ce-f379-48da-ace6-f52be34c2808',
  ID_EXAMPLE_TASK: '3a1d5e24-6f64-45c0-9d8b-df50e2f89ab1',

  // Unauthorized
  UNAUTHORIZED_STATUS_DESC: 'Código de status HTTP para acesso não autorizado.',
  UNAUTHORIZED_MESSAGE: 'Unauthorized',
};
