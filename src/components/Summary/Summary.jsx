import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux'; // useDispatch,
// import { getTransactionIncome, getTransactionExpense } from 'redux/Transactions/TransactionsOperations';
import { selectMonthsStats } from 'redux/Transactions/selectors'; // , getIsloading
import { Container, Title, List, Item, Description } from './Summary.styled';

export const Summary = () => {
  const summaryMonth = 6;

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
      .filter(e => e.value !== 'N/A').slice(0, summaryMonth);

    setlistMonths(result);
  }, [stateMonts]);

  return (
    <Container>
        <Title>SUMMARY</Title>
        <List>
          {listMonths.map(({ month, value }, edx) => (
            <Item key={edx}>
              <Description>{month}</Description>
              <Description> {value} </Description>
            </Item>
          ))}
        </List>
    </Container>
  );
};

export default Summary;

// import { Summary } from 'components/Summary/Summary';
// <Summary />
