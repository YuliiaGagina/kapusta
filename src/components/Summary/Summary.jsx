import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import {
  getTransactionIncomeMonthsStats,
  getTransactionExpenseMonthsStats,
} from 'redux/Transactions/TransactionsOperations';
import {
  selectMonthsStats,
  selectTransactions,
  getIsloadingMonthsStats,
} from 'redux/Transactions/selectors';
import { Loader } from 'components/Loader/LoaderMin';
import {
  Container,
  Title,
  List,
  Item,
  Description,
  LoaderBox,
} from './Summary.styled';

export const Summary = () => {
  const [listMonthsState, setlistMonthsState] = useState([]); // масив результатів
  const [isLoadingState, setisLoadingState] = useState(false);

  const ІtemsStore = useSelector(selectTransactions); // слідкую за списком транзакцій
  const isLoadingStore = useSelector(getIsloadingMonthsStats);

  // * Відтермінування лоудера
  useEffect(() => {
    let timeoutId;
    if (isLoadingStore) {
      timeoutId = setTimeout(() => {
        setisLoadingState(isLoadingStore);
      }, 500);
    }
    if (!isLoadingStore) {
      setisLoadingState(isLoadingStore);
      clearTimeout(timeoutId);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isLoadingStore]);

  // * Логіка відслідковування оновлень:
  const dispatch = useDispatch();
  // поточна сторінка
  const { pathname } = useLocation();
  const isIncomePage = pathname.includes('/income');
  const isExpensePage = pathname.includes('/expense');
  // запт за данними
  useEffect(() => {
    let timeoutId;
    timeoutId = setTimeout(() => {
      if (isIncomePage) {
        dispatch(getTransactionIncomeMonthsStats());
      }
      if (isExpensePage) {
        dispatch(getTransactionExpenseMonthsStats());
      }
    }, 200);
    return () => {
      clearTimeout(timeoutId);
    };
  }, [ІtemsStore, dispatch, isExpensePage, isIncomePage]);

  // * Логіка побудови списку:
  const montsStore = useSelector(selectMonthsStats); // місячна статистика з бекенду
  useEffect(() => {
    const summaryMonth = 6; // кількість місяцв які треба рендерить
    // ключі бекенду, порядок в масиві визначає порядок видачі
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
        return { month: listMonthsEng[e], value: montsStore[e] };
      })
      .filter(e => e.value !== 'N/A')
      .slice(0, summaryMonth);

    setlistMonthsState(result);
  }, [montsStore, ІtemsStore]);

  return (
    <Container>
      <Title>SUMMARY</Title>
      {isLoadingState && (
        <LoaderBox>
          <Loader />
        </LoaderBox>
      )}
      <List>
        {listMonthsState.map(({ month, value }, edx) => (
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
