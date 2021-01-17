import './style-newsPage.css';
import { SwipeableList, SwipeableListItem } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';
import { InView } from 'react-intersection-observer';

function NewsPage(props) {
  const { newsForPage, addNewsToPersonal, deleteOneNews } = props;

  console.log(newsForPage)

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
    return Math.floor(Math.random() * (max - min)) + min; //Il max è escluso e il min è incluso
  }
  
  function addNewsAnimation(card) {
    card.style.transform = `translate(${getRandomInt(-3, 3)}%, ${getRandomInt(-4, 4)}%) rotate(${getRandomInt(-4, 4)}deg)`;  
    card.style.WebkitTransition = 'transform 1s';
    card.style.MozTransition = 'transform 1s';
  }

  function removeNewsAnimation(card) {
    card.style.transform = `translate(0,0) rotate(0}deg)`;  
    card.style.WebkitTransition = 'transform 0s';
    card.style.MozTransition = 'transform 0s';
  }

  return(
    <>
      <div className="news-page pos-rel">
        {
          newsForPage ? 
        <SwipeableList>
          {newsForPage.map(e => {
            return <InView 
                      className="news-card"
                      onChange={(inView, entry) => {
                      if(inView) {
                        console.log(entry)
                        addNewsAnimation(entry.target)
                        
                      } else {
                        removeNewsAnimation(entry.target)
                      }
                      }}
                      key={e._id}
                    >
                      <SwipeableListItem
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
                      >
                        
                          <p>{e.author}</p> 
                          <h2>Plain children are always rendered. Use onChange to monitor state.</h2>
                      </SwipeableListItem>
                    </InView>
          })}
        </SwipeableList>
        : 'undefined'
        }
      </div>
    </>
  ); 
}

export default NewsPage;