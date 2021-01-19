import "./App.css";
import React, { useState, useEffect } from "react";
import { getRandomImage } from './ApiServices';

import LoadingPage from './components/loadingPage/LoadingPage';
import AuthenticationPage from './components/authentication/Authentication';
import DailyNews from './components/dailyNews/DailyNews'


function App() {
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState('');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(window.localStorage.getItem('token') ? true : false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // setTimeout(() => setLoading(false), 3700);
    // getRandomImage()
    //   .then(photo => setBgImage(photo.urls.regular));


  }, []);

  return (
    <div className="App">

      {

        // loading === true ? <LoadingPage /> : 
        // isUserAuthenticated ? 
        //   <DailyNews
        //     user={user}
        //     setUser={setUser}
        //     setIsUserAuthenticated={setIsUserAuthenticated}
        //   /> : 
        //   <AuthenticationPage 
        //   bgImage={bgImage}
        //   isUserAuthenticated={isUserAuthenticated}
        //   setIsUserAuthenticated={setIsUserAuthenticated}
        //   user={user}
        //   setUser={setUser}/>

        // loading === true ? <LoadingPage /> : 
        isUserAuthenticated ?
          <DailyNews
            user={user}
            setUser={setUser}
            setIsUserAuthenticated={setIsUserAuthenticated}
          /> :
          <AuthenticationPage 
          bgImage={bgImage}
          isUserAuthenticated={isUserAuthenticated}
          setIsUserAuthenticated={setIsUserAuthenticated}
          user={user}
          setUser={setUser}/>
      }

    </div>
  );
}

export default App;
