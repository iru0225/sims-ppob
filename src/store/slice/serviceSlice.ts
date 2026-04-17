import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { get } from "../../utils/client-action"
import type { RootState } from ".."

interface ServiceState {
    services: {
        service_code: string
        service_name: string
        service_icon: string
        service_tariff: number
    }[]

}

const getServices = createAsyncThunk('/services', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await get('/services', {
        headers: {
            Authorization: `Bearer ${state.user.token}`
        }
    })

    return response.data
})

export const initialState: ServiceState = {
    services: []
}

export const serviceSlice = createSlice({
    name: 'service',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getServices.fulfilled, (state, action) => ({
            ...state,
            services: action.payload
        }))
    }
})

const { actions } = serviceSlice

export const serviceAction = {
    ...actions,
    getServices
}

export const serviceSelector = ({ service }: RootState) => service.services