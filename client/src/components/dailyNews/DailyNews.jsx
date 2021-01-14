import './style-dailyNews.css';
import { useState, useEffect } from 'react';
import Background from '../../components/backgroud/Background';
import HeaderPage from '../../components/headerPage/HeaderPage';
import { getWeather, getNewsCategory } from '../../ApiServices';
import RightMenu from '../rightMenu/RightMenu';

function DailyNews() {
  let titlePage = 'Your Daily News'

  const [weather, setWeather] = useState([]);
  const [time, setTime] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // only for inital state, untill the user set or accept the global notification

  useEffect(() => {

    // convert country name to iso code, used to filter country headtitles
    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        //array for weather
        getWeather(latitude, longitude).then((data) => {
          setTime(data.data.observations.location[0].observation[0].utcTime)
          setWeather(data.data)
          const country = countries.getAlpha2Code(data.data.observations.location[0].country, "en").toLowerCase()
          // first the country is UK, once accept the position notification, turn all on the current state
          // setSelectedCountry(country);
          // getAndSetNewsCategoriesByCountry(country);
        });
      });
    }  
  }, [])

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

  return(
    <>
      <div className="daily-news height-page">
        <HeaderPage 
          titlePage={titlePage}
          time={time}
        />
        <Background />
        <RightMenu />
      </div>
      
    </>
  ); 
}

export default DailyNews;