import React, { useReducer, createContext, useContext } from 'react'

export const StoreContext = createContext()
StoreContext.displayName = 'StoreContext'

const initialState = {
  scroll: null,
  showPageMask: true,
  checkoutFormIsOpen: false,
  newsletterFormIsOpen: false,
  mobileNavIsOpen: false,
  fast: false,
  modelLoaded:
    typeof window === 'undefined' ? 0 : window.innerWidth >= 1240 ? 0 : 1,
  fontIsLoaded: false,
  pathname: typeof window === 'undefined' ? null : window.location.pathname,
  popstate: 0,
  cursor: 'preload',
  cursorCounter: [0, 0],
  header: 'dark',
}

function storeReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_PATHNAME': {
      return {
        ...state,
        pathname: action.pathname,
      }
    }

    case 'UPDATE_POP_STATE': {
      return {
        ...state,
        popstate: state.popstate + 1,
      }
    }

    case 'UPDATE_SCROLL': {
      return {
        ...state,
        scroll: action.scroll,
      }
    }

    case 'SHOW_PAGE_MASK': {
      return {
        ...state,
        showPageMask: true,
      }
    }
    case 'HIDE_PAGE_MASK': {
      return {
        ...state,
        showPageMask: false,
      }
    }

    case 'UPDATE_MODEL_LOADED': {
      return {
        ...state,
        modelLoaded: action.decimal,
      }
    }

    case 'LOAD_FONTS': {
      return {
        ...state,
        fontIsLoaded: true,
      }
    }

    case 'SHOW_CHECKOUT_FORM': {
      return {
        ...state,
        checkoutFormIsOpen: true,
      }
    }
    case 'HIDE_CHECKOUT_FORM': {
      return {
        ...state,
        checkoutFormIsOpen: false,
      }
    }

    case 'SHOW_NEWSLETTER_FORM': {
      return {
        ...state,
        newsletterFormIsOpen: true,
      }
    }
    case 'HIDE_NEWSLETTER_FORM': {
      return {
        ...state,
        newsletterFormIsOpen: false,
      }
    }

    case 'SHOW_MOBILE_NAV': {
      return {
        ...state,
        mobileNavIsOpen: true,
      }
    }
    case 'HIDE_MOBILE_NAV': {
      return {
        ...state,
        mobileNavIsOpen: false,
      }
    }

    case 'SPEED_UP': {
      return {
        ...state,
        fast: true,
      }
    }
    case 'SLOW_DOWN': {
      return {
        ...state,
        fast: false,
      }
    }

    case 'SET_CURSOR': {
      return {
        ...state,
        cursor: action.cursor,
      }
    }

    case 'SET_CURSOR_COUNTER': {
      return {
        ...state,
        cursorCounter: action.cursorCounter,
      }
    }

    case 'SET_HEADER': {
      return {
        ...state,
        header: action.header,
      }
    }

    default:
      throw new Error('Bad action type')
  }
}

export const updatePathname = (dispatch, pathname) =>
  dispatch({ type: 'UPDATE_PATHNAME', pathname })
export const updatePopState = dispatch => dispatch({ type: 'UPDATE_POP_STATE' })
export const updateScroll = (dispatch, scroll) =>
  dispatch({ type: 'UPDATE_SCROLL', scroll })
export const showPageMask = dispatch => dispatch({ type: 'SHOW_PAGE_MASK' })
export const hidePageMask = dispatch => dispatch({ type: 'HIDE_PAGE_MASK' })
export const loadFonts = dispatch => dispatch({ type: 'LOAD_FONTS' })
export const updateModelLoaded = (dispatch, decimal) =>
  dispatch({ type: 'UPDATE_MODEL_LOADED', decimal })
export const showCheckoutForm = dispatch =>
  dispatch({ type: 'SHOW_CHECKOUT_FORM' })
export const hideCheckoutForm = dispatch =>
  dispatch({ type: 'HIDE_CHECKOUT_FORM' })
export const showNewsletterForm = dispatch =>
  dispatch({ type: 'SHOW_NEWSLETTER_FORM' })
export const hideNewsletterForm = dispatch =>
  dispatch({ type: 'HIDE_NEWSLETTER_FORM' })
export const showMobileNav = dispatch => dispatch({ type: 'SHOW_MOBILE_NAV' })
export const hideMobileNav = dispatch => dispatch({ type: 'HIDE_MOBILE_NAV' })
export const speedUp = dispatch => dispatch({ type: 'SPEED_UP' })
export const slowDown = dispatch => dispatch({ type: 'SLOW_DOWN' })
export const setCursor = (dispatch, cursor) =>
  dispatch({ type: 'SET_CURSOR', cursor })
export const setCursorCounter = (dispatch, cursorCounter) =>
  dispatch({ type: 'SET_CURSOR_COUNTER', cursorCounter })
export const setHeader = (dispatch, header) =>
  dispatch({ type: 'SET_HEADER', header })

function StoreProvider(props) {
  const [store, dispatch] = useReducer(storeReducer, initialState)
  const value = [store, dispatch]

  return <StoreContext.Provider value={value} {...props} />
}

export function useStore() {
  const context = useContext(StoreContext)

  if (!context) {
    throw new Error('useStore must be used within a StoreProvider')
  }

  return context
}

function Store(props) {
  return <StoreProvider>{props.children}</StoreProvider>
}

export default Store
