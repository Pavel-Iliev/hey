import './style-form.css';
import { useState, useEffect } from 'react';
import { login, getUser } from '../../ApiServices';
import { useHistory } from 'react-router-dom';

function Login(props) {
  const {setIsAuthPage, clearClassesLogin, setIsUserAuthenticated, user, setUser} = props;

  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //set is authenticate in app.js
    user && setIsUserAuthenticated(true);
  }, [user, setIsUserAuthenticated])

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    
    if (email && password) {
      login(email, password)
        .then(token => {
          getUser(token.data)
          .then(user => {
            setUser(user.data);
            localStorage.setItem('token', token.data);
            localStorage.setItem('name', user.data.name);
            localStorage.setItem('email', user.data.email);
            localStorage.setItem('_id', user.data._id)
          })
        })
        .catch(error => {
          document.querySelector('.error').innerHTML = error.response.data
        })
    }
  }

  return(
    <>
      <form className="form form-login" action="" onSubmit={handleSubmit}>
        <label htmlFor="sendEmail">
          Email
        </label>
        <div className="wrap-input">
          <img src="/images/email.svg" alt="email icon" />
          <input 
            id="sendEmail"
            type="email" 
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
          />
        </div>
        <label htmlFor="sendPassword">
          Password
        </label>
        <div className="wrap-input">
          <img src="/images/key.svg" alt="email icon" />
          <input 
            id="sendPassword"
            type="password" 
            value={password}
            onChange={handleChangePassword}
            placeholder="Password"
          />
        </div>
        <p className="error"></p>
        <span className="button-blue btn">
          <button type="submit">Login</button>
        </span>
      </form>
      <button className="back-btn" onClick={() => {
        history.goBack();
        clearClassesLogin();
        setTimeout(() => {
          setIsAuthPage(true);
        }, 100) 
        
        }}>back</button>
      
    </>
  )
}


export default Login;