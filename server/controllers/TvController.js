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
  systemInstruction: `you are a bot that takes in descriptions of tv shows by humans and finds the tv shows that match those description and you will do this with pinpoint accuracy. you will be given a tv shows description and your job is to return a JSON object containing the status of the request, the names, percentage match and year of release of 7 tv shows that match that description starting from the one that matches it the most to the one that matches it the least in this format :     
   { status : //success if any tv shows were found or failure if no tv shows were found,
      data : [{tvShowName: //name of tv Show that matches,
       matchPercent: 90 //an integer representing the accuracy of the match}] //an array of 7 tv shows that matches the description      
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

async function getTvShowsThatMatchPrompt(req, res){
    try{
        const {tvShowDescription} = req.body
        const chatSession = model.startChat({
          generationConfig,
          safetySettings,
          history: [
          ],
        });
   const tvShowNames = await chatSession.sendMessage(tvShowDescription)

    const tvShowMatches = JSON.parse(tvShowNames.response.text()).data.map((match) => {
      return { tvShowName: match.tvShowName, matchPercent: match.matchPercent};
    })

    const tmdbPromises = tvShowMatches.map(async (tvShowMatch) => {
      const tmdbResponse = await fetch(`https://api.themoviedb.org/3/search/tv?api_key=${tmdbApiKey}&query=${encodeURIComponent(tvShowMatch.tvShowName)}`);
      const tmdbData = await tmdbResponse.json();

      const tvShowInfo = tmdbData.results[0];
       
       if(tvShowInfo){
        return {
          tvShowName: tvShowInfo.name,
          matchPercent: tvShowMatch.matchPercent,
          tvShowId: tvShowInfo.id,
          tvShowReleaseDate: tvShowInfo.first_air_date,
          tvShowOverview: tvShowInfo.overview,
          tvShowRating : tvShowInfo.vote_average, 
          tvShowPoster : tvShowInfo.poster_path
        }
       } 

    })

    const tvShowInfoArray = await Promise.all(tmdbPromises);
    const removedTvShowsNotFoundArray= tvShowInfoArray.filter((tvShowFound)=> tvShowFound !== undefined)
    res.send(removedTvShowsNotFoundArray) 
    }
    catch(err){
      
        res.status(500).json(unknownError)
    }
}

async function getInfoAboutSpecificTvShow(req, res){
    try{
        const tvShowId = Number(req.params.tvShowId)
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const tvShowData = await response.json()
        res.send(tvShowData)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getThrillerForSpecificTvShow(req, res){
    try{
        const tvShowId = Number(req.params.tvShowId)
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}/videos?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
        const tvShowThrillerData = await response.json()
        res.send(tvShowThrillerData)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getImagesForSpecificTvShow(req, res){
    try{
        const tvShowId = Number(req.params.tvShowId)
        const url = `https://api.themoviedb.org/3/tv/${tvShowId}/images?api_key=${tmdbApiKey}`;
        
        const response = await fetch(url)
      
        const tvShowImages = await response.json()
        res.send(tvShowImages)
      }
      catch(err){
        res.status(500).json(unknownError)
      }
}

async function getRelatedTvShows(req, res){
  try{
      const tvShowId = Number(req.params.tvShowId)
      const url = `https://api.themoviedb.org/3/tv/${tvShowId}/recommendations?language=en-US&page=1&api_key=${tmdbApiKey}`;
      
      const response = await fetch(url)
    
      const {results} = await response.json()
      res.send(results.splice(0, 5))
    }
    catch(err){
      res.status(500).json(unknownError) 
    }
}

async function getWatchProvidersForSpecificTvShow(req, res){
  try{
    const tvShowId = Number(req.params.tvShowId)
    const url = `https://streaming-availability.p.rapidapi.com/shows/tv/${tvShowId}?series_granularity=show&output_language=en`;

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

module.exports = {getTvShowsThatMatchPrompt, getInfoAboutSpecificTvShow, getThrillerForSpecificTvShow, getImagesForSpecificTvShow, getRelatedTvShows, getWatchProvidersForSpecificTvShow} 