import { createSlice, isAnyOf } from '@reduxjs/toolkit';

import {
  balance,
  deleteTransacton,
  getTransactionExpense,
  getTransactionIncome,
  addIncomeTransaction,
  addExpenseTransaction,
  getPeriodData,
} from './TransactionsOperations';

const initialState = {
  items: [],
  newBalance: 0,
  reportsQuery: '',
  transactionData: {},
  expenses: [],
  income: [],
  currentReport: 'Expenses',
  error: null,
  isLoading: false,
  monthsStats: {}
};

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    changeReportType(state) {
      state.currentReport =
        state.currentReport === 'Expenses' ? 'Income' : 'Expenses';
    },
    setReportsQuery(state, action) {
      state.reportsQuery = action.payload;
    },
    deleteTransactionItem(state, action) {
      state.items = state.items.filter(item => item._id !== action.payload);
    },
  },

  extraReducers: builder =>
    builder
      .addCase(balance.fulfilled, (state, { payload }) => {
        state.newBalance = payload.newBalance;
      })
      .addCase(getPeriodData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getPeriodData.fulfilled, (state, action) => {
        state.transactionData = action.payload;
        state.isLoading = false;
      })
      .addCase(getPeriodData.rejected, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      })
      .addCase(addIncomeTransaction.fulfilled, (state, { payload }) => {
        state.items = [payload.transaction, ...state.items];

        state.isLoading = false;
      })
      .addCase(addExpenseTransaction.fulfilled, (state, { payload }) => {
        state.items = [payload.transaction, ...state.items];
        state.isLoading = false;
      })
      .addCase(getTransactionIncome.fulfilled, (state, { payload }) => {
        state.items = [...payload.incomes].reverse();
        state.monthsStats = payload.monthsStats;
        state.isLoading = false;
      })
      .addCase(getTransactionExpense.fulfilled, (state, { payload }) => {
        console.log('payload.expenses', payload.expenses);
        state.items = [...payload.expenses].reverse();
        state.monthsStats = payload.monthsStats;
        state.isLoading = false;
      })
      .addCase(deleteTransacton.fulfilled, (state, { payload }) => {
        state.newBalance = payload.newBalance;
        state.isLoading = false;
      })
      .addMatcher(
        isAnyOf(
          getTransactionIncome.rejected,
          getTransactionExpense.rejected,
          deleteTransacton.rejected,
          addIncomeTransaction.rejected,
          addExpenseTransaction.rejected
        ),
        (state, { payload }) => {
          state.isLoading = false;
          state.error = payload;
        }
      )
      .addMatcher(
        isAnyOf(
          getTransactionIncome.pending,
          getTransactionExpense.pending,
          deleteTransacton.pending,
          addIncomeTransaction.pending,
          addExpenseTransaction.pending
        ),
        state => {
          state.isLoading = true;
        }
      ),
});

export const { deleteTransactionItem, changeReportType, setReportsQuery } =
  transactionsSlice.actions;
export const transactionsReducer = transactionsSlice.reducer;

// const iconObj = {
//   products: icon,
//   alcohol: icon,
// }
// iconObj['products']
