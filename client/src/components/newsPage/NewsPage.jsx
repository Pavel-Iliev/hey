import './style-newsPage.css';
import { SwipeableList, SwipeableListItem, ActionAnimations } from '@sandstreamdev/react-swipeable-list';
import '@sandstreamdev/react-swipeable-list/dist/styles.css';

function NewsPage(props) {
  const { newsForPage, addNewsToPersonal, deleteOneNews } = props;

  //save new to personals news
  function save(author, description, publishedAt, source, title, url, urlToImage) {
    addNewsToPersonal(author, description, publishedAt, source, title, url, urlToImage);
  }

  //test to delete method
  function deleteSelectedNews(id) {
    deleteOneNews(id);
  }

  console.log(newsForPage)

  return(
    <>
      <div className="news-page pos-rel">
        {
          newsForPage ? 
        <SwipeableList>
          {newsForPage.map(e => {
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
        : 'undefined'
        }
      </div>
    </>
  ); 
}

export default NewsPage;