const prefixError = 'Ops!';

export const MessagesValidations = {
  INTERNAL_ERROR: `${prefixError} Algo deu errado`,
  UNAUTHORIZED: `${prefixError} Você não está autenticado`,
  CONFLICT: `${prefixError} Há dados em conflito`,
  BAD_REQUEST: `${prefixError} Requisição mal formatada`,
  FORBIDDEN: `${prefixError} Você não tem permissão para acessar este recurso`,
  NOT_FOUND: `${prefixError} Recurso não encontrado`,

  IsUuid: (field: string) =>
    `${prefixError} O campo ${field} deve um UUID válido`,

  isNotBlank: (param: string) => `O campo ${param} não pode estar vazio`,

  minLength: (param: string) =>
    `${param} precisa ter no mínimo $constraint1 caracteres`,

  maxLength: (param: string) =>
    `${param} só pode ter no máximo $constraint1 caracteres`,

  isNumber: (param: string) => `O campo ${param} precisa ser um valor numérico`,

  isDate: (param: string) => `O campo ${param} precisa ser uma data`,

  isString: (param: string) => `O campo ${param} precisa ser um texto`,

  isEmail: (param: string) => `O campo ${param} precisa ser um email válido`,
};
