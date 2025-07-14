export enum TransactionType {
  DEPOSIT = 'DEPOSIT', // Crédito (entrada)
  DEBIT = 'DEBIT', // Débito (saída)
}

export enum TransactionCategory {
  DEPOSIT = 'DEPOSIT', // Depósito
  WITHDRAW = 'WITHDRAW', // Saque
  TRANSFER = 'TRANSFER', // Transferência
  PAYMENT = 'PAYMENT', // Pagamento
  FEE = 'FEE', // Taxa
  INTEREST = 'INTEREST', // Juros
  REFUND = 'REFUND', // Estorno
  OTHER = 'OTHER', // Outros
}
