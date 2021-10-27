import React, { useState } from 'react';
import { SafeAreaView, TextInput, View, StyleSheet, Text, Image } from 'react-native'
import { Button, SearchBar } from '@ant-design/react-native';
import fetchOAuth from './Fetchoauth';
import SubPost from './SubPost';

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

export type SRprops = {
  subredditName?: string
}

const SubReddit : React.FC<SRprops> = ({subredditName = ''}) => {
  const [postList, setPostList] = useState([])
  const [subreddit, setSubreddit] = useState(
    {
      name: '',
      title: '',
      description: '',
      icon_uri: '',
      bg_uri: '',
    }
  )

  // const [postData, setPostData] = useState({
  //   subreddit: '',
  //   author: '',
  //   title: '',
  //   score: 0,
  //   selftext: '',
  // })

  // const getSubPosts = () => {
  //     setPostData({
  //         subreddit: parsed.data.subreddit,
  //         author: parsed.data.author,
  //         title: parsed.data.title,
  //         selftext: parsed.data.selftext,
  //         score: parsed.data.score,
  //     })
  // }


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
        setSubreddit({
          name: json.data.display_name,
          title: json.data.title,
          description: json.data.public_description,
          icon_uri: json.data.community_icon,
          bg_uri: json.data.banner_background_image,
        })
      }).catch(error => console.error(error))
  }

  const RenderSubPosts = () => {
    return (
      <View>
        {postList.map(sPost => {
          return (
            <View>
              <SubPost key={sPost} parsed={sPost}/>
            </View>
          )
        })}
      </View>
    )

  }

  const RenderSubredditData = () => {
    if (subredditName) {
      return (
        <View>
          <Image source={{ uri: subreddit.bg_uri }} />
          <Text style={styles.baseText}>{subreddit.title}</Text>
          <Text style={styles.middleText}>{subreddit.name}</Text>
          <Text style={styles.comment}>{subreddit.description}</Text>
        </View>
      )
    } else {
      return <View/>
    }
  }

  if (subredditName)
    getSubredditData()
  getSubredditPosts()
  return (
    <View>
      <RenderSubredditData/>
      <RenderSubPosts />
    </View>
  )
}

export default SubReddit;
