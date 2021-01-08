import axios from 'axios';
const BASE_URL_SERVER = 'http://localhost:3200/news/';

// api from server
export function getNewsServer() {
  return axios.get(BASE_URL_SERVER)
    .then(news => news.data);
}

export function postNewsPersonal(author, description, publishedAt, source, title, url, urlToImage) {
  const post = { author, description, publishedAt, source, title, url, urlToImage };
  return axios.post(BASE_URL_SERVER, post)
}

export function deleteNews(id) {
  return axios.delete(BASE_URL_SERVER + id)
}



//api from web
// export function getNews() {
//   return axios.get('http://newsapi.org/v2/everything?' +
//     'q=cornacchia&' +
//     'language=it&' +
//     'from=2020-12-26&' +
//     'sortBy=popularity&' +
//     'apiKey=797f19cbeedc498184dd394628e6bbd4')
//     .then(news => news.data);
// }


// export function getNewsCategory(country, category) {
//   return axios.get('http://newsapi.org/v2/top-headlines?' +
//     'country=' + country + '&' +
//     'category=' + category + '&' +
//     'apiKey=797f19cbeedc498184dd394628e6bbd4')
//     .then(news => news.data);
// }


// export function getRandomImage() {
//   return axios.get('https://api.unsplash.com/photos/random?query=news&client_id=af9jCeSxDOuXCcFhg4zd4pbsst1JPWwNX6SwY7J2-Xo')
//     .then(news => news.data);
// }


export function getWeather(lat, long) {
  return axios.get(`https://weather.api.here.com/weather/1.0/report.json?product=observation&latitude=${lat}&longitude=${long}&oneobservation=true&app_id=devportal-demo-20180625&app_code=9v2BkviRwi9Ot26kp2IysQ`)
}


