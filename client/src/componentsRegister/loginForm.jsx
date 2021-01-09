import './style-form.css';
import { useState } from 'react';
import { login } from '../ApiServices';
import { Redirect } from 'react-router-dom';

function Login(props) {
  // const {} = props;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkLogin, setCheckLogin] = useState(false);

  function handleChangeEmail(event) {
    event.preventDefault();
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    event.preventDefault();
    setPassword(event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (email && password) {
      login(email, password)
        .then(user => user.data)

      setCheckLogin(true);
    }
  }

  return(
    <>
      {checkLogin ? <Redirect to="/news" /> : 'login page'}
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Email
          <input 
            type="email" 
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
          />
        </label>
        <label htmlFor="">
          Password
          <input 
            type="password" 
            value={password}
            onChange={handleChangePassword}
            placeholder="Password"
          />
        </label>

        <input type="submit" value="Login"/>
      </form>
    </>
  )
}


export default Login;