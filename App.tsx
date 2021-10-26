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
          <Profile />
          <WhiteSpace />
          <Button type="primary" onPress={auth.revokeAccount}>Revoke</Button>
        </View>
      )
    } else {
      return (
        <View>
          <WhiteSpace />
          <Button type="primary" onPress={auth.authorizeAccount}>Authorize</Button>
        </View>
      )
    }
  }

  return (
    <View>
      <Flex justify="center"><Display /></Flex>
    </View >
  )
}

export default App;
