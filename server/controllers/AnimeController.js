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
  systemInstruction: `you are a bot that takes in descriptions of anime by humans and finds the anime that match those description and you will do this with pinpoint accuracy. you will be given a anime description and your job is to return a JSON object containing the status of the request, the names, percentage match and year of release of 7 anime that match that description starting from the one that matches it the most to the one that matches it the least in this format :     
   { status : //success if any anime were found or failure if no anime were found,
      data : [{animeName: //name of anime that matches,
       matchPercent: 90 //an integer representing the accuracy of the match}] //an array of 7 anime that matches the description   
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

async function getAnimeThatMatchPrompt(req, res){
    try{
        const {animeDescription} = req.body
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [
          ],
        });
   const animeNames = await chatSession.sendMessage(animeDescription)

    const animeMatches = JSON.parse(animeNames.response.text()).data.map((match) => {
      return { animeName: match.animeName, matchPercent: match.matchPercent};
    })

    
    const tmdbPromises = animeMatches.map(async (animeMatch) => {
      const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&query=${encodeURIComponent(animeMatch.animeName)}`);
      const tmdbData = await tmdbResponse.json();
      
      
      const animeInfo = tmdbData.results[0];

      if (animeInfo) {
        return {
        animeName: animeInfo.name,
        matchPercent: animeMatch.matchPercent,
        animeId: animeInfo.id,
        animeReleaseDate: animeInfo.first_air_date,
        animeOverview: animeInfo.overview,
        animeRating : animeInfo.vote_average,
        animePoster : animeInfo.poster_path
      }
      }
    })

      const animeInfoArray = await Promise.all(tmdbPromises);
    const removedAnimeNotFoundArray= animeInfoArray.filter((animeFound)=> animeFound !== undefined)
    res.send(removedAnimeNotFoundArray) 
    }
    catch(err){
      
        res.status(500).json(unknownError)
    }
}

async function getInfoAboutSpecificAnime(req, res){
    try{
        const animeId = Number(req.params.animeId)
        const url = `https://api.themoviedb.org/3/tv/${animeId}?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url) 
      
        const animeData = await response.json()
        res.send(animeData)
      }
      catch(err){ 
        
        res.status(500).json(unknownError)
      }
}

async function getThrillerForSpecificAnime(req, res){
    try{
        const animeId = Number(req.params.animeId)
        const url = `https://api.themoviedb.org/3/tv/${animeId}/videos?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
        const animeThrillerData = await response.json()
        res.send(animeThrillerData)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getImagesForSpecificAnime(req, res){
    try{
        const animeId = Number(req.params.animeId)
        const url = `https://api.themoviedb.org/3/tv/${animeId}/images?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const animeImages = await response.json()
        res.send(animeImages)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getRelatedAnime(req, res){
  try{
      const animeId = Number(req.params.animeId)
      const url = `https://api.themoviedb.org/3/tv/${animeId}/recommendations?language=en-US&page=1&api_key=${tmdbApiKey}`;
      
      const response = await fetch(url)
    
      const {results} = await response.json()
      const filteredResults = results.filter((obj)=> obj.origin_country[0]== "JP" && obj.genre_ids.includes(16))
      res.send(filteredResults.splice(0, 5))
    }
    catch(err){
      res.status(500).json(unknownError)
    }
}

async function getWatchProvidersForSpecificAnime(req, res){
  try{
    const animeId = Number(req.params.animeId)
    const url = `https://streaming-availability.p.rapidapi.com/shows/tv/${animeId}?series_granularity=show&output_language=en`;

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


module.exports = {getAnimeThatMatchPrompt, getInfoAboutSpecificAnime, getThrillerForSpecificAnime, getImagesForSpecificAnime, getRelatedAnime, getWatchProvidersForSpecificAnime}