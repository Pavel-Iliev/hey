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
    setTimeout(() => setLoading(false), 3700);
    getRandomImage()
      .then(photo => setBgImage(photo.urls.regular));

      
    // axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=797f19cbeedc498184dd394628e6bbd4').then(data => data.data)

    // fetch(`http://newsapi.org/v2/everything?q=bitcoin&from=2020-12-16&sortBy=publishedAt&apiKey=d21ca6233a114ed7b4c8df72e41486c5`)
    // .then(response => response.json())
    // .then(data => console.log(data));


  }, []);

  return (
    <div className="App">

      {

        loading === true ? <LoadingPage /> : 
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
