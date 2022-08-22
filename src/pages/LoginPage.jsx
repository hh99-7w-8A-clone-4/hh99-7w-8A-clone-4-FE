import React from 'react';
import { useSelector } from 'react-redux';
import Loginform from '../components/loginPage/LoginForm';


const Loginpage = () => {

    // const isLogin = useSelector((state) => state.user.isLogin);

    return (
        <div>
            <Loginform/>
        </div>
    );
}

export default Loginpage;