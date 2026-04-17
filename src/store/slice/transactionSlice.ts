import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { get } from "../../utils/client-action"
import type { RootState } from ".."

interface TransactionState {
    transactions: {
        invoice_number: string
        transaction_type: string
        description: string
        total_amount: number
        created_on: string
    }[]
}

const getTransactionHistory = createAsyncThunk('/transaction/history', async (offset: number, thunkAPI) => {
    const state = thunkAPI.getState() as RootState
    const { transactions } = state.transaction
    const response = await get('/transaction/history', {
        headers: {
            Authorization: `Bearer ${state.user.token}`
        },
        params: {
            limit: 5,
            offset
        }
    })

    if (offset > 0) {
        return [
            ...transactions,
            ...response.data.records
        ]
    }

    return response.data.records
})

export const initialState: TransactionState = {
    transactions: []
}

export const transactionSlice = createSlice({
    name: 'balance',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(getTransactionHistory.fulfilled, (state, action) => ({
            ...state,
            transactions: action.payload
        }))
    }
})

const { actions } = transactionSlice

export const transactionActions = {
    ...actions,
    getTransactionHistory
}

export const transactionsSelector = ({transaction}: RootState) => transaction.transactions