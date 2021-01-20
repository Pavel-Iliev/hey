import './style-newsPage.css';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { InView } from 'react-intersection-observer';
import { getWeather, getNewsCategory, login, getNews } from '../../ApiServices';
import moment from "moment";
import { useEffect, useState, useCallback } from 'react';
import {useHistory} from 'react-router-dom';

function NewsPage(props) {
  const { newsForPage, dailyNews , addNewsToPersonal, deleteOneNews, categoryForApi, checkForSavedNews, checkForNews, filters, countryForFilter, dateForFilter, setDailyNews } = props;

  const [notificationSaved, setNotificationSaved] = useState(false);
  const [notificationDeleted, setNotificationDeleted] = useState(false);

  const [activeCategory, setActiveCategory] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('gb'); // only for inital state, untill the user set or accept the global notification

  const [automaticCountry, setAutomaticCountry] = useState(true);

  const [tempNews, setTempNews] = useState([])

  const history = useHistory()



  const memoizedCallback = useCallback(
    () => {
      if (categoryForApi) {
        document.querySelector('.country-select').classList.add('country-select__show')
        document.querySelector('.swipe-icons').classList.add('swipe-icons-category')
      } else {
        document.querySelector('.country-select').classList.remove('country-select__show')
        document.querySelector('.swipe-icons').classList.remove('swipe-icons-category')
      }

      if (checkForSavedNews) {
        document.querySelector('.swipe-icons').classList.add('swipe-icons-saved')
      } else {
        document.querySelector('.swipe-icons').classList.remove('swipe-icons-saved')
      }
      if(categoryForApi === 'daily') {
        document.querySelector('.country-select').classList.remove('country-select__show')
      }
    },
    [categoryForApi, checkForSavedNews],
  );

  useEffect(()=> {
    const countries = require("i18n-iso-countries");
    countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

    if (navigator.geolocation && automaticCountry) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        getWeather(latitude, longitude).then((data) => {
          const country = countries.getAlpha2Code(data.data.observations.location[0].country, "en").toLowerCase()
          // first the country is UK, once accept the position notification, turn all on the current state
          setSelectedCountry(country);
        });
      });
    }  
    const {pathname} = history.location

    if (pathname === '/' && !dailyNews.length && !tempNews.length) {
      console.log(dailyNews, 'daily')
      getTempNews()
    } else if (pathname === '/saved-news') {
    } else {
      getAndSetNewsCategoriesByCountry(selectedCountry, categoryForApi);
    }

    memoizedCallback()

  } , [categoryForApi, selectedCountry, automaticCountry, memoizedCallback, checkForSavedNews, checkForNews]);
  
  function getTempNews() {
    console.log('tempNews called');
    Promise.all(filters.map(oneFilter => {
      return getNews(oneFilter.filter, countryForFilter, dateForFilter)
        .then(news => {
          return news.articles.slice(0,5)
        })
    }))
    .then(news => {
      setTempNews(news.flat())
      // setDailyNews(news.flat())
    });
  }

  // get Categories LOGIC from api
  //set the new country after select itx
  function onCountryChange(event) {
    setAutomaticCountry(false);
    setSelectedCountry(event.target.value);
    getAndSetNewsCategoriesByCountry(event.target.value, categoryForApi);
  }

  //function to set the categories by country
  function getAndSetNewsCategoriesByCountry(country, category) {
    getNewsCategory(country, category)
      .then(categoryNews => setActiveCategory(categoryNews.articles))
  }

  //save new to personals news
  function save(author, description, publishedAt, source, title, url, urlToImage) {
    const token = localStorage.getItem('token');
    addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage, token);
  }

  //test to delete method
  function deleteSelectedNews(id) {
    deleteOneNews(id);
  }  

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  function addNewsAnimation(card) {
    card.style.transform = `translate(${getRandomInt(-3, 3)}%, ${getRandomInt(0, 6)}%) rotate(${getRandomInt(-2, 2)}deg)`;  
    card.style.WebkitTransition = 'transform 1s';
    card.style.MozTransition = 'transform 1s';
  }

  function removeNewsAnimation(card) {
    card.style.transform = `translate(0,0) rotate(0deg)`;  
    card.style.WebkitTransition = 'transform 0s';
    card.style.MozTransition = 'transform 0s';
  }

  function showSaved() {
    setNotificationSaved(true);
    setTimeout(() => {
      setNotificationSaved(false);
    }, 1500);
  }

  function showDeleted() {
    setNotificationDeleted(true);
    setTimeout(() => {
      setNotificationDeleted(false);
    }, 1500);
  }

  const test = dailyNews.length ? dailyNews : tempNews

  return(
    <>
      <div className="news-page pos-rel">
        {
          newsForPage ? 
        <SwipeableList>
          {newsForPage.map(singleNews => {
            return <InView 
                      className="news-card"
                      onChange={(inView, entry) => {
                        if(inView) {
                          addNewsAnimation(entry.target)
                          } else {
                          removeNewsAnimation(entry.target)
                        }
                      }}
                      key={singleNews._id}
                    >
                      <SwipeableListItem
                        swipeLeft={{
                          action: () => {
                            deleteSelectedNews(singleNews._id)
                            showDeleted()
                          }
                        }}

                        swipeRight={categoryForApi ? 
                          {
                          action: () => {
                            save(singleNews.author, singleNews.description, singleNews.publishedAt, singleNews.source, singleNews.title, singleNews.url, singleNews.urlToImage);
                            showSaved();
                          }
                        }
                        : false }
                      >
                        <div className="news-image pos-rel br-10">
                          <img className="img-cover" src={singleNews.urlToImage} alt=""/>
                          <div className="no-avaiable-img">
                            <img src="/images/logo-black.svg" alt="no available img"/>
                          </div>
                        </div>
                        <div className="news-wrap-text br-10">
                          <div className="news-wrap-text__title br-10">
                            <h2>{singleNews.title}</h2>
                          </div>
                          <div className="news-wrap-text__content">
                            <p>{singleNews.description}</p>
                          </div>
                        </div>
                        <div className="news-bottom-wrap">
                          <div className="news-bottom-wrap__info">
                            <p>
                              <span className="title-font">{singleNews.source},</span><br />
                              <span className="title-font">{singleNews.author},</span><br />
                              <span className="color-blue news-data">{moment(singleNews.publishedAt).format('Do, MMMM')}</span>
                            </p>
                          </div>
                          <div className="news-bottom-wrap__button">
                            <a className="button-blue pos-rel" href={singleNews.url} target="_blank" rel="noreferrer">
                              Link
                              <img src="/images/link.svg" alt="link"/>
                            </a>
                          </div>
                        </div>
                      </SwipeableListItem>
                    </InView>
          })}
        </SwipeableList>
        : 
        activeCategory.length ?
        <SwipeableList>
          {activeCategory.map((singleNews, index) => {
            return <InView 
                      className="news-card"
                      onChange={(inView, entry) => {
                        if(inView) {
                          addNewsAnimation(entry.target)
                          } else {
                          removeNewsAnimation(entry.target)
                        }
                      }}
                      key={index}
                    >
                      <SwipeableListItem
                        swipeRight={{
                          action: () => {
                            save(singleNews.author, singleNews.description, singleNews.publishedAt, singleNews.source.name, singleNews.title, singleNews.url, singleNews.urlToImage);
                            showSaved();
                          }
                        }}
                      >
                        <div className="news-image pos-rel br-10">
                          <img className="img-cover" src={singleNews.urlToImage} alt=""/>
                          <div className="no-avaiable-img">
                            <img src="/images/logo-black.svg" alt="no available img"/>
                          </div>
                        </div>
                        <div className="news-wrap-text br-10">
                          <div className="news-wrap-text__title br-10">
                            <h2>{singleNews.title}</h2>
                          </div>
                          <div className="news-wrap-text__content">
                            <p>{singleNews.description}</p>
                          </div>
                        </div>
                        <div className="news-bottom-wrap">
                          <div className="news-bottom-wrap__info">
                            <p>
                              <span className="title-font">{singleNews.source.name},</span><br />
                              <span className="title-font">{singleNews.author},</span><br />
                              <span className="color-blue news-data">{moment(singleNews.publishedAt).format('Do, MMMM')}</span>
                            </p>
                          </div>
                          <div className="news-bottom-wrap__button">
                            <a className="button-blue pos-rel" href={singleNews.url} target="_blank" rel="noreferrer">
                              Link
                              <img src="/images/link.svg" alt="link"/>
                            </a>
                          </div>
                        </div>
                      </SwipeableListItem>
                    </InView>
          })}
        </SwipeableList> : 
        <SwipeableList>
        {test.map((singleNews, index) => {
          return <InView 
                    className="news-card"
                    onChange={(inView, entry) => {
                      if(inView) {
                        addNewsAnimation(entry.target)
                        } else {
                        removeNewsAnimation(entry.target)
                      }
                    }}
                    key={index}
                  >
                    <SwipeableListItem
                      swipeRight={{
                        action: () => {
                          save(singleNews.author, singleNews.description, singleNews.publishedAt, singleNews.source.name, singleNews.title, singleNews.url, singleNews.urlToImage);
                          showSaved();
                        }
                      }}
                    >
                      <div className="news-image pos-rel br-10">
                        <img className="img-cover" src={singleNews.urlToImage} alt=""/>
                        <div className="no-avaiable-img">
                          <img src="/images/logo-black.svg" alt="no available img"/>
                        </div>
                      </div>
                      <div className="news-wrap-text br-10">
                        <div className="news-wrap-text__title br-10">
                          <h2>{singleNews.title}</h2>
                        </div>
                        <div className="news-wrap-text__content">
                          <p>{singleNews.description}</p>
                        </div>
                      </div>
                      <div className="news-bottom-wrap">
                        <div className="news-bottom-wrap__info">
                          <p>
                            <span className="title-font">{singleNews.source.name},</span><br />
                            <span className="title-font">{singleNews.author},</span><br />
                            <span className="color-blue news-data">{moment(singleNews.publishedAt).format('Do, MMMM')}</span>
                          </p>
                        </div>
                        <div className="news-bottom-wrap__button">
                          <a className="button-blue pos-rel" href={singleNews.url} target="_blank" rel="noreferrer">
                            Link
                            <img src="/images/link.svg" alt="link"/>
                          </a>
                        </div>
                      </div>
                    </SwipeableListItem>
                  </InView>
              })}
            </SwipeableList> 
        }

        <div className="action-notification">
          <div className={`action-notification__btn action-notification__deleted br-10 ${notificationDeleted ? 'show-notification' : '' }`}>
          <img src="/images/logo-black.svg" alt="news deleted"/>
            <span>News <br/>deleted!</span>
          </div>
          <div className={`action-notification__btn action-notification__saved br-10 ${notificationSaved ? 'show-notification' : '' }`}>
            <span>News <br/>saved!</span>
            <img src="/images/logo-white.svg" alt="news saved"/>
          </div>
        </div>

        <div className="country-select">
          <p>Filter the country <span>for your news</span></p>
          <select 
            onChange={onCountryChange}
            name="countryChange" 
            id="countryChange"
          >
            <option value="de">Germany</option>
            <option value="gb">England</option>
            <option value="it">Italy</option>
            <option value="bg">Bulgaria</option>
            <option value="us">Usa</option>
            <option value="cn">China</option>
          </select>
        </div>


        <div className="swipe-icons">
          <div className="swipe-icons-left">
            <div className="swipe-icons__icon icon-left">
              <img src="/images/swipe-left.svg" alt="swipe left"/>
            </div>
            <p>
              <span>d</span>
              <span>e</span>
              <span>l</span>
              <span>e</span>
              <span>t</span>
              <span>e</span>
            </p>
          </div>
          <div className="swipe-icons-right">
            <div className="swipe-icons__icon icon-right">
              <img src="/images/swipe-right.svg" alt="swipe right"/>
            </div>
            <p>
              <span>s</span>
              <span>a</span>
              <span>v</span>
              <span>e</span>
            </p>
          </div>
        </div>

      </div>
    </>
  ); 
}

export default NewsPage;