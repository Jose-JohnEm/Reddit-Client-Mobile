import React, { useState } from 'react';
import { View, } from 'react-native'
import Profile from './Profile';
import { useAuth, ProvideAuth } from "./Auth"
import { Button, WhiteSpace, Flex } from '@ant-design/react-native';
import SubPost from './SubPost'
import { SearchBar } from '@ant-design/react-native';
import SubReddit from './Subreddit';

const App = () => {
  return (
    <ProvideAuth>
      <LoginPage />
    </ProvideAuth>
  )
}

const LoginPage = () => {
  const auth = useAuth()
  const [input, setInput] = useState("")
  const [search, setSearch] = useState("")

  const Display = () => {
    if (!!auth.state.accessToken) {
      return (
        <View>
          {/* <View>
            <Profile />
            <WhiteSpace />
          </View> */}
          <View>
            <SearchBar
              value={input}
              placeholder="Search for subreddit"
              onSubmit={
                () => {
                  setSearch(input)
                }
              }
              onChange={
                (input) => setInput(input)
              }
              onCancel={
                () => setInput("")
              }
              cancelText="X"
            />

            <SubReddit subredditName={search} />

            <Flex justify="center"><Button type="ghost" onPress={auth.revokeAccount}>Se déconnecter</Button></Flex>
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
