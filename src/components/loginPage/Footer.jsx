import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { REDIRECT_URI } from '../../redux/modules/userSlice';


const Footer = () => {
    const KAKO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=2b986d1b574416a7d6d064619545aaff&redirect_uri=http://thingkh-bk.shop/kakaoLogin&response_type=code`;
    const handleKakao = () =>{
        window.location.href = KAKO_AUTH_URL
    };

    const navigate = useNavigate();

    return (
        <>
            <StFooter
            onClick={handleKakao}>
                소셜로그인하기
            </StFooter>
            <StFooter
            onClick={ () => {
                navigate("/signup")
                }
            }>
                회원가입
            </StFooter>
        </>
    );
}

export default Footer;

const StFooter = styled.div`
    color: #afafaf;
    font-size: medium;
    margin: 100px 0 10px 0;
    cursor: pointer;
    &:hover{
        color: #797979;
    }
`; 
