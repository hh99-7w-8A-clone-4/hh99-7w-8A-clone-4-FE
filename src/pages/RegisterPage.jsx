import React from 'react';
import Registerform from '../components/registerPage/RegisterForm';
import styled from 'styled-components';


const Registerpage = () => {
    return (
        <RegistLayout>
            <Registerform/>
        </RegistLayout>
    );
}

export default Registerpage;

const RegistLayout = styled.div`
    //드래그 막는 css 태그 4개
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    background-color: #FFEB33;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;
`;