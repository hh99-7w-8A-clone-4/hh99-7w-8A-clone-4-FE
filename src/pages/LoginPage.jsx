import React from 'react';
import { useSelector } from 'react-redux';
import Loginform from '../components/loginPage/LoginForm';
import Footer from '../components/loginPage/Footer';
import styled from 'styled-components';



const Loginpage = () => {

    // const isLogin = useSelector((state) => state.user.isLogin);
    

    return (
        <LoginLayout>
            <Loginform/>
            <Footer/>
        </LoginLayout>
    );
}

export default Loginpage;

const LoginLayout = styled.div`
    background-color: #FFEB33;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: nowrap;
    align-items: center;

    >.Footer {
        margin: 100px;
    }
`;