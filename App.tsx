import React from 'react';
import { View, } from 'react-native'
import Profile from './Profile';
import SubReddit from './Subreddit';
import { useAuth, ProvideAuth } from "./Auth"
import { Button, WhiteSpace, Flex } from '@ant-design/react-native';

const App = () => {
  return (
    <ProvideAuth>
      <LoginPage />
    </ProvideAuth>
  )
}

const LoginPage = () => {
  const auth = useAuth()

  const Display = () => {
    if (!!auth.state.accessToken) {
      return (
        <View>
          <View>
            <Profile />
            <WhiteSpace />
          </View>
          <View>
          <Flex justify="center"><Button type="primary" onPress={auth.revokeAccount}>Disconnect</Button></Flex>
          </View>
        </View>
      )
    } else {
      return (
        <View>
          <WhiteSpace />
          <Flex justify="center"><Button type="primary" onPress={auth.authorizeAccount}>Connect</Button></Flex>
        </View>
      )
    }
  }

  return (
    <View>
      <Display />
    </View >
  )
}

export default App;
