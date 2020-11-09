import React, {useState} from 'react';
import base64 from 'react-native-base64';
import {
  Button,
  View,
  StyleSheet,
  Image,
  Dimensions,
  ToastAndroid,
} from 'react-native';

import {AuthService} from '../../services';
import useAuthentication from '../../utils/Hooks/UseUser';
import AsyncStorage from '@react-native-community/async-storage';
import {Text} from 'react-native';
import {Api} from '../../Configs/Api';

import {Container, ContainerBottom, ContainerTop} from './styles';
import {TextInput} from 'react-native-gesture-handler';

import Logo from '../../assets/images/logo.png';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7059BC',
  },
  input: {
    padding: 10,
    backgroundColor: '#f5f5f5',
    marginBottom: 30,
  },
});

const SignIn: React.FC = () => {
  const {setUser, setLoading} = useAuthentication();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleSignIn = () => {
    AuthService.signIn(email, password)
      .then(async ({data}) => {
        const token = data?.token;

        if (token) {
          const splitedToken = token.split('.');

          const payload = JSON.parse(base64.decode(splitedToken[1].toString()));

          const permissions = payload?.permissions.map(
            (item: any) => item?.permission?.slug,
          );

          const loggedUser = {
            id: payload?.user?.id,
            name: payload?.user?.name,
            email: payload?.user?.email,
            profileId: payload?.user?.profileId,
            profile: {
              id: payload?.user?.profile?.id,
              name: payload?.user?.profile?.name,
            },
            token: {
              iat: payload.iat,
              exp: payload.exp,
              str: token,
            },
            permissions,
          };

          setLoading(false);

          AsyncStorage.setItem('@SVB:UserData', JSON.stringify(loggedUser));

          await new Promise((resolve) => setTimeout(resolve, 2000));

          setUser(loggedUser);

          Api.defaults.headers.Authorization = `Bearer ${token}`;
        }
      })
      .catch((error) => {
        ToastAndroid.show(error.response.data.message, ToastAndroid.SHORT);
      });
  };

  return (
    <Container style={styles.container}>
      <ContainerTop>
        <Image source={Logo} />
      </ContainerTop>

      <ContainerBottom>
        <Text> Email </Text>
        <TextInput
          keyboardType="email-address"
          style={styles.input}
          onChangeText={(text) => setEmail(text)}
        />

        <Text> Senha </Text>
        <TextInput
          textContentType="password"
          style={styles.input}
          onChangeText={(text) => setPassword(text)}
          secureTextEntry
        />

        <Button color="#7059BC" title="Entrar" onPress={handleSignIn} />
      </ContainerBottom>
    </Container>
  );
};

export default SignIn;
