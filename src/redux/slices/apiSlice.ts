import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState: ApiSlice = {
	isFetching: false,
	currentApi: null,
	error: false,
}

export const apiSlice = createSlice({
	name: 'api',
	initialState,
	reducers: {
		callApiStart: (state) => {
			state.isFetching = true
		},
		callApiSuccess: (state, action) => {
			state.isFetching = false
			state.currentApi = action.payload
			state.error = false
		},
		callApiFailed: (state, action) => {
			state.isFetching = false
			state.currentApi = action.payload
			state.error = true
		},
		callApiClear: (state) => {
			state.isFetching = false
			state.currentApi = null
			state.error = false
		},
	},
})

// Action creators are generated for each case reducer function
export const { callApiStart, callApiSuccess, callApiFailed, callApiClear } = apiSlice.actions

export const API = (state: RootState) => state.api

export default apiSlice.reducer
