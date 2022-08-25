import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
import { Buffer } from "buffer";
//process.env.REACT_APP_BASE_URI
//'http://3.39.240.159/'
const URI = {
    BASE: 'http://3.39.240.159',
};

export const REDIRECT_URI = 'http://3.39.240.159/user/kakao/callback'

const LOGIN = "user/LOGIN"
// const LOGOUT = "user/LOGOUT"

export function UserLogIn (user){
    console.log("UserLogIn");
    return {type: LOGIN, user}
}

// export function UserLogOut (user){
//     console.log("LOGOUT");
//     return {type: LOGOUT, user}
// }

const initialState = {
    isLogin: localStorage.getItem("AccessToken") ? true : false,
}

//회원가입
export const __userRegister = createAsyncThunk(
    "/api/signup",
    async(payload, thunkAPI) => {
        try {
            const response = await axios.post(`${URI.BASE}/api/signup`,{
                email: payload.email, 
                nickname: payload.nickname,
                password:payload.password,
                passwordCheck:payload.passwordCheck,
            });
            
            console.log(response);
            if(response.status === 200){
                alert('가입되었습니다 로그인하세요');
            }else if(response.status !== 200)
            alert('승인할 수 없는 계정입니다 다시 입력하세요');
            return thunkAPI.fulfillWithValue(response);
            
        } catch (error){ 
            return thunkAPI.rejectWithValue(error.status);
        }
    }
);




export const __userLogin = createAsyncThunk(
    "/api/login",
    async(payload, thunkAPI) => {
        console.log("thunk 들어왔다!",payload);
        try {
            const {email,password} = payload
            const response = await axios.post(
                `${URI.BASE}/api/login`, { email,password }
            );
                const accessToken = response.headers.authorization;
                const refreshtoken = response.headers[`refresh-token`];
                localStorage.setItem('isLogin', true);
                const encodeBody = accessToken.split(".")[1];
                const decodeBody = Buffer.from(encodeBody, "base64")
                    .toString("utf8")
                const jsonBody = JSON.parse(decodeBody);
                localStorage.setItem('userId',jsonBody.jti);
                localStorage.setItem('userName',jsonBody.sub);
                localStorage.setItem('accessToken',accessToken);
                localStorage.setItem('refreshtoken',refreshtoken);
                return thunkAPI.fulfillWithValue({
                    userId: decodeBody[3],
                    userName: decodeBody[7],
                    accessToken,
                    refreshtoken,
                })           
        }
        catch(error){
            return thunkAPI.rejectWithValue(error);
        }
    }
)


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers: {},
    extraReducers:{
        [__userLogin.fulfilled]: (state, action) => {
            state.success = action.payload;
            state.isLogin = true
        },
        [__userLogin.rejected]: (state, action) => {
            state.isLogin = false;
            state.error = action.payload;
        }
    }
})

export default userSlice.reducer;