
// console.log('handleRequest e >>', e);
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux'; //, useSelector
import { getTransactionIncome, getTransactionExpense } from 'redux/Transactions/TransactionsOperations';

// import data from './month.json';
import css from './Summary.module.css';

export const Summary = () => {
  const summaryMonth = 6; // Кількість місяців яку необхідно рендерити
  const [listMonths, setlistMonths] = useState([]); // масив запитів
  console.log('listMonths >>', listMonths);

  const dispatch = useDispatch();
  

  // 1) Створює [рік-місяць, рік-місяць, ...] за останні 6 міс. Використовується для запиту данних по місяцях і для формування списку міс. на сторінці.
  // Потім ереробити на useMemo 
  useEffect(() => {  
    const indexMonths = { 0: '01', 1: '02', 2: '03', 3: '04', 4: '05', 5: '06', 6: '07', 7: '08', 8: '09', 9: '10', 10: '11', 11: '12' };
    let yearMonthList = [];

    for(let i = 0; i < summaryMonth; i += 1) {
      const calcMonth = new Date().setMonth( new Date().getMonth() - i ); // потона дата мінус "і" місяців
      const year = new Date(calcMonth).getFullYear(); // Виймаю рік
      const month = new Date(calcMonth).getMonth(); // Виймаю місяць
      const yearMonth = `${year}-${indexMonths[month]}`; // Формую запит
      yearMonthList = [...yearMonthList, yearMonth] // Формую масив запитів
    }
    setlistMonths(yearMonthList)
  }, [summaryMonth]);

  // 2) Запит за балансом за останні 6 міс.
  // переробити на useEffect і запусскати при 1му рендер і при оновленні баласу
  const handleRequest = ()=>{

      dispatch( getTransactionExpense() );
      dispatch( getTransactionIncome() );
      
  };

  // 3) Зберігати вдповідь в стор в масив об'єктів запит(дата):відповідь(данні по суммі)
  // 4) Побудувати розмітку по данних
  // Мептути listMonths і на кожному кроці пітянути назву місяця і данні


  const arrMonthBalances = [
    {month: 1, value: 1111},
    {month: 2, value: 2222},
    {month: 4, value: 3333},
    {month: 4, value: 4444},
    {month: 5, value: 5555},
  ];

  return (
    <div className={css.summaryContainer}>
      <h3 className={css.summaryTitle}>SUMMARY</h3>
      <ul className={css.summaryList}>

        {arrMonthBalances.map(({ month, value }) => (

          <li key={month} className={css.summaryItem}>
            <p className={css.summaryDescription}>
            March
            {/* {data.find(monthData => monthData.id === month).name} */}
            </p>
            <p className={css.summaryDescription}> {value} </p>
          </li>
        ))}
        
        <button 
          type="button" 
          onClick={() => handleRequest()}>request</button>
      </ul>
    </div>
  );
};

export default Summary;


// import { Summary } from 'components/Summary/Summary';
// <Summary />