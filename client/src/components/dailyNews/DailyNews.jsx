import './style-dailyNews.css';
import { useState, useEffect } from 'react';
import Background from '../../components/backgroud/Background';
import HeaderPage from '../../components/headerPage/HeaderPage';
import { getWeather } from '../../ApiServices';
import RightMenu from '../rightMenu/RightMenu';
import LeftMenu from '../leftMenu/LeftMenu';
import NewsPage from '../newsPage/NewsPage';
import { 
  getNews,
  getFiltersServer, 
  postFiltersPersonal, 
  deleteFilters, 
  getNewsServer,
  postNewsPersonal,
  deleteNews,
} from '../../ApiServices';
import moment from 'moment';

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

  const [newsServer, setNewsServer] = useState([]);

  const [dailyNews, setDailyNews] = useState([]);

  const [dateForFilter, setDateForFilter] = useState(moment().format("YYYY-MM-DD"))
  const [countryForFilter, setCountryForFilter] = useState('en')

  useEffect(()=> {
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
          
          setCountryForFilter(countries.getAlpha2Code(data.data.observations.location[0].country, "en").toLowerCase())

        });
      });
    }  
  },[])


  useEffect(() => {
    const tokenUser = localStorage.getItem('token');
    getFiltersServer(tokenUser).then((filters) => setFilters(filters));
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

  function checkForNews() {

    Promise.all(filters.map(oneFilter => {
      return getNews(oneFilter.filter, countryForFilter, dateForFilter)
        .then(news => {
          return news.articles.slice(0,5)
        })
    }))
    .then(news => setDailyNews(news.flat()));
  }


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
            countryGeolocation={countryGeolocation}
            cityGeolocation={cityGeolocation}
            temperatureDescGeolocation={temperatureDescGeolocation}
            highTemperatureGeolocation={highTemperatureGeolocation}
            lowTemperatureGeolocation={lowTemperatureGeolocation}
            iconLinkGeolocation={iconLinkGeolocation}
            isLefMenuOpen={isLefMenuOpen}
            setIsLeftMenuOpen={setIsLeftMenuOpen}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
            setDailyNews={setDailyNews}
            dateForFilter={dateForFilter}
            countryForFilter={countryForFilter}
            checkForNews={checkForNews}
          />

          <Switch>
            <Route exact path="/">
              <NewsPage 
              categoryForApi='daily'
              addNewsToPersonal={addNewsToPersonal}
              dailyNews={dailyNews}
              setDailyNews={setDailyNews}
              checkForNews={checkForNews}
              filters={filters}
              countryForFilter={countryForFilter}
              dateForFilter={dateForFilter}

              />
            </Route>
            <Route path="/business">
              <NewsPage
                categoryForApi='business'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/technology">
              <NewsPage 
                categoryForApi='technology'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/entertainment">
              <NewsPage 
                categoryForApi='entertainment'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/health">
              <NewsPage 
                categoryForApi='health'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/general">
              <NewsPage 
                categoryForApi='general'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/science">
              <NewsPage 
                categoryForApi='science'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/sports">
              <NewsPage 
                categoryForApi='sports'
                addNewsToPersonal={addNewsToPersonal}
                dailyNews={dailyNews}
              />
            </Route>
            <Route path="/saved-news">
              <NewsPage 
                checkForSavedNews='saved-news'
                newsForPage={newsServer}
                addNewsToPersonal={addNewsToPersonal}
                deleteOneNews={deleteOneNews}
                dailyNews={dailyNews}
              />
            </Route>
          </Switch>
      </div>
      
    </>
  ); 
}

export default DailyNews;