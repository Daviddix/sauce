const { unknownError } = require("../actions/errorMessages")
const tmdbApiKey = process.env.TMDB
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai")

const apiKey = process.env.GEMINI_API_KEY
const genAI = new GoogleGenerativeAI(apiKey)

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  systemInstruction: `you are a bot that takes in descriptions of movies by humans and finds the movies that match those description and you will do this with pinpoint accuracy. you will be given a movie description and your job is to return a JSON object containing the status of the request, the names, percentage match and year of release of 7 movies that match that description starting from the one that matches it the most to the one that matches it the least in this format :     
   { status : //success if any movies were found or failure if no movies were found,
      data : [{movieName: //name of movie that matches,
       matchPercent: 90 //an integer representing the accuracy of the match,
        releaseYear : 2014 //year the movie was released }]
         //an array of 7 movies that matches the description      
        }`,
})

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 64,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

const safetySettings = [
  {
    category: HarmCategory.HARM_CATEGORY_HARASSMENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
  {
    category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
    threshold: HarmBlockThreshold.BLOCK_NONE,
  },
];

async function getMoviesThatMatchPrompt(req, res){
    try{
        const {movieDescription} = req.body
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [
          ],
        });
   const movieNames = await chatSession.sendMessage(movieDescription)

    const movieMatches = JSON.parse(movieNames.response.text()).data.map((match) => {
      const movieName = match.movieName;
      return { movieName, matchPercent: match.matchPercent};
    })

    const tmdbPromises = movieMatches.map(async (movieMatch) => {
      const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${tmdbApiKey}&query=${encodeURIComponent(movieMatch.movieName)}`);
      const tmdbData = await tmdbResponse.json();

      const movieInfo = tmdbData.results[0];
      if(movieInfo){
        return {
        movieName: movieInfo.title,
        matchPercent: movieMatch.matchPercent,
        movieId: movieInfo.id,
        movieReleaseDate: movieInfo.release_date,
        movieOverview: movieInfo.overview,
        movieRating : movieInfo.vote_average,
        moviePoster : movieInfo.poster_path
      } 
      }
      

    })

    const movieInfoArray = await Promise.all(tmdbPromises);
    const removedMoviesNotFoundArray= movieInfoArray.filter((movieFound)=> movieFound !== undefined)
    res.send(removedMoviesNotFoundArray)
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
        res.status(500).json(unknownError)
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
        res.status(500).json(unknownError)
      }
}

async function getImagesForSpecificMovie(req, res){
    try{
        const movieId = Number(req.params.movieId)
        const url = `https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const movieImages = await response.json()
        res.send(movieImages)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getRelatedMovies(req, res){
  try{
      const movieId = Number(req.params.movieId)
      const url = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?language=en-US&page=1&api_key=${tmdbApiKey}`;
      
      const response = await fetch(url)
    
      const {results} = await response.json()
      res.send(results.splice(0, 5))
    }
    catch(err){
      res.status(500).json(unknownError)
    }
}

async function getWatchProvidersForSpecificMovie(req, res){
  try{
    const movieId = Number(req.params.movieId)
    const url = `https://streaming-availability.p.rapidapi.com/shows/movie/${movieId}?series_granularity=show&output_language=en`;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '49e392e49dmsh7349412d909e6b5p1df9dcjsn3bc19068971a',
        'x-rapidapi-host': 'streaming-availability.p.rapidapi.com'
      }
    };

    const response = await fetch(url, options)
    const result = await response.text()
    const {streamingOptions} = await JSON.parse(result)
     

    res.send(streamingOptions)
  }
  catch(err){
    
    res.status(500).json(unknownError)
  }
}

module.exports = {getMoviesThatMatchPrompt, getInfoAboutSpecificMovie, getThrillerForSpecificMovie, getImagesForSpecificMovie, getRelatedMovies, getWatchProvidersForSpecificMovie}