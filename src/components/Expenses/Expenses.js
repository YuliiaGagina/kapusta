import { TransactionForm } from 'components/TransactionForm/TransactionForm';
import { useDispatch } from 'react-redux';
import { addExpenseTransaction } from 'redux/Transactions/TransactionsOperations';

export const Expenses = () => {
  const dispatch = useDispatch();

  const handlePostExpense = formData => {
    dispatch(addExpenseTransaction(formData));
  };
  return (
    <>
      <h4>expenses</h4>
      <TransactionForm onSubmit={handlePostExpense} isExpenseForm />
    </>
  );
};