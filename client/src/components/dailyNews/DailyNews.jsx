import './style-dailyNews.css';
import { useState, useEffect } from 'react';
import Background from '../../components/backgroud/Background';
import HeaderPage from '../../components/headerPage/HeaderPage';
import { getWeather, getNewsCategory } from '../../ApiServices';
import RightMenu from '../rightMenu/RightMenu';
import LeftMenu from '../leftMenu/LeftMenu';
import { getFiltersServer, postFiltersPersonal, deleteFilters, getTime, postTime} from '../../ApiServices';

import { BrowserRouter as Router , Switch , Route } from "react-router-dom";

function DailyNews(props) {
  const { user } = props;
  let titlePage = 'Your Daily News'

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

  const [clockTime, setClockTime] = useState('');

  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // only for inital state, untill the user set or accept the global notification

  useEffect(() => {
  
    // convert countr y name to iso code, used to filter country headtitles
    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        //array for weather
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

      getFiltersServer(localStorage.getItem('token')).then((filters) => setFilters(filters));

      getTime().then(timeClock => setClockTime(timeClock));
    }  
  }, [])

  function addFilters( addFilter, idUser) {
    postFiltersPersonal( addFilter, idUser )
      .then((filter) => setFilters([...filters, filter.data]));
  }

  function deleteOnefilter(id) {
    deleteFilters(id).then(() => {
      setFilters((filter) =>
        filter.filter((filterDelete) => filterDelete._id !== id)
      );
    });
  }

  function addTime( timeToAdd ) {
    postTime( timeToAdd )
      .then((time) => setClockTime(time.data));
  }

  // //set the new country after select it
  // function onCountryChange(event) {
  //   setSelectedCountry(event.target.value);
  //   getAndSetNewsCategoriesByCountry(event.target.value);
  // }

  // //function to set the categories by country
  // function getAndSetNewsCategoriesByCountry(country) {
  //   const categoryPromises = ["business", "entertainment", "general", "health", "science", "sports", "technology",].map((category) => getNewsCategory(country, category));

  //   Promise.all(categoryPromises).then((categories) =>
  //     setCategories(categories)
  //   );
  // }

  // console.log(clockTime);

  return(
    <>
      <div className="page-news height-page">
        <HeaderPage 
          titlePage={titlePage}
          time={time}
        />
        <Background />

        <Router>

          <RightMenu 
            isLefMenuOpen={isLefMenuOpen}
            setIsLeftMenuOpen={setIsLeftMenuOpen}
            isRightMenuOpen={isRightMenuOpen}
            setIsRightMenuOpen={setIsRightMenuOpen}
          />
          <LeftMenu 
            user={user}
            filters={filters}
            addFilters={addFilters}
            deleteOnefilter={deleteOnefilter}
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
            </Route>
            <Route path="/business">
              <h1>Business news</h1>
            </Route>
            <Route path="/technology">
              <h1>Technology news</h1>
            </Route>
            <Route path="/entertainment">
              <h1>Entertainment news</h1>
            </Route>
            <Route path="/health">
              <h1>Health news</h1>
            </Route>
            <Route path="/general">
              <h1>General news</h1>
            </Route>
            <Route path="/science">
              <h1>Science news</h1>
            </Route>
            <Route path="/sports">
              <h1>Sports news</h1>
            </Route>
          </Switch>
        </Router>
        
        
      </div>
      
    </>
  ); 
}

export default DailyNews;