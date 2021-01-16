import "./App.css";
import React, { useState, useEffect } from "react";
import { getRandomImage } from './ApiServices';

import LoadingPage from './components/loadingPage/LoadingPage';
import AuthenticationPage from './components/authentication/Authentication';
import DailyNews from './components/dailyNews/DailyNews'

// all old stuff
import {
  getNewsServer,
  postNewsPersonal,
  deleteNews,
  getNews,
} from "./ApiServices";


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import { SwipeableList, SwipeableListItem, ActionAnimations } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';


function App() {
  const [loading, setLoading] = useState(true);
  const [bgImage, setBgImage] = useState('');
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(window.localStorage.getItem('token') ? true : false);
  const [user, setUser] = useState(null);


  // ALL OLD STUFF
  const [newsServer, setNewsServer] = useState([]);
  const [newsDaily, setNewsDaily] = useState([]);


  useEffect(() => {
    // setTimeout(() => setLoading(false), 3700);
    // getRandomImage()
    //   .then(photo => setBgImage(photo.urls.regular));

    // ALL OLD STUFF
    // getNewsServer().then((news) => setNewsServer(news));
    
    // getNews().then((news) => console.log(news));
      
    // axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=797f19cbeedc498184dd394628e6bbd4').then(data => data.data)

    // fetch(`http://newsapi.org/v2/everything?q=bitcoin&from=2020-12-16&sortBy=publishedAt&apiKey=d21ca6233a114ed7b4c8df72e41486c5`)
    // .then(response => response.json())
    // .then(data => console.log(data));


  }, []);

  //post method
  function addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage) {
    postNewsPersonal(author, description, publishedAt, source, title, url, urlToImage)
      .then((event) => setNewsServer([...newsServer, event.data]));
  }

  //deleteMethod
  function deleteOneNews(id) {
    deleteNews(id).then(() => {
      setNewsServer((news) =>
        news.filter((newsDelete) => newsDelete._id !== id)
      );
    });
  }

  //console the news of the server (that one that want to save)
  //console.log(newsServer)

  //console the weather api call
  //console.log(weather, 'weather');

  //console the daily news filtered by keyword
  // console.log(newsDaily);


  //article to test post method to server
  //const articleToSave = newsServer[0];
  function save(author, description, publishedAt, source, title, url, urlToImage) {
    // articleToSave.author = "ft";

    // const author = articleToSave.author;
    // const description = articleToSave.description;
    // const publishedAt = articleToSave.publishedAt;
    // const source = articleToSave.source;
    // const title = articleToSave.title;
    // const url = articleToSave.url;
    // const urlToImage = articleToSave.urlToImage;

    addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage);
  }

  //test to delete method
  function deleteSelectedNews(id) {
    //const id = "5feb13c556ae125bfe7d6e41";
    deleteOneNews(id);
  }
  return (
    <div className="App">

      {

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

        // loading === false ? (isUserAuthenticated ? <DailyNews /> : <AuthenticationPage 
        //   bgImage={bgImage}
        //   isUserAuthenticated={isUserAuthenticated}
        //   setIsUserAuthenticated={setIsUserAuthenticated}
        //   user={user}
        //   setUser={setUser}/>) : (<LoadingPage />)
      }

      
      {/* <Router>

        <Switch>
          <Route path="/news">

            <SwipeableList>
              {newsServer.map(e => {
                return <SwipeableListItem
                  swipeLeft={{
                    content: <div>figa la troia</div>,
                    action: () => deleteSelectedNews(e._id)
                  }}
                  swipeRight={{
                    content: <div>FEEEEEGA</div>,
                    action: () => {
                      save(e.author, e.description, e.publishedAt, e.source, e.title, e.url, e.urlToImage)
                    }
                  }}
                  //onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
                  key={e._id}
                >
                  <p>{e.author}</p>
                </SwipeableListItem>
              })}
            </SwipeableList>
          </Route>

        </Switch>
      </Router>
       */}
    </div>
  );
}

export default App;
