import './style-loadingPage.css';

function LoadingPage() {
  return(
    <>
      <div className="loading-page height-page">
        <div className="loading-page__logo">
          <img className="loading-page__logo--img" src="/images/logo-1.svg" alt="EHY News! Logo" />
          <div className="loading-page__logo--text">
            <img src="/images/logo-2.svg" alt="EHY News! Logo" />
            <img src="/images/logo-3.svg" alt="EHY News! Logo" />
            <img src="/images/logo-4.svg" alt="EHY News! Logo" />
          </div>
        </div>
      </div>
    </>
  ); 
}

export default LoadingPage;