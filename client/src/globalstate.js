import React, { useState, createContext } from 'react'
import ProductAPI from './Api/ProductAPI'

export const GlobalState = createContext()

export const DataProvider = ({children})=>{

  const [token, setToken] = useState(false)

  const state = {
    token:  [token, setToken],
    ProductAPI:ProductAPI()
  }
  ProductAPI()
  return (
    <GlobalState.Provider value={state}>
      {children}
    </GlobalState.Provider>
  )
}

