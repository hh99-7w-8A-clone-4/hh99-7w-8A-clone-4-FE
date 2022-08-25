import React,{ useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';
import { Buffer } from "buffer";
import axios from 'axios';

const Kakaologin = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];

    const IP = `http://3.39.240.159/user/kakao/callback?code=${KAKAO_CODE}`

    // useEffect(async () => {
    //     try {const response = await axios.get(IP)}
    //     catch (error){}

    //     // fetch(IP,
    //     // {method: 'GET',
    //     // })
    //     // .then (res => res.json())
    //     // .then (response => {console.log(response);
    //     //         const accessToken = response.headers.authorization;
    //     //         const refreshtoken = response.headers[`refresh-token`];
    //     //         localStorage.setItem('isLogin', true);
    //     //         const encodeBody = accessToken.split(".")[1];
    //     //         const decodeBody = Buffer.from(encodeBody, "base64")
    //     //             .toString("utf8")
    //     //         const jsonBody = JSON.parse(decodeBody);
    //     //         localStorage.setItem('userId',jsonBody.jti);
    //     //         localStorage.setItem('userName',jsonBody.sub);
    //     //         localStorage.setItem('accessToken',accessToken);
    //     //         localStorage.setItem('refreshtoken',refreshtoken);
    //     //     navigate('/');
    //     // });
    // }, []);

    async function kakaoLogin() {
        try {
        const response = await axios.get(IP);
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
            navigate('/');
        } catch (error) {
        console.log(error)
        }
        }
        useEffect(() => {
        kakaoLogin();
        }, []);
        

    return (
        <div>
            카카오
        </div>
    );
}

export default Kakaologin;
