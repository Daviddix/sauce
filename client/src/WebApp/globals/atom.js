import { atom } from 'jotai'

//homepage atoms
export const disableInputAtom = atom(false)
export const openSidebarAtom = atom(false)
export const inputValueFromEditAtom = atom("")
export const gptToRefreshAtom = atom(0)
export const messagesAtom = atom([])
export const movieIdToAddToListAtom = atom(0)
export const moviesAtom = atom([])

//auth atoms
export const isSignedInAtom = atom(false)
export const userInfoAtom = atom({})

//movie details atoms
export const movieMatchPercentageAtom = atom(0)
export const mainLinkForMovieAtom = atom("")