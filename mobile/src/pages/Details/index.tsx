import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView, Text, StyleSheet, Alert, ToastAndroid} from 'react-native';
import {TextInput, TouchableOpacity} from 'react-native-gesture-handler';

import {useNavigation, useRoute} from '@react-navigation/native';

import {Api} from '../../Configs/Api';
import LoadingCard from '../../Components/Loading';
import useAuthentication from '../../utils/Hooks/UseUser';

const Details: React.FC<any> = ({navigation}) => {
  const {params} = useRoute<any>();
  const {setOptions} = useNavigation();
  const {user} = useAuthentication();

  const [mode, setMode] = useState<'view' | 'edit' | 'create'>('view');
  const [loading, setLoading] = useState<boolean>(false);

  const [document, setDocument] = useState<string>('');
  const [companyName, setCompanyName] = useState<string>('');
  const [tradeName, setTradeName] = useState<string>('');
  const [zipCode, setZipCode] = useState<string>('');
  const [addressStreet, setAddressStreet] = useState<string>('');
  const [addressNumber, setAddressNumber] = useState<string>('');
  const [complement, setComplement] = useState<string>('');
  const [neighboorhood, setNeighboorhood] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [state, setState] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [status, setStatus] = useState<string>('true');

  const handleSearch = useCallback(() => {
    Api.get(`establishments/${params?.establishmentId}`).then(({data}) => {
      setDocument(data?.document);
      setCompanyName(data?.companyName);
      setTradeName(data?.tradeName);
      setZipCode(data?.zipCode);
      setAddressStreet(data?.addressStreet);
      setAddressNumber(data?.addressNumber);
      setComplement(data?.complement);
      setNeighboorhood(data?.neighboorhood);
      setCity(data?.city);
      setState(data?.state);
      setPhoneNumber(data?.phoneNumber);
      setEmail(data?.email);
      setStatus(data?.status);
      setOptions({
        title: data?.companyName,
      });
      setLoading(false);
    });
  }, [params, setOptions]);

  useEffect(() => {
    if (params?.establishmentId) {
      setLoading(true);
      handleSearch();
    } else {
      setMode('create');
    }
  }, [params, setOptions, handleSearch]);

  const onDelete = () => {
    Alert.alert(
      'Tem certeza ?',
      'Esta ação não poderá ser desfeita!',
      [
        {
          text: 'Cancelar',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'Excluir',
          onPress: () => {
            Api.delete(`establishments/${params?.establishmentId}`).then(() => {
              navigation.pop();
              ToastAndroid.show(
                'Estabelecimento excluído com sucesso!',
                ToastAndroid.SHORT,
              );
            });
          },
        },
      ],
      {cancelable: false},
    );
  };

  const onSave = () => {
    const data = {
      document: document,
      companyName,
      tradeName,
      zipCode: zipCode,
      addressStreet,
      addressNumber,
      complement,
      neighboorhood,
      city,
      state,
      phoneNumber: phoneNumber,
      email,
      ownerUserId: user?.id,
      status: status === 'true' ? true : false,
    };

    if (params?.establishmentId && mode === 'edit') {
      Api.patch(`establishments/${params?.establishmentId}`, {
        id: params?.establishmentId,
        ...data,
      }).then(() => {
        ToastAndroid.show(
          'Estabelecimento atualizado com sucesso!',
          ToastAndroid.SHORT,
        );

        setMode('view');
        handleSearch();
      });
    } else if (mode === 'create') {
      Api.post('establishments', data).then(() => {
        ToastAndroid.show(
          'Estabelecimento criado com sucesso!',
          ToastAndroid.SHORT,
        );

        setMode('view');
        handleSearch();
      });
    }
  };

  return loading ? (
    <LoadingCard />
  ) : (
    <ScrollView style={styles.container}>
      <Text style={styles.text}> CNPJ </Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={document}
        onChangeText={(text) => setDocument(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Razão Social </Text>
      <TextInput
        style={styles.input}
        value={companyName}
        onChangeText={(text) => setCompanyName(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Nome Fantasia </Text>
      <TextInput
        style={styles.input}
        value={tradeName}
        onChangeText={(text) => setTradeName(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> CEP </Text>
      <TextInput
        style={styles.input}
        value={zipCode}
        onChangeText={(text) => setZipCode(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Logradouro </Text>
      <TextInput
        style={styles.input}
        value={addressStreet}
        onChangeText={(text) => setAddressStreet(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Número </Text>
      <TextInput
        style={styles.input}
        value={addressNumber}
        onChangeText={(text) => setAddressNumber(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Complemento </Text>
      <TextInput
        style={styles.input}
        value={complement}
        onChangeText={(text) => setComplement(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Bairro </Text>
      <TextInput
        style={styles.input}
        value={neighboorhood}
        onChangeText={(text) => setNeighboorhood(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Cidade </Text>
      <TextInput
        style={styles.input}
        value={city}
        onChangeText={(text) => setCity(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Estado </Text>
      <TextInput
        style={styles.input}
        value={state}
        onChangeText={(text) => setState(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Telefone </Text>
      <TextInput
        style={styles.input}
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}
        editable={mode !== 'view'}
      />

      <Text style={styles.text}> Email </Text>
      <TextInput
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={(text) => setEmail(text)}
        editable={mode !== 'view'}
      />

      {mode === 'view' ? (
        <>
          <TouchableOpacity
            onPress={() => setMode('edit')}
            style={styles.editButton}>
            <Text style={styles.buttonText}> Editar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => onDelete()}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}> Deletar </Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <TouchableOpacity onPress={() => onSave()} style={styles.saveButton}>
            <Text style={styles.buttonText}> Salvar </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setMode('view')}
            style={styles.deleteButton}>
            <Text style={styles.buttonText}> Cancelar </Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  text: {
    marginBottom: 15,
  },
  input: {
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  editButton: {
    marginBottom: 15,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEC730',
  },
  deleteButton: {
    marginBottom: 15,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#DF5957',
  },
  saveButton: {
    marginBottom: 15,
    height: 45,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#594ba1',
  },
  buttonText: {
    color: '#ffffff',
  },
});

export default Details;
