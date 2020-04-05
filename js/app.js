
const API_KEY='f27b4f80a5d6ee6f81016eb028d5d293';
const url='https://api.themoviedb.org/3/search/movie?api_key=f27b4f80a5d6ee6f81016eb028d5d293';
const IMAGE_URL='https://image.tmdb.org/t/p/w500';

const buttonElement = document.querySelector('#search');
const insideElement = document.querySelector('#exampleInputEmail1');
const movieSearchable = document.querySelector('#movies-searchable');


/*
        <div class="movie">
              <section class="section">
                  <img src="" alt="" data-movie-id="" />
              </section>
              <div class="content">
                <p id="content-close">X</p>
              </div>
        </div>
*/

function movieSection(movies)
{
    
        if(movies.poster_path)
        {
           return `<img src=${IMAGE_URL + movies.poster_path} data-movie-id=${movies.id} /> 
           <br id="title"><h1>Movie title- ${movies.title}</h1> 
           <br id="average"> <h1>Vote Average-${movies.vote_average}k</h1> 
           <br id="overview> <h1>Movie Overview-${movies.overview}</h1>
           <br id="release"> <h1>Movie Release Date-${movies.release_date}</h1>`;
        }
 
}

function createMovieContainer(movies)
{
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class','movie');

    const movieTemplate = `<section class="section">${movieSection(movies)}</section><div class="content"><p id="content-close">X</p></div>`;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovie(data)
{
            movieSearchable.innerHTML = '';
            const movies = data.results[0];
            console.log(data.results[0])
            const movieBlock = createMovieContainer(movies);
            movieSearchable.appendChild(movieBlock);
            console.log('Data: ',data);
}

buttonElement.onclick =function(event)
{
    event.preventDefault();
    const value = insideElement.value;
    const newurl = url + '&query=' + value;
    fetch(newurl)
        .then((res) => res.json())
        .then(renderSearchMovie)
        .catch((error) => {
            console.log('Error: ',error);
        });
        insideElement.value='';
        console.log('Value',value);

}