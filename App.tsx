import React from 'react';
import { Button, View, StatusBar, StyleSheet, Text } from 'react-native'
import { useAuth, ProvideAuth, useProvideAuth } from "./Auth"
import Profile from './Profile';
import AppNavbar from './AppNavbar';
import SubReddit from './Subreddit';
import { NavigationContainer } from '@react-navigation/native';

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

  const connectUser = () => {

    if (!!auth.state.accessToken) {
      return(
        // <SubReddit/>
        <Profile/>
      )
    } else {
      return(
        <View>
          <View>
            <Text>Hello</Text>
          </View>
        </View>
      )
    }
  }

  const display = () => {
    if (!!auth.state.accessToken) {
      return (
        <View>
          <Button title='Revoke' onPress={auth.revokeAccount} />
          <AppNavbar />
        </View>
      )
    } else {
      return (
        <View>
          <Button title='Authorize' onPress={auth.authorizeAccount} />
        </View>
      )
    }
  }

  return (
    <NavigationContainer>
      <View style={styles.container}>
        {display()}
      </View>
    </NavigationContainer>
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
