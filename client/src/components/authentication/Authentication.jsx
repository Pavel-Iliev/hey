import './style-authentication.css';
import { useEffect, useState } from 'react';
import { getRandomImage } from '../../ApiServices';
import Background from '../../components/backgroud/Background';
import Login from '../componentsRegister/loginForm';
import Register from '../componentsRegister/registerForm';
import { BrowserRouter as Router,Switch,Route,Link, useHistory } from "react-router-dom";

function AuthenticationPage(props) {

  const { isUserAuthenticated , setIsUserAuthenticated , user , setUser} = props;

  const [image, setImage] = useState('');
  const [isAuthPage, setIsAuthPage] = useState(true);
  const history = useHistory();

  useEffect(()=> {
    getRandomImage()
      .then(photo => setImage(photo.urls.small));
    return () => {setIsAuthPage(true)}

    
  }, [])  

  function flagAuthPage() {
    setIsAuthPage(false);
  }

  function loginPage() {
    document.querySelector('.authentication-page--wrap').classList.add('login-page')
  }
  function signPage() {
    document.querySelector('.authentication-page--wrap').classList.add('sign-page')
  }

  function clearClassesLogin() {
    document.querySelector('.authentication-page--wrap').classList.remove('login-page')
  }
  function clearClassesSign() {
    document.querySelector('.authentication-page--wrap').classList.remove('sign-page')
  }

  return(
    <>
      <div className="authentication-page height-page">
        <img className="bg-top" src="/images/header-app.svg" alt="top of the app" />
        <Background />
        <div className="authentication-page--wrap">
          <img className="img-cover" alt="background for form"  src={image}/>
          <img className="authentication-page--wrap-bg" alt="background for form wave" src="/images/bg-form.svg"/>
          <div className="authentication-page--wrap-form">
            {
              <Router>
                {
                  isAuthPage ? 
                  <ul>
                    <li>
                      <Link 
                        onClick={()=> {
                          flagAuthPage(); 
                          loginPage(); 
                        }} to="/login" className="button-blue btn">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link className="button-white" to="/signin"><button onClick={()=> {flagAuthPage(); signPage() }}>Sign in</button></Link>
                    </li>
                  </ul>
                  : ''
                }
                

                <Switch>
                  <Route path="/login">
                    <Login 
                      isUserAuthenticated={isUserAuthenticated}
                      setIsUserAuthenticated={setIsUserAuthenticated}
                      user={user}
                      setUser={setUser}
                      isAuthPage={isAuthPage}
                      setIsAuthPage={setIsAuthPage} 
                      clearClassesLogin={clearClassesLogin}
                    />
                  </Route>
                  <Route path="/signin">
                    <Register 
                      isUserAuthenticated={isUserAuthenticated}
                      setIsUserAuthenticated={setIsUserAuthenticated}
                      user={user}
                      setUser={setUser}
                      setIsAuthPage={setIsAuthPage} 
                      clearClassesSign={clearClassesSign}
                    />
                  </Route>
                </Switch>
              </Router>
            }
          </div>
        </div>
      </div>
    </>
  ); 
}

export default AuthenticationPage;