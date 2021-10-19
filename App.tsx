/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useState, useEffect } from 'react';
import { Button, View, StatusBar, StyleSheet, Text } from 'react-native'
import { authorize, refresh, revoke } from 'react-native-app-auth';

const config =
{
  redirectUrl: 'com.redditech.auth://oauth2redirect/reddit',
  clientId: 'J3wD24v0xSwSgWHTPsYMFg',
  clientSecret: '', // empty string - needed for iOS
  scopes: ['identity'],
  duration: "permanent",
  serviceConfiguration: {
    authorizationEndpoint: 'https://www.reddit.com/api/v1/authorize.compact',
    tokenEndpoint: 'https://www.reddit.com/api/v1/access_token',
    revocationEndpoint: 'https://www.reddit.com/api/v1/revoke_token'
  },
  customHeaders: {
    token: {
      // Authorization: Buffer.from('J3wD24v0xSwSgWHTPsYMFg').toString('base64'),
      Authorization: 'Basic <base64encoded clientID:>',
    },
  },
};

const App = () => {
  const [authState, setAuthState] = useState(
    {
      hasLoggedInOnce: false,
      accessToken: '',
      accessTokenExpirationDate: '',
      refreshToken: '',
    }
  )

  const authorizeAccount = () => {
    authorize(config).then(
      (newAuthState) => {
        setAuthState(
          {
            hasLoggedInOnce: true,
            accessToken: newAuthState.accessToken,
            accessTokenExpirationDate: newAuthState.accessTokenExpirationDate,
            refreshToken: newAuthState.refreshToken,
          }
        )
        console.log(newAuthState)
      },
      (message) => {
        console.log('User refused to log in :', message)
      }
    ).catch(
      (error) => {
        console.log('Failed to log in :', error.message)
      }
    )
  }
  const refreshAccount = () => {
    if (!authState.refreshToken) { return }
    refresh(config, { refreshToken: authState.refreshToken }).then(
      (newAuthState) => {
        setAuthState(
          {
            hasLoggedInOnce: authState.hasLoggedInOnce,
            accessToken: newAuthState.accessToken || authState.accessToken,
            accessTokenExpirationDate: newAuthState.accessTokenExpirationDate || authState.accessTokenExpirationDate,
            refreshToken: newAuthState.refreshToken || authState.refreshToken,
          }
        )
      },
      (message) => {
        console.log('User refused to refresh the token :', message)
      }
    ).catch(
      (error) => {
        console.log('Failed to refresh the token :', error)
      }
    )
  }
  const revokeAccount =
    () => {
      if (!authState.accessToken) { return }
      revoke(config, { tokenToRevoke: authState.accessToken, sendClientId: true }).then(
        () => {
          setAuthState(
            {
              hasLoggedInOnce: authState.hasLoggedInOnce,
              accessToken: '',
              accessTokenExpirationDate: '',
              refreshToken: '',
            }
          )
        },
        (message) => {
          console.log('User refused to revoke the token :', message)
        }
      ).catch(
        (error) => {
          console.log('Failed to revoked the token :', error)
        }
      )
    }

  return (
    <View style={styles.container}>
      {!!authState.accessToken ? (
        <Text>
          Access token : {authState.accessToken}{"\n"}
          Access token expiration date: {authState.accessTokenExpirationDate}{"\n"}
          Refresh token: {authState.refreshToken}{"\n"}
        </Text>
      ) : (
        <Text>{authState.hasLoggedInOnce ? "Goodbye" : "Hello"} </Text>
      )
      }
      {!authState.accessToken && <Button title="Authorize" onPress={authorizeAccount} />}
      {!!authState.refreshToken && <Button title="Refresh" onPress={refreshAccount} />}
      {!!authState.accessToken && <Button title="Revoke" onPress={revokeAccount} />}
    </View >
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
