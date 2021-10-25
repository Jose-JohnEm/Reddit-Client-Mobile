import React from 'react';
import { Button, View, StatusBar, StyleSheet, Text } from 'react-native'
import { useAuth, ProvideAuth, useProvideAuth } from "./Auth"

const App = () => {
  return (
    <ProvideAuth>
      {
        loginPage()
      }
    </ProvideAuth>
  )
}

const loginPage = () => {
  const auth = useProvideAuth()

  return (
    <View style={styles.container}>
      {
        !!auth.state.accessToken ? (
          <Text>
            Access token : {auth.state.accessToken}{'\n'}
            Refresh token: {auth.state.refreshToken}{'\n'}
            Access token expiration date: {auth.state.accessTokenExpirationDate}{'\n'}
          </Text>
        ) : (
          <Text>{auth.state.hasLoggedInOnce ? 'Goodbye' : 'Hello'} </Text>
        )
      }
      {
        !auth.state.accessToken && <Button title='Authorize' onPress={auth.authorizeAccount} />
      }
      {
        !!auth.state.accessToken && <Button title='Revoke' onPress={auth.revokeAccount} />
      }
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});
