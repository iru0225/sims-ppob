import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { get } from "../../utils/client-action"
import type { RootState } from ".."

interface BannerState {
    banners: {
        banner_name: string
        banner_image: string
        description: string
    }[]

}

const getBanner = createAsyncThunk('/banner', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await get('/banner', {
        headers: {
            Authorization: `Bearer ${state.user.token}`
        }
    })

    return response.data
})

export const initialState: BannerState = {
    banners: []
}

export const bannerSlice = createSlice({
    name: 'banner',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getBanner.fulfilled, (state, action) => ({
            ...state,
            banners: action.payload
        }))
    }
})

const { actions } = bannerSlice

export const bannerAction = {
    ...actions,
    getBanner
}

export const bannerSelector = ({ banner }: RootState) => banner.banners