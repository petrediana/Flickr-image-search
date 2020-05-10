import API_KEY from "../constants/config";

const API_URL =
  "https://api.flickr.com/services/rest/?method=flickr.photos.search&safe_search=1&format=json&nojsoncallback=1&" +
  "api_key=" +
  API_KEY +
  "&content_type=1&is_getty=1";

function getPictureSrcPath(pic) {
  const picSrcPath = `https://farm${pic.farm}.staticflickr.com/${pic.server}/${pic.id}_${pic.secret}.jpg`;
  return picSrcPath;
}

function getFetchPromise(userInput, sortBy = "relevance", pageNo = 1) {
  const url = `${API_URL}&text=${userInput}&per_page=${20}&page=${pageNo}&sort=${sortBy}`;
  const promise = new Promise((resolve) => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const pics = data.photos.photo.map((pic) => getPictureSrcPath(pic));
        resolve(pics);
      });
  });
  return promise;
}

export default getFetchPromise;
