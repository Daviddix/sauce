const  OpenAI = require("openai")
const { unknownError } = require("../actions/errorMessages")
const openAiApiKey = process.env.OPENAI
const tmdbApiKey = process.env.TMDB
const openai = new OpenAI({
    apiKey: openAiApiKey,
})

async function getMoviesThatMatchPrompt(req, res){
    try{
        const {movieDescription} = req.body
   const movieNames = await openai.chat.completions.create({
      model: "gpt-3.5-turbo-1106",
      messages: [
        {
          role: "system",
          content: `you are a bot that takes in descriptions of movies by humans and finds the movies that match those description and you will do this with pinpoint accuracy. you will be given a movie description and your job is to return a JSON object containing the status of the request, the names, percentage match and year of release of 7 movies that match that description starting from the one that matches it the most to the one that matches it the least in this format :
          
          {
              status : //success if any movies were found or failure if no movies were found,
              data : [{
              movieName: //name of movie that matches,
              matchPercent: 90 //an integer representing the accuracy of the match,
              releaseYear : 2014 //year the movie was released
          }] //an array of 7 movies that matches the description
      }. `,
        },
        {
          role: "user",
          content: movieDescription,
        },
      ],
      temperature: 1,
      max_tokens: 900,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      response_format: { type: "json_object" }
    })

    const movieMatches = JSON.parse(movieNames.choices[0].message.content).data.map((match) => {
      const movieName = match.movieName;
      return { movieName, matchPercent: match.matchPercent};
    })

    const tmdbPromises = movieMatches.map(async (movieMatch) => {
      const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieMatch.movieName)}`);
      const tmdbData = await tmdbResponse.json();

      const movieInfo = tmdbData.results[0];
      return {
        movieName: movieInfo.title,
        matchPercent: movieMatch.matchPercent,
        movieId: movieInfo.id,
        movieReleaseDate: movieInfo.release_date,
        movieOverview: movieInfo.overview,
        movieRating : movieInfo.vote_average,
        moviePoster : movieInfo.poster_path
      };

    });

    const movieInfoArray = await Promise.all(tmdbPromises);
    res.send(movieInfoArray)
    }
    catch(err){
        res.status(500).json(unknownError)
    }
}

async function getInfoAboutSpecificMovie(req, res){
    try{
        const movieId = Number(req.params.movieId)
        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const movieData = await response.json()
        res.send(movieData)
      }
      catch(err){
        console.log(`an error ocurred it is :",${err}`)
      }
}

async function getThrillerForSpecificMovie(req, res){
    try{
        const movieId = Number(req.params.movieId)
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const movieThrillerData = await response.json()
        res.send(movieThrillerData)
      }
      catch(err){
        console.log(`an error ocurred it is :",${err}`)
      }
}

async function getImagesForSpecificMovie(req, res){
    try{
        const movieId = Number(req.params.movieId)
        const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const movieThrillerData = await response.json()
        res.send(movieThrillerData)
      }
      catch(err){
        console.log(`an error ocurred it is :",${err}`)
      }
}

module.exports = {getMoviesThatMatchPrompt, getInfoAboutSpecificMovie, getThrillerForSpecificMovie, getImagesForSpecificMovie}