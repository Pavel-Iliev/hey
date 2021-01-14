import './style-form.css';
import { useState, useEffect } from 'react';
import { register, getUser } from '../../ApiServices';
import { useHistory } from 'react-router-dom';

function Register(props) {
  const {setIsAuthPage, clearClassesSign, isUserAuthenticated , setIsUserAuthenticated , user , setUser} = props;

  const history = useHistory()

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    //set is authenticate in app.js
    user && setIsUserAuthenticated(true);
  }, [user, setIsUserAuthenticated])

  function handleChangeName(event) {
    setName(event.target.value);
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangePassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit (event) {
    event.preventDefault();
    if (name && email && password) {
      register(name, email, password)
        .then(token => {
          getUser(token.data).then(user => setUser(user.data))
          localStorage.setItem('token', token.data)
        })  
        .catch(error => {
          document.querySelector('.error').innerHTML = error.response.data
        })      
      }
      setName('');
      setEmail('');
      setPassword('');
  }
  return(
    <>
      <form className="form form-signin" action="" onSubmit={handleSubmit}>
        <label htmlFor="signName">
          Name
        </label>
        <div className="wrap-input">
          <img src="/images/user.svg" alt="email icon" />
          <input 
            id="signName"
            type="text" 
            value={name}
            onChange={handleChangeName}
            placeholder="Name"
          />
        </div>
        <label htmlFor="signEmail">
          Email
        </label>
        <div className="wrap-input">
          <img src="/images/email.svg" alt="email icon" />
          <input 
            id="signEmail"
            type="email" 
            value={email}
            onChange={handleChangeEmail}
            placeholder="Email"
          />
        </div>
        <label htmlFor="signPassword">
          Password
        </label>
        <div className="wrap-input">
          <img src="/images/key.svg" alt="email icon" />
          <input 
            id="signPassword"
            type="password" 
            value={password}
            onChange={handleChangePassword}
            placeholder="Password"
          />
        </div>
        <p className="error"></p>
        <span className="button-blue">
            Sign In
          </span>
      </form>
      <button className="back-btn" onClick={() => {
        history.goBack()
        clearClassesSign()
        setTimeout(() => {
          setIsAuthPage(true);
        }, 100)
        }}>back</button>
    </>
  )
}


export default Register;