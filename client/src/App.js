import "./App.css";
import React, { useState, useEffect } from "react";
import {
  getNewsServer,
  postNewsPersonal,
  deleteNews,
  getWeather,
  // getNews,
  // getNewsCategory,
  // getRandomImage,
} from "./ApiServices";

import { SwipeableList, SwipeableListItem, ActionAnimations } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

function App() {
  const [newsServer, setNewsServer] = useState([]);
  const [newsDaily, setNewsDaily] = useState([]);
  const [weather, setWeather] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // only for inital state, untill the user set or accept the global notification


  useEffect(() => {
    getNewsServer().then((news) => setNewsServer(news));

    // convert country name to iso code, used to filter country headtitles
    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        //array for weather

        getWeather(latitude, longitude).then((data) => {
          setWeather(data);
          const country = countries.getAlpha2Code(data.data.observations.location[0].country, "en").toLowerCase()

          // first the country is UK, once accept the position notification, turn all on the current state
          // setSelectedCountry(country);
          // getAndSetNewsCategoriesByCountry(country);
        });
      });
    }

    //getNews().then((news) => setNewsDaily(news.articles));

    // getRandomImage()
    //   .then(photo => console.log(photo.urls.full));
  }, []);

  //set the new country after select it
  // function onCountryChange(event) {
  //   setSelectedCountry(event.target.value);
  //   getAndSetNewsCategoriesByCountry(event.target.value);
  // }

  //function to set the categories buy country
  // function getAndSetNewsCategoriesByCountry(country) {
  //   const categoryPromises = ["business", "entertainment", "general", "health", "science", "sports", "technology",].map((category) => getNewsCategory(country, category));

  //   Promise.all(categoryPromises).then((categories) =>
  //     setCategories(categories)
  //   );
  // }

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
  console.log(weather, 'weather');

  //console the daily news filtered by keyword
  // console.log(newsDaily);


  // console.log(categories);



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
      <h1>Solo Project di staminchia di&nbsp;stocazzo</h1>
      <p>Evvia la ft</p>


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


      {/* <div>{selectedCountry}</div>
      <select onChange={onCountryChange}>
        <option value="gb">UK</option>
        <option value="it">Italy</option>
        <option value="us">Us</option>
        <option value="bg">BG</option>
      </select> */}
    </div>
  );
}

export default App;
