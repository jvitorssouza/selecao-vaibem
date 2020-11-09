import React, {useCallback, useEffect, useState} from 'react';
import {Button, View, StyleSheet, Appearance, Text} from 'react-native';

import MapboxGL from '@react-native-mapbox-gl/maps';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';

import {Api} from '../../Configs/Api';
import AsyncStorage from '@react-native-community/async-storage';
import {useNavigation} from '@react-navigation/native';

const Home: React.FC = () => {
  const {navigate} = useNavigation();

  const [currentUserPosition, setCurrentUserPosition] = useState<number[]>([
    0,
    0,
  ]);

  const [establishments, setEstablishments] = useState<any[]>([]);

  const handleSearch = useCallback(() => {
    Api.get('establishments').then(({data}) => {
      setEstablishments(data);
    });
  }, []);

  useEffect(() => {
    MapboxGL.setAccessToken(
      'sk.eyJ1Ijoidml0b3Jzc291emFkZXYiLCJhIjoiY2toNmd3c3MzMGJ4MjJybnhsdWY0M2p0MiJ9.7TjE2UGWmK8tI0ed1wm3fQ',
    );

    MapboxGL.setConnected(true);

    Geolocation.setRNConfiguration({
      authorizationLevel: 'whenInUse',
      skipPermissionRequests: true,
    });

    Geolocation.getCurrentPosition((position: GeolocationResponse) => {
      setCurrentUserPosition([
        position.coords.longitude,
        position.coords.latitude,
      ]);
    });

    handleSearch();
  }, [handleSearch]);

  return (
    <>
      <MapboxGL.MapView
        style={styles.container}
        styleURL={
          Appearance.getColorScheme() === 'dark'
            ? MapboxGL.StyleURL.Dark
            : MapboxGL.StyleURL.Light
        }
        localizeLabels
        zoomEnabled
        compassEnabled={false}>
        <MapboxGL.Camera
          zoomLevel={15}
          centerCoordinate={currentUserPosition}
        />

        <MapboxGL.UserLocation androidRenderMode="gps" />

        {establishments.map((item: any) => (
          <MapboxGL.PointAnnotation
            id="Teste"
            key={item.id}
            coordinate={[item.long, item.lat]}
            onSelected={() =>
              navigate('Details', {
                establishmentId: item.id,
              })
            }>
            <View style={styles.annotationContainer}>
              <View style={styles.annotationFill}>
                <Text style={styles.annotationText}>{item.id}</Text>
              </View>
            </View>
          </MapboxGL.PointAnnotation>
        ))}
      </MapboxGL.MapView>

      <View style={styles.buttonContainer}>
        <View style={styles.bottomButton}>
          <Button
            color="#72e886"
            title="Atualizar"
            onPress={async () => handleSearch()}
          />
        </View>
        <View style={styles.bottomButton}>
          <Button
            color="#7059BC"
            title="Criar Novo"
            onPress={async () =>
              navigate('Details', {
                establishmentId: null,
              })
            }
          />
        </View>
        <View style={styles.bottomButton}>
          <Button
            title="logout"
            onPress={async () => AsyncStorage.clear().then(() => {})}
          />
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  annotationContainer: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 25,
    flex: 1,
  },
  annotationFill: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#7159C1',
    transform: [{scale: 0.8}],
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  annotationText: {
    color: '#fff',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  bottomButton: {
    flex: 1,
  },
});

export default Home;
