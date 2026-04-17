import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { RootState } from '..'
import { get, post, put } from '../../utils/client-action'

// Define a type for the slice state
interface UserState {
  token?: string
  profile?: {
    email: string
    first_name: string
    last_name: string
    profile_image: string
  }
  isFailed?: boolean
  message?: string
}

interface LoginPayload {
  email: string
  password: string
}

// Define the initial state using that type
const initialState: UserState = {
  token: localStorage.getItem('token') ?? undefined,
  profile: undefined
}

const login = createAsyncThunk<
  UserState,
  {
    payload: LoginPayload
  },
  { state: RootState }
>('/login', async ({ payload }) => {
  try {
    const response = await post<LoginPayload>('/login', payload)
    return {
      token: response.data.token,
      isFailed: false
    }
  } catch (error) {
    const errorData = error as {
      data: null
      message: string
      status: number
    }

    return {
      isFailed: true,
      message: errorData.message
    }
  }
})

const getProfile = createAsyncThunk('/profile', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const response = await get('/profile', {
    headers: {
      Authorization: `Bearer ${state.user.token}`
    }
  })
  return response.data
})

const updateProfileImage = createAsyncThunk('/profile/image', async (payload: FormData, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  try {
    const response = await put<FormData>('/profile/image', payload, state.user.token)
    return {
      profile: {
        ...state.user.profile!,
        profile_image: response.data.profile_image as string
      },
      message: response.message as string,
    }
  } catch (error) {
    const errorData = error as {
      data: null
      message: string
      status: number
    }

    return {
      isFailed: true,
      message: errorData.message
    }
  }
})

const updateProfile = createAsyncThunk('/profile/update', async (payload: { first_name: string, last_name: string }, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  try {
    const response = await put('/profile/update', payload, state.user.token)
    return {
      profile: {
        ...state.user.profile,
        ...response.data
      },
      message: response.message,
    }
  } catch (error) {
    const errorData = error as {
      data: null
      message: string
      status: number
    }

    return {
      isFailed: true,
      message: errorData.message
    }
  }
})


export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.isFailed = false
      state.message = undefined
    },
    logout: () => {
      localStorage.removeItem('token')
      return {
        ...initialState,
        token: undefined
      }
    }
  },
  extraReducers: builder => {
    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem('token', action.payload.token ?? '')
      return {
        ...state,
        ...action.payload,
      }
    })
    builder.addCase(getProfile.fulfilled, (state, action) => ({
      ...state,
      profile: action.payload
    }))
    builder.addCase(updateProfile.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
    builder.addCase(updateProfileImage.fulfilled, (state, action) => ({
      ...state,
      ...action.payload
    }))
  }
})

const {
  actions
} = userSlice

export const userAction = {
  ...actions,
  login,
  getProfile,
  updateProfile,
  updateProfileImage
}

export const accessTokenSelector = ({user}: RootState) => user.token
export const userProfileSelector = ({user}: RootState) => user.profile
export const isFetchFailedSelector = ({user}: RootState) => user.isFailed
export const messageSelector = ({user}: RootState) => user.message