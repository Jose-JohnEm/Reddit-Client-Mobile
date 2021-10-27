import React, { useState } from 'react';
import { ScrollView ,View, Text, Dimensions, StyleSheet } from 'react-native'
import { Button, Flex, SearchBar,Tabs, WhiteSpace, WingBlank } from '@ant-design/react-native';
import { useAuth, ProvideAuth } from "./Auth"
import SubPost from './SubPost'
import {SubReddit, SubRedditSearch} from './Subreddit';
import Profile from './Profile';

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
  const auth = useAuth()
  const tabs =
    [
      {title:'Home'},
      { title: 'Search' },
      { title: 'Profile' },
      { title: 'Settings' }
    ]

  return (
    <View style={{ flex: 1 }}>
      <Tabs tabs={tabs}>
        <ScrollView>
          <SubReddit />
        </ScrollView>
        <ScrollView>
          <SubRedditSearch/>
        </ScrollView>
        <View>
          <Profile />
        </View>
        <View style={styles.tab}>
          <Button type="ghost" onPress={auth.revokeAccount}>Logout</Button>
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
