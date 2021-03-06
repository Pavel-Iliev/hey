import './style-authentication.css';
import { useEffect, useState } from 'react';
import Background from '../../components/backgroud/Background';
import Login from '../componentsRegister/loginForm';
import Register from '../componentsRegister/registerForm';
import { BrowserRouter as Router,Switch,Route,Link } from "react-router-dom";

function AuthenticationPage(props) {

  const {bgImage, isUserAuthenticated , setIsUserAuthenticated , user , setUser} = props;
  const [isAuthPage, setIsAuthPage] = useState(true);

  useEffect(()=> {
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
          <img className="img-cover" alt="background for form"  src={bgImage}/>
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
                      <Link 
                      onClick={()=> {flagAuthPage(); signPage() }}
                      className="button-white" to="/signin">Sign in</Link>
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