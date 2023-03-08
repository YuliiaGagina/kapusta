import { useState } from 'react';
import { FiBarChart2 } from 'react-icons/fi';
import { useDispatch } from 'react-redux';
import { balance } from 'redux/Transactions/TransactionsOperations';
import { NavLink } from 'react-router-dom';
import {
  BalanceBtn,
  BalanceContainer,
  BalanceForm,
  BalanceInput,
  BalanceTitle,
  BalanceWrap,
  Wrap,
} from './Balance.styled';

export function Balance() {
  const dispatch = useDispatch();

  const [number, setNumber] = useState('');
  const formSubmit = e => {
    e.preventDefault();
    dispatch(balance({ newBalance: number }));
  };
  const inputChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'number':
        setNumber(value);
        break;
      default:
        break;
    }
  };
  return (
    <Wrap>
      <BalanceWrap>
        <NavLink to="/transaction/period-data">Reports</NavLink>
        <FiBarChart2 />
      </BalanceWrap>
      <BalanceContainer>
        <BalanceTitle>Balance:</BalanceTitle>
        <BalanceForm onSubmit={formSubmit}>
          <label>
            <BalanceInput
              type="text"
              name="number"
              value={number}
              onChange={inputChange}
              placeholder="00.00 UAH"
            />
          </label>
          <BalanceBtn>Confirm</BalanceBtn>
        </BalanceForm>
      </BalanceContainer>
    </Wrap>
  );
}
