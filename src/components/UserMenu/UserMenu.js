import { NavLink } from 'react-router-dom';

export const UserMenu = () => {
  return (
    <>
      <NavLink to="/">Logo</NavLink>
        <p>Welcome, User</p>
      <button type="button">Logout</button>

      <ul>
        <li>
          <NavLink to="/expenses">Expenses</NavLink>
        </li>
        <li>
          <NavLink to="/income">Income</NavLink>
        </li>
        
       </ul>
    </>

  );
};
