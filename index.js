$(document).ready(() => {
  $('#searchForm').on('submit', e => {
    e.preventDefault();
    const searchText = $('#searchText').val();
    getMovies(searchText);
  });
});

const apikey = 'bd8684b';

function getMovies(searchText) {
  axios.get(`http://www.omdbapi.com/?apikey=${apikey}&s=${searchText}`)
  .then(res => {
    let movies = res.data.Search;
    let output = '';
    $.each(movies, (i, movie) => {
      output += `
        <div class='col-md-3  mb-4'>
          <div class='well text-center'>
            <img class='mb-2' src='${movie.Poster}'/>
            <h5>${movie.Title}</h5>
            <a href='#' class='btn btn-primary' onclick="checkMovie('${movie.imdbID}')">Movie Details</a>
          </div>  
        </div>
      `
    });
    $('#movies').html(output);
  })
  .catch(err => console.log(err));
}

function checkMovie(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie() {
  let movieId = sessionStorage.getItem('movieId');
  axios.get(`http://www.omdbapi.com/?apikey=${apikey}&i=${movieId}`)
  .then(res => {
    console.log(res.data);
    let movie = res.data;
    let output = `
      <div class='row'>
        <div class='col-md-4 mb-2'>
          <img src='${movie.Poster}' class='thumbnail'/>
        </div>
        <div class='col-md-8 mb-2'>
          <h2 class='text-center'>${movie.Title}</h2>
          <ul class='list-group mb-4'>
            <li class='list-group-item'><strong>Genre: </strong>${movie.Genre}</li>
            <li class='list-group-item'><strong>Released: </strong>${movie.Released}</li>
            <li class='list-group-item'><strong>Rated: </strong>${movie.Rated}</li>
            <li class='list-group-item'><strong>IMDB Rating: </strong>${movie.imdbRating}</li>
            <li class='list-group-item'><strong>Director: </strong>${movie.Director}</li>
            <li class='list-group-item'><strong>Writer: </strong>${movie.Writer}</li>
            <li class='list-group-item'><strong>Actors: </strong>${movie.Actors}</li>
            <li class='list-group-item'><strong>Plot: </strong>${movie.Plot}</li>
          </ul>
          <div class='row justify-content-center'>
            <a href='index.html' class='btn btn-info mr-4'>Go back to search</a>
            <a href='http://imdb.com/title/${movie.imdbID}' target='_blank' class='btn btn-primary ml-4'>Go to view IMDB</a>
          </div>
        </div>
      </div>
    `
    $('#movie').html(output);

  })
  .catch(err => console.log(err));
}
