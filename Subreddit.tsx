import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Image } from 'react-native'
import { Button, SearchBar } from '@ant-design/react-native';
import fetchOAuth from './Fetchoauth';

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
  const [input, setInput] = useState("")
  const [buttonClicked, setButtonClicked] = useState(false)
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
    fetchOAuth('https://oauth.reddit.com/r/' + input + '/about/.json?raw_json=1')
      .then(response => response.json())
      .then((json) => {
        setSubreddit({
          name: json.data.display_name,
          title: json.data.title,
          description: json.data.public_description,
          icon_uri: json.data.community_icon,
          bg_uri: json.data.banner_background_image,
        })
      }).catch(error => console.error(error))
  }

  const RenderWithSubreddit = () => {
    if (buttonClicked) {
      getSubreddit()
      return (
        <View>
          <Image source={{ uri: subreddit.bg_uri }} />
          <Text style={styles.baseText}>{subreddit.title}</Text>
          <Text style={styles.middleText}>{subreddit.name}</Text>
          <Text style={styles.comment}>{subreddit.description}</Text>
        </View>
      )
    } else
      return <View />
  }


  return (
    <View>
      <SearchBar
        value={input}
        placeholder="Search for subreddit"
        onSubmit={
          () => {
            setButtonClicked(true);
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
      <RenderWithSubreddit />
    </View>
  )
}

export default SubReddit;
