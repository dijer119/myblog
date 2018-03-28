import { createAction, handleActions } from 'redux-actions';

import {Map, List, fromJS} from 'immutable';
import * as api from '../../lib/companyApi'
import {pender} from "redux-pender";


// action types
const INITIALIZE = 'stock/INITIALIZE'
const CHANGE_INPUT = 'stock/CHANGE_INPUT'
const WRITE_COMPANY = 'stock/WRITE_COMPANY'
const CHECK_COMPANY = 'socck/CHECK_COMPANY'
const LIST_COMPANY = 'stock/LIST_COMPANY'

// action creators
export const initialize = createAction(INITIALIZE)
export const changeInput = createAction(CHANGE_INPUT)
export const writeCompany  = createAction(WRITE_COMPANY, api.writeCompany)
export const checkCompany = createAction(CHECK_COMPANY)
export const listCompany = createAction(LIST_COMPANY, api.listCompany)

// initial state
const initialState = Map({
  code: '',
  type: 'KOSPI',//kospi, kodaq
  sortType: 'sigaTotal',
  searchKeyword: '',
  companyId: '',
  isExistCompany: false,
  companies: List()
});

// reducer
export default handleActions({
  [INITIALIZE]: (state, action) => initialState,
  [CHANGE_INPUT]: (state, action) => {
    const { name, value } = action.payload //object로 받아와야함.
    console.log(`name=>${name}, value=>${value}`)
    return state.set(name, value)
  },
  ...pender({
    type: WRITE_COMPANY,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data
      return state.set('code', '')
    }
  }),
  ...pender({
    type: CHECK_COMPANY,
    onSuccess: (state, action) => {
      const { _id } = action.payload.data
      return state.set('companyId', _id)
    }
  }),
  ...pender({
    type: LIST_COMPANY,
    onSuccess: (state, action) => {
      const { data: companies } = action.payload
      // console.log(companies)
      return state.set('companies', fromJS(companies))
    }
  })
}, initialState)