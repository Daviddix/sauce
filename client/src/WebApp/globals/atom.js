import { atom } from 'jotai'

//homepage atoms
export const disableInputAtom = atom(false)
export const openSidebarAtom = atom(false)
export const inputValueFromEditAtom = atom("")
export const gptToRefreshAtom = atom(0)
export const messagesAtom = atom([])
export const movieIdToAddToListAtom = atom(0)
export const allMoviesAtom = atom([])
export const showLogoutModalAtom = atom(false)

//auth atoms
export const isSignedInAtom = atom(false)
export const userInfoAtom = atom({})
export const userInfoStatusAtom = atom("loading")
export const refreshUserDetailsAtom = atom(false)

//movie details atoms
export const movieMatchPercentageAtom = atom(0)
export const mainLinkForMovieAtom = atom("")

//anime details atom
export const animeMatchPercentageAtom = atom(0)
export const animeIdToAddToListAtom = atom(0)
export const allAnimeAtom = atom([])
export const mainLinkForAnimeAtom = atom("")


//tv show details atom
export const tvShowsMatchPercentageAtom = atom(0)
export const tvShowIdToAddToListAtom = atom(0)
export const allTvShowsAtom = atom([])
export const mainLinkForTvShowAtom = atom("")

//list atoms
export const activeListIdAtom = atom(0)
export const listIdToDeleteAtom = atom(0)
export const refreshListAtom = atom(0)
export const allAnimeListIdAtom = atom([])
export const allMoviesListIdAtom = atom([])
export const allTvShowsListIdAtom = atom([])

//category atoms
export const searchCategoryAtom = atom("Movies")
export const listCategoryToShowAtom = atom("Movies")
