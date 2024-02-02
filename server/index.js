const express = require("express")
const app = express()
require("dotenv").config()
const cors = require("cors")
const PORT = process.env.PORT || 3000
const  OpenAI = require("openai")
const openAiApiKey = process.env.OPENAI
const tmdbApiKey = process.env.TMDB
const openai = new OpenAI({
    apiKey: openAiApiKey,
})
const cookieParser = require("cookie-parser")

//middlewares
app.use(express.json({limit: '50mb'}))
app.use(express.urlencoded({limit: '50mb'}))
app.use(cookieParser())
app.use(cors()) 


app.post("/", async (req, res)=>{
      const {movieDescription} = req.body
     const movieNames = await openai.chat.completions.create({
        model: "gpt-3.5-turbo-1106",
        messages: [
          {
            role: "system",
            content: `you will be given a movie description and your job is to return a JSON object containing the status of the request, the names, percentage match and year of release of 7 movies that match that description starting from the one that matches it the most to the one that matches it the least in this format :
            
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

      console.log(movieMatches)
  
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
})

app.listen(PORT, ()=>{
    console.log("i'm alive") 
})