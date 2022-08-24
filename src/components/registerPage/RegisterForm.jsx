import React, {useState} from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { __userRegister } from '../../redux/modules/userSlice';


const Registerform = () => {
    const dispatch = useDispatch();
    const [input, setInput] = useState({email:"",nickname:"",password:"",passwordCheck:""});

    const onClickHandler = () => {
        console.log(input);
        setInput({
            email: input.email, //input.email이란 key값의 value
            nickname: input.nickname,
            password:input.password,
            passwordCheck:input.passwordCheck,
        }) 
        console.log("1111",input);

        //회원가입 버튼을 누르면 서버로 보내기
        dispatch(
            __userRegister(
                {
                email: input.email, 
                nickname: input.nickname,
                password:input.password,
                passwordCheck:input.passwordCheck,
                }
            )
        )
    }
        
    const onChanegeHandler = (event) => {
        const { name, value } = event.target;
        setInput({...input, [name]: value});//[]이건 그냥 이렇게 적는거야
        
        // console.log("3333",input);
    }
        // console.log("4444",input);//이거 비동기!!!함수 끝에서 콘솔에 찍히고 3333은 함수 내부라 아직 안찍힘



    return (
        <RegisterLayout>
            <div>
                <h1>회원가입</h1>
                <div> {/**form => seo 용으로 form이 필요할수도...?! */}
                    <div>
                        <input placeholder="  Email"
                            type="text"
                            id="email"//직접접근하기위한 id
                            name="email"//axios통신용
                            value={input.email}
                            onChange={onChanegeHandler}
                        ></input>
                        <input placeholder="  PASSWORD"
                            type="password"
                            id="password"
                            name="password"
                            value={input.password}
                            onChange={onChanegeHandler}
                        ></input>
                        <input placeholder="  Re-PASSWORD"
                            type="password"
                            id="passwordCheck"
                            name="passwordCheck"
                            value={input.passwordCheck}
                            onChange={onChanegeHandler}
                        ></input>
                        <input placeholder="  NICKNAME"
                            type="text"
                            id="nickname"
                            name="nickname"
                            value={input.nickname}
                            onChange={onChanegeHandler}
                        ></input>
                    </div>
                    <button onClick={onClickHandler}>회원가입</button>
                </div>
            </div>
        </RegisterLayout>
    );
}

//useForm 쓰지말고 해보기...

export default Registerform;

const RegisterLayout = styled.div`
    display: flex;
    flex-direction: column;
    align-content: space-around;
    justify-content: center;
    flex-wrap: wrap;
    align-items: center;
    
    >div {
        display: flex;
        flex-direction: column;
        align-content: space-around;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }

    >div>h1 {
        font-size: large;
        color: gray;
    }

    >div>div>div {
        display: flex;
        flex-direction: column;
        align-content: space-around;
        justify-content: center;
        flex-wrap: nowrap;
        align-items: center;
    }

    >div>div>div>input {
        font-size: large;
        width: 350px;
        height: 50px;
        display: block;
        border: none;
        margin-top: 10px;
        margin-bottom: 5px;
        border-radius: 1px;
        box-shadow: 0px 0px 3px #ACADB1;
    }

    >div>div>button {
        font-size: large;
        color: #ACADB1;
        width: 354px;
        height: 50px;
        border: none;
        margin-top: 10px;
        cursor: pointer;
        box-shadow: -0.5px -0.5px 4px #ACADB1;
        &:hover{
            color: gray;
            box-shadow: 0px 0px 4px #646464;
        }
    }
`;