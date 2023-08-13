import { createSlice } from '@reduxjs/toolkit'
import { ApiClient } from '../../Services/axios';
const apiClientInstance = ApiClient.getInstance();

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    auth: false
  },
  reducers: {
    setAuth: (state,action:{payload:{newMode:boolean,token:string}}) => {
      const {newMode,token} = action.payload
      state.auth = newMode
      if(newMode){
        apiClientInstance.setToken(token)
        localStorage.setItem('token',token)
      }else{
        apiClientInstance.removeToken()
        localStorage.removeItem('token')
      }
    },
  }
})

// Action creators are generated for each case reducer function
export const { setAuth } = userSlice.actions

export default userSlice.reducer