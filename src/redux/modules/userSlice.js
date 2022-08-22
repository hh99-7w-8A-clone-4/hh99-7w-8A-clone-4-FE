import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import axios from "axios";
//process.env.REACT_APP_BASE_URI
//'http://3.39.240.159/'
const URI = {
    BASE: 'http://3.39.240.159/',
};

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
//엑세스토큰 안에

export const __userLogin = createAsyncThunk(
    "/api/login",
    async(payload, thunkAPI) => {
        console.log("thunk 들어왔다!",payload);
        try {
            const {email,password} = payload
            const response = await axios.post(`${URI.BASE}api/login`,
            { email,password }
            );
                const accessToken = response.headers.authorization;
                const refreshtoken = response.headers[`refresh-token`];
                localStorage.setItem('isLogin', true);
                const encodeBody = accessToken.split(".")[1];
                const decodeBody = Buffer.from(encodeBody, "base64")
                    .toString("utf8")
                const jsonBody = JSON.parse(decodeBody);
                console.log(jsonBody);
                console.log("22222");
                console.log(encodeBody);
                console.log(decodeBody);
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
        catch(error){ console.log("33333");
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
            console.log("44444");
            state.success = action.payload;
            state.isLogin = true
        },
        [__userLogin.rejected]: (state, action) => {
            console.log("55555");
            state.isLogin = false;
            state.error = action.payload;
        }
    }

})

// export const { login, logout } = userSlice.actions;
export default userSlice.reducer;