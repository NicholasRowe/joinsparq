import React, { useReducer, createContext } from 'react'

export const GlDomState = createContext()
export const GlDomDispatch = createContext()

const initialState = {
  handleImage: null,
  handleBlockColor: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_HANDLE_IMAGE': {
      return {
        ...state,
        handleImage: action.payload,
      }
    }

    case 'UPDATE_HANDLE_BLOCK_COLOR': {
      return {
        ...state,
        handleBlockColor: action.payload,
      }
    }

    default:
      throw new Error('Bad action type')
  }
}

const GlDom = props => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <GlDomState.Provider value={state}>
      <GlDomDispatch.Provider value={dispatch}>
        {props.children}
      </GlDomDispatch.Provider>
    </GlDomState.Provider>
  )
}

export default GlDom
