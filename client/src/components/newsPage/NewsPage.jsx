import './style-newsPage.css';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { InView } from 'react-intersection-observer';
import moment from "moment";
import { useState } from 'react';

function NewsPage(props) {
  const { newsForPage, addNewsToPersonal, deleteOneNews } = props;

  const [notificationSaved, setNotificationSaved] = useState(false);
  const [notificationDeleted, setNotificationDeleted] = useState(false);

  //save new to personals news
  function save(author, description, publishedAt, source, title, url, urlToImage) {
    addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage);
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
    card.style.transform = `translate(${getRandomInt(-3, 3)}%, ${getRandomInt(0, 6)}%) rotate(${getRandomInt(-4, 4)}deg)`;  
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
                        swipeRight={{
                          action: () => {
                            save(singleNews.author, singleNews.description, singleNews.publishedAt, singleNews.source, singleNews.title, singleNews.url, singleNews.urlToImage);
                            showSaved();
                          }
                        }}
                        //onSwipeProgress={progress => console.info(`Swipe progress: ${progress}%`)}
                      >
                        <div className="news-image pos-rel br-10">
                          <img className="img-cover" src={singleNews.urlToImage} alt="news img"/>
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
        : 'undefined'
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

      </div>
    </>
  ); 
}

export default NewsPage;