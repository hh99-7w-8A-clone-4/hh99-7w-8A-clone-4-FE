import React from 'react';
import styled from 'styled-components';

const Registerform = () => {
    return (
        <RegisterLayout>
            <div>
                <h3>회원가입</h3>
                <div>
                    <div>
                        <label>Email</label>
                        <input></input>
                        <label>PASSWORD</label>
                        <input></input>
                        <label>Re-PASSWORD</label>
                        <input></input>
                        <label>NICKNAME</label>
                        <input></input>
                    </div>
                    <button>회원가입</button>
                </div>
                
            </div>
        </RegisterLayout>
    );
}

export default Registerform;

const RegisterLayout = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: aliceblue;
`;