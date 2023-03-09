export const selectBalance = state => state.transactions.newBalance;

export const selectCurrentReport = state => state.transactions.currentReport;
export const selectTransactionDataIncomes = state =>
  state.transactions.transactionData?.incomes;
export const selectTransactionDataExpenses = state =>
  state.transactions.transactionData?.expenses;
export const selectTransactionDataExpensesData = state =>
  state.transactions.transactionData.expenses?.expensesData;
export const selectTransactionDataIncomesData = state =>
  state.transactions.transactionData.incomes?.incomesData;

export const getIsloading = state => state.transactions.isLoading;

export const selectTransactions = state => state.transactions.items;

export const selectMonthsStats = state => state.transactions.monthsStats;
