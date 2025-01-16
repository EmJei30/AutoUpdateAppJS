import React, { useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';
import * as Updates from 'expo-updates';

const App = () => {
  const checkForUpdates = async () => {
    try {
      const update = await Updates.checkForUpdateAsync();
      if (update.isAvailable) {
        Alert.alert(
          'Update Available',
          'A new update is available. Would you like to update now?',
          [
            {
              text: 'Later',
              style: 'cancel',
            },
            {
              text: 'Update',
              onPress: async () => {
                await Updates.fetchUpdateAsync();
                Updates.reloadAsync(); // Restart the app with the new update
              },
            },
          ]
        );
      }
    } catch (e) {
      console.error('Error checking for updates:', e);
    }
  };

  useEffect(() => {
    checkForUpdates();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Welcome to the Auto Update App!</Text>
      <Text style={{ marginTop: 20 }}>Push updates to GitHub to see changes here.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;
