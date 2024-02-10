import { atom } from 'jotai'

export const disableInputAtom = atom(false)
export const inputValueFromEditAtom = atom("")
export const gptToRefreshAtom = atom(0)
export const messagesAtom = atom([])
export const movieIdToAddToListAtom = atom(0)
export const moviesAtom = atom([])
export const isSignedInAtom = atom(false)
export const userInfoAtom = atom({})