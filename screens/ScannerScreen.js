import React, { useState, useEffect } from 'react';
import { AsyncStorage, Text, View, StyleSheet, Button } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ScannerScreen() {

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      //const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(true);
    })();
  }, []);

  const handleBarCodeScanned = async ({ type, data }) => {
    setScanned(true);
    let user = await AsyncStorage.getItem('USER')
    user = user != null ? JSON.parse(user) : null
    user['familyId'] = data
    AsyncStorage.setItem('USER', JSON.stringify(user)).then(() => {
      alert(`Bienvenue dans votre nouvelle famille ! Retournez sur la home pour voir leur liste !`);
    })
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {scanned && (
        <View>
          <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
        </View>
      )}
    </View>
  );
}