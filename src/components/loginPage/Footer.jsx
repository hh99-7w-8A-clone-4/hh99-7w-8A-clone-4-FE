import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';


const Footer = () => {

    const navigate = useNavigate();

    return (
        <>
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
