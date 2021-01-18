import './style-dailyNews.css';
import { useState, useEffect } from 'react';
import Background from '../../components/backgroud/Background';
import HeaderPage from '../../components/headerPage/HeaderPage';
import { getWeather, getNewsCategory } from '../../ApiServices';
import RightMenu from '../rightMenu/RightMenu';
import LeftMenu from '../leftMenu/LeftMenu';
import NewsPage from '../newsPage/NewsPage';
import { 
  getFiltersServer, 
  postFiltersPersonal, 
  deleteFilters, 
  getTime, 
  postTime,
  getNewsServer,
  postNewsPersonal,
  deleteNews,
} from '../../ApiServices';

import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

function DailyNews(props) {
  const { user, setIsUserAuthenticated, setUser } = props;
  const [titlePage, setTitlePage] = useState('Your Daily News');

  const [isLefMenuOpen, setIsLeftMenuOpen] = useState(false);
  const [isRightMenuOpen, setIsRightMenuOpen] = useState(false);

  const [time, setTime] = useState('');

  const [countryGeolocation, setCountryGeolocation] = useState('');
  const [cityGeolocation, setCityGeolocation] = useState('');
  const [temperatureDescGeolocation, setTemperatureDescGeolocation] = useState('');
  const [highTemperatureGeolocation, setHighTemperatureGeolocation] = useState('');
  const [lowTemperatureGeolocation, setLowTemperatureGeolocation] = useState('');
  const [iconLinkGeolocation, setIconLinkGeolocation] = useState('');

  const [filters, setFilters] = useState([]);

  const [clockTime, setClockTime] = useState([]);

  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // only for inital state, untill the user set or accept the global notification


  const [newsServer, setNewsServer] = useState([]);

  useEffect(() => {
  
    // convert countr y name to iso code, used to filter country headtitles
    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getWeather(latitude, longitude).then((data) => {
          setTime(data.data.observations.location[0].observation[0].utcTime);
          setCountryGeolocation(data.data.observations.location[0].observation[0].country);
          setCityGeolocation(data.data.observations.location[0].observation[0].city);
          setTemperatureDescGeolocation(data.data.observations.location[0].observation[0].temperatureDesc);
          setHighTemperatureGeolocation(data.data.observations.location[0].observation[0].highTemperature);
          setLowTemperatureGeolocation(data.data.observations.location[0].observation[0].lowTemperature);
          setIconLinkGeolocation(data.data.observations.location[0].observation[0].iconLink);

          const country = countries.getAlpha2Code(data.data.observations.location[0].country, "en").toLowerCase()
          // first the country is UK, once accept the position notification, turn all on the current state
          // setSelectedCountry(country);
          // getAndSetNewsCategoriesByCountry(country);
        });
      });

    }  

    const tokenUser = localStorage.getItem('token');
    getFiltersServer(tokenUser).then((filters) => setFilters(filters));
    getTime(tokenUser).then(timeClock => setClockTime(timeClock));
    getNewsServer(tokenUser).then((news) => setNewsServer(news));

  }, [])

  function addFilters( addFilter, token ) {
    postFiltersPersonal( addFilter, token )
      .then((filter) => setFilters([...filters, filter.data]));
  }

  function deleteOnefilter(id) {
    deleteFilters(id).then(() => {
      setFilters((filter) =>
        filter.filter((filterDelete) => filterDelete._id !== id)
      );
    });
  }

  function addTime( timeToAdd, token) {
    postTime( timeToAdd, token )
      .then((time) => setClockTime(time.data));
  }

  // get Categories LOGIC from api
  // //set the new country after select it
  // function onCountryChange(event) {
  //   setSelectedCountry(event.target.value);
  //   getAndSetNewsCategoriesByCountry(event.target.value);
  // }

  // //function to set the categories by country
  // function getAndSetNewsCategoriesByCountry(country) {
  //   const categoryPromises = ["business", "entertainment", "general", "health", "science", "sports", "technology",].map((category) => getNewsCategory(country, category));

  // NEED THIS CALL FOR ALL NEWS FROM SINGLE SEARCH
  //   Promise.all(categoryPromises).then((categories) =>
  //     setCategories(categories)
  //   );
  // }

  //post method
  function addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage, token) {
    postNewsPersonal(author, description, publishedAt, source, title, url, urlToImage , token)
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

  return(
    <>
      <div className="home height-page">

        <Router>
          <HeaderPage 
            titlePage={titlePage}
            setTitlePage={setTitlePage}
            time={time}
          />
          <Background />

          <RightMenu 
            isLefMenuOpen={isLefMenuOpen}
            setIsLeftMenuOpen={setIsLeftMenuOpen}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
          />
          <LeftMenu 
            user={user}
            setUser={setUser}
            setIsUserAuthenticated={setIsUserAuthenticated}
            filters={filters}
            addFilters={addFilters}
            deleteOnefilter={deleteOnefilter}
            clockTime={clockTime}
            addTime={addTime}
            countryGeolocation={countryGeolocation}
            cityGeolocation={cityGeolocation}
            temperatureDescGeolocation={temperatureDescGeolocation}
            highTemperatureGeolocation={highTemperatureGeolocation}
            lowTemperatureGeolocation={lowTemperatureGeolocation}
            iconLinkGeolocation={iconLinkGeolocation}
            categories={categories}
            selectedCountry={selectedCountry}
            isLefMenuOpen={isLefMenuOpen}
            setIsLeftMenuOpen={setIsLeftMenuOpen}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
          />

          <Switch>
            <Route path="/daily">
              <h1>Daily news</h1>
              <NewsPage 
              />
            </Route>
            <Route path="/business">
              <NewsPage
                categoryForApi='business'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/technology">
              <NewsPage 
                categoryForApi='technology'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/entertainment">
              <NewsPage 
                categoryForApi='entertainment'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/health">
              <NewsPage 
                categoryForApi='health'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/general">
              <NewsPage 
                categoryForApi='general'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/science">
              <NewsPage 
                categoryForApi='science'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/sports">
              <NewsPage 
                categoryForApi='sports'
                addNewsToPersonal={addNewsToPersonal}
              />
            </Route>
            <Route path="/saved-news">
              <NewsPage 
                checkForSavedNews='saved-news'
                newsForPage={newsServer}
                addNewsToPersonal={addNewsToPersonal}
                deleteOneNews={deleteOneNews}
              />
            </Route>
          </Switch>
        </Router>
      </div>
      
    </>
  ); 
}

export default DailyNews;