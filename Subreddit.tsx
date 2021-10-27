import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Image } from 'react-native'
import { useAuth } from './Auth';
import { Button, SearchBar } from '@ant-design/react-native';

const styles = StyleSheet.create({
  baseText: {
    fontWeight: 'bold',
    fontSize: 60,
  },
  middleText: {
    fontSize: 40,
  },
  comment: {
    fontSize: 20,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

const SubReddit = () => {
  const auth = useAuth()
  const [input, setInput] = useState("")
  const [subreddit, setSubreddit] = useState(
    {
      name: '',
      title: '',
      description: '',
      icon_uri: '',
      bg_uri: '',
    }
  )


  const getSubreddit = () => {
    fetch(
      'https://oauth.reddit.com/r/' + input + '/about/.json?raw_json=1',
      {
        headers: {
          "Authorization": 'bearer ' + auth.state.accessToken,
        }
      }
    ).then(
      response => response.json()
    ).then(
      (json) => {
        setSubreddit(
          {
            name: json.data.display_name,
            title: json.data.title,
            description: json.data.public_description,
            icon_uri: json.data.community_icon,
            bg_uri: json.data.banner_background_image,
          }
        )
      }
    ).catch(
      (error) => {
        console.log(error)
        setSubreddit(
          {
            name: '',
            title: '',
            description: '',
            icon_uri: '',
            bg_uri: '',
          }
        )
      }
    )
  }

  const RenderSubreddit = ({ subreddit }: { subreddit: any }) => {

    return (
      <View>
        <Image source={{ uri: subreddit.bg_uri }} />
        <Text style={styles.baseText}>{subreddit.title}</Text>
        <Text style={styles.middleText}>{subreddit.name}</Text>
        <Text style={styles.comment}>{subreddit.description}</Text>
      </View>
    )
  }

  return (
    <View>
      <SearchBar
        value={input}
        placeholder="Search for subreddit"
        onSubmit={
          () => getSubreddit()
        }
        onChange={
          (input) => setInput(input)
        }
        onCancel={
          () => setInput("")
        }
        cancelText="X"
      />
      {subreddit ? <RenderSubreddit subreddit={subreddit} /> : null}
    </View>
  )
}

export default SubReddit;
