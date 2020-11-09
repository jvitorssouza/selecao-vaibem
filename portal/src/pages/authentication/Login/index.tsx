import React, { useState } from 'react';
import { Alert, Form } from 'react-bootstrap';
import { decode } from 'jsonwebtoken';

import { Api } from '~/configs/Api';
import useUser from '~/util/Hooks/UseUser';

import { Container, LoginContainer } from './styles';

import Logo from '~/assets/images/logo.png';
import LoginIllustration from '~/assets/images/login-illustration.svg';

import { Button } from '~/components/Button';

const Login: React.FC = () => {
    const { setUser } = useUser();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [showError, setShowError] = useState<Boolean>(false);
    const [errorMessage, setErrorMessage] = useState<String>('');

    const fnOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const { data } = await Api.post(`authentication/login`, {
                email,
                password,
            });

            if (data) {
                const payload: any = decode(data.token);

                const permissions = payload?.permissions.map(
                    (item: any) => item?.permission?.slug
                );

                setUser({
                    id: payload?.user?.id,
                    name: payload?.user?.name,
                    email: payload?.user?.email,
                    profileId: payload?.user?.profileId,
                    profile: {
                        id: payload?.user?.profile?.id,
                        name: payload?.user?.profile?.name,
                    },
                    token: data.token,
                    permissions,
                });
            }
        } catch (err) {
            const { message } = err.response.data;

            setErrorMessage(message);
            setShowError(true);
        }
    };

    return (
        <Container>
            <LoginContainer>
                <div className="left">
                    <img src={LoginIllustration} alt="logo" />
                </div>
                <div className="right">
                    <img src={Logo} alt="" />

                    <div className="login-texts">
                        <h3>Log in.</h3>

                        <span>
                            Autentique-se com suas credenciais para acessar o
                            sistema.
                        </span>
                    </div>

                    <div className="login-form">
                        <Form onSubmit={fnOnSubmit}>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    placeholder="exemplo@cartaovaibem.com.br"
                                    onChange={({ target }) =>
                                        setEmail(target.value)
                                    }
                                    value={email}
                                    required
                                />
                            </Form.Group>

                            <Form.Group>
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    type="password"
                                    placeholder="&#9679;&#9679;&#9679;&#9679;&#9679;&#9679;"
                                    onChange={({ target }) =>
                                        setPassword(target.value)
                                    }
                                    value={password}
                                    required
                                />
                            </Form.Group>

                            {showError && (
                                <Alert variant="danger">{errorMessage}</Alert>
                            )}

                            <Button color="primary" type="submit">
                                Entrar
                            </Button>
                        </Form>
                    </div>
                </div>
            </LoginContainer>
        </Container>
    );
};

export default Login;
