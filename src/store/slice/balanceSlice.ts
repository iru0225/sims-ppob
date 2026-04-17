import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { get } from "../../utils/client-action"
import type { RootState } from ".."

interface BalanceState {
    balance: number
}

const getBalance = createAsyncThunk('/balance', async (_, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const response = await get('/balance', {
        headers: {
            Authorization: `Bearer ${state.user.token}`
        }
    })

    return response.data.balance
})

export const initialState: BalanceState = {
    balance: 0
}

export const balanceSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {
        setBallance: (state, action) => ({
            ...state,
            balance: action.payload
        })
    },
    extraReducers: builder => {
        builder.addCase(getBalance.fulfilled, (state, action) => ({
            ...state,
            balance: Number(action.payload)
        }))
    }
})

const { actions } = balanceSlice

export const balanceAction = {
    ...actions,
    getBalance
}

export const balanceSelector = ({ balance }: RootState) => balance.balance