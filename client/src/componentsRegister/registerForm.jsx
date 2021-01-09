import './style-form.css';
import { useState } from 'react';
import { register } from '../ApiServices';

function Register(props) {
  // const {} = props;

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');

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
        .then(user => user.data)
        .catch(error => setError(error.response.data))
    }
  }
  return(
    <>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">
          Name
          <input 
            type="text" 
            value={name}
            onChange={handleChangeName}
            placeholder="Name"
          />
        </label>
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
        <input type="submit" value="Register"/>
        {error && <h1>{error}</h1>}
      </form>
    </>
  )
}


export default Register;