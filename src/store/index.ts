import { configureStore, type Action, type ThunkAction } from '@reduxjs/toolkit'
import { userSlice } from './slice/userSlice'
import { balanceSlice } from './slice/balanceSlice'
import { serviceSlice } from './slice/serviceSlice'
import { bannerSlice } from './slice/bannerSlice'
import { transactionSlice } from './slice/transactionSlice'

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    balance: balanceSlice.reducer,
    service: serviceSlice.reducer,
    banner: bannerSlice.reducer,
    transaction: transactionSlice.reducer
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
