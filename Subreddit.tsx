import React, { useState } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native'
import fetchOAuth from './Fetchoauth';
import SubPost from './SubPost';
import { Button, Flex, SearchBar,Tabs, WhiteSpace, WingBlank } from '@ant-design/react-native';

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


export const SubReddit = ({subredditName = ''}) => {
  const [postList, setPostList] = useState([])
  const [subreddit, setSubreddit] = useState(
    {
      name: '',
      title: '',
      description: '',
      icon_uri: '',
      bg_uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png',
    }
  )

  const getSubredditPosts = () => {
    const uri = (subredditName) ? `https://oauth.reddit.com/r/${subredditName}` : 'https://oauth.reddit.com'
    fetchOAuth(uri)
      .then(response => response.json())
      .then((json) => {
        setPostList(json.data.children)
      }).catch(error => console.error(error))
  }

  const getSubredditData = () => {
    fetchOAuth(`https://oauth.reddit.com/r/${subredditName}/about`)
      .then(response => response.json())
      .then((json) => {
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
      ).catch(error => console.error(error))
  }

  const RenderSubPosts = () => {
    if (!postList.length) {
      getSubredditPosts()
    }
    let i = 0;

    return (
      <View>
      {postList.map(
            sPost => {
              return (
                <SubPost key={i++} parsed={sPost}/>
              )
            }
          )}
      </View>
    )

  }

  const RenderSubredditData = () => {
    if (!postList.length) {
      getSubredditData()
    }

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
      {subredditName ? <RenderSubredditData /> : null}
      <RenderSubPosts />
    </View>
  )
}

export const SubRedditSearch = () => {
  const [input, setInput] = useState("")
  const [subreddit, setSubreddit] = useState("")

  return (
    <View>
      <SearchBar
      value={input}
      placeholder="Search for subreddit"
      onSubmit={
        () => setSubreddit(input)
      }
      onChange={
        (input) => setInput(input)
      }
      onCancel={
        () => setInput("")
      }
      cancelText="X"
      />
      {subreddit ? <SubReddit subredditName={subreddit}/> : null}
    </View>
  )
}
