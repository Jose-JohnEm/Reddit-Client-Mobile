import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native'
import Profile from './Profile';
import SubReddit from './Subreddit';
import { useAuth, ProvideAuth } from "./Auth"
import { Button, Flex, Tabs, WhiteSpace, WingBlank } from '@ant-design/react-native';

const App = () => {
  return (
    <ProvideAuth>
      <WelcomePage />
    </ProvideAuth>
  )
}

const styles = StyleSheet.create(
  {
    tab:
    {
      alignItems: 'center',
      justifyContent: 'center',
      height: Dimensions.get('window').height,
      backgroundColor: '#fff',
    }
  }
)

const LoginPage = () => {
  const auth = useAuth()

  return (
    < View style={{ flexGrow: 1, justifyContent: 'center' }}>
      <Text style={{ textAlign: 'center' }}>
        Hello, you are not logged in. Please click the button bellow
      </Text>
      <WhiteSpace />
      <WingBlank>
        <Button type="primary" onPress={auth.authorizeAccount}>Log in with reddit</Button>
      </WingBlank>
    </View >
  )
}

const HomePage = () => {
  const tabs =
    [
      { title: 'Subreddit' },
      { title: 'Profile' },
      { title: 'Settings' }
    ]

  return (
    <View style={{ flex: 1 }}>
      <Tabs tabs={tabs}>
        <View style={styles.tab}>
          <Text>Subreddit</Text>
        </View>
        <View style={styles.tab}>
          <Text>Profile</Text>
        </View>
        <View style={styles.tab}>
          <Text>Settings</Text>
        </View>
      </Tabs>
    </View >
  )
}


const WelcomePage = () => {
  const auth = useAuth()

  if (!!auth.state.accessToken) {
    return <HomePage />
  } else {
    return <LoginPage />
  }
}

export default App;
