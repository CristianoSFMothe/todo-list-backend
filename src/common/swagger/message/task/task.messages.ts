export const taskMessage = {
  TASK_ID_DESC: 'Identificador único da tarefa (UUID).',
  TASK_ID_EXAMPLE: '3a1d5e24-6f64-45c0-9d8b-df50e2f89ab1',
  TASK_TITLE_REQUIRED: 'O título da tarefa é obrigatório.',
  TASK_TITLE_EXAMPLE: 'Finalizar relatório',
  TASK_TITLE_DESC: 'Título curto e descritivo da tarefa.',
  TASK_DESCRIPTION_DESC: 'Descrição detalhada da tarefa (opcional).',
  TASK_DESCRIPTION_EXAMPLE: 'Finalizar o relatório semanal e enviar ao gestor.',
  TASK_STATUS_DESC: 'Status atual da tarefa. Por padrão, será PENDING.',
  TASK_STATUS_EXAMPLE: 'PENDING',
  TASK_TITLE_ALREADY_EXISTS: 'Título da tarefa já existe.',
  TASK_NOT_FOUND: 'Tarefa não encontrado ou não existe.',
  TASK_STATUS_INVALID:
    'Status inválido. Os valores permitidos são: PENDING, IN_PROGRESS, DONE.',
  TASK_STATUS_INVALID_TRANSITION:
    'Somente tarefas com status PENDENTE podem ser atualizadas para CONCLUÍDA.',
  TASK_DELETE_INVALID_TRANSITION:
    'Não é permitido excluir tarefas com status CONCLUÍDA (DONE).',
  TASK_DELETE_SUCCESS: 'Tarefa excluída com sucesso.',
};
