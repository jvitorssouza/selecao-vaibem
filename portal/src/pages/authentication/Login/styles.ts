import styled from 'styled-components';

import BgLogin from '~/assets/images/bg-login.png';

export const Container = styled.div`
    background: #f5f5f5;
    height: 100vh;

    display: flex;
    justify-content: center;
    align-items: center;
`;

export const LoginContainer = styled.div`
    background: #ffffff;
    width: 80%;
    display: flex;
    flex-direction: column;
    border-radius: 2%;
    border: 1px solid #ddd;

    @media (min-width: 1281px) {
        flex-direction: row;
    }

    .left {
        flex: 1.1;
        display: flex;
        justify-content: center;
        align-items: center;
        background: url(${BgLogin}) no-repeat;
        border-radius: 2% 0 0 2%;

        @media (max-width: 1600px) {
            background-size: cover;
        }

        @media (min-width: 1601px) {
            background-size: cover;
        }

        img {
            width: 70%;
        }
    }

    .right {
        flex: 0.9;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        padding: 5% 10%;

        img {
            width: 50%;
        }

        .login-texts {
            margin: 2% 0;

            > span {
                font-weight: 300;
                color: #444444;
            }
        }

        .login-form {
            width: 100%;
            margin: 5% 0;

            .alert,
            .form-label,
            .form-control,
            .form-control::placeholder {
                font-weight: 300;
                font-size: 0.85rem;
            }
        }
    }
`;
