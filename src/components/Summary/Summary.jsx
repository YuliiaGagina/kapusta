import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
// import { getTransactionIncome, getTransactionExpense } from 'redux/Transactions/TransactionsOperations';
import { selectMonthsStats } from 'redux/Transactions/selectors'; // , getIsloading
import css from './Summary.module.css';

export const Summary = () => {
  // const summaryMonth = 6; // Кількість місяців яку необхідно рендерити

  const stateMonts = useSelector(selectMonthsStats);

  const [listMonths, setlistMonths] = useState([]); // масив результатів

  useEffect(() => {
    const listKeyMonths = [
      'Декабрь',
      'Ноябрь',
      'Октябрь',
      'Сентябрь',
      'Август',
      'Июль',
      'Июнь',
      'Май',
      'Апрель',
      'Март',
      'Февраль',
      'Январь',
    ];
    const listMonthsEng = {
      Январь: 'January',
      Февраль: 'February',
      Март: 'March',
      Апрель: 'April',
      Май: 'May',
      Июнь: 'June',
      Июль: 'July',
      Август: 'August',
      Сентябрь: 'September',
      Октябрь: 'October',
      Ноябрь: 'November',
      Декабрь: 'December',
    };

    const result = listKeyMonths
      .map(e => {
        return { month: listMonthsEng[e], value: stateMonts[e] };
      })
      .filter(e => e.value !== 'N/A');

    setlistMonths(result);
  }, [stateMonts]);

  return (
    <div className={css.summaryContainer}>
      <h3 className={css.summaryTitle}>SUMMARY</h3>
      <ul className={css.summaryList}>
        {listMonths.map(({ month, value }, edx) => (
          <li key={edx} className={css.summaryItem}>
            <p className={css.summaryDescription}>{month}</p>
            <p className={css.summaryDescription}> {value} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Summary;

// import { Summary } from 'components/Summary/Summary';
// <Summary />
