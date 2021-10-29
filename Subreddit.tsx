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
  filterButton: {
    margin: 10,
    alignContent: 'space-between',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  }
});

const filterStyle = StyleSheet.create({
    filterButton: {
        margin: 10,
        alignContent: 'space-between',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    leftButton: {
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0,
    },
    midButton: {
        borderRadius: 0,

    },
    rightButton: {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    }
});

export const SubReddit = ({subredditName = ''}) => {
  const [hotpostList, setHotPostList] = useState([])
  const [newpostList, setNewPostList] = useState([])
  const [randompostList, setRandomPostList] = useState([])
  const [filterIdx, setFilterIdx] = useState(0)
  const [subreddit, setSubreddit] = useState(
    {
      name: '',
      title: '',
      description: '',
      icon_uri: '',
      bg_uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png',
    }
  )

  const primOrGhost = (filter : number) => {
    return (filter == filterIdx) ? 'primary' : 'ghost'
  }

  const FilterButtonGroup = () => {

      return (
          <View style={filterStyle.filterButton}>
              <Button type={primOrGhost(0)} style={filterStyle.leftButton} onPress={() => {setFilterIdx(0)}} >Hot</Button>
              <Button type={primOrGhost(1)} style={filterStyle.midButton} onPress={() => {setFilterIdx(1)}} >New</Button>
              <Button type={primOrGhost(2)} style={filterStyle.rightButton} onPress={() => {setFilterIdx(2)}} >Random</Button>
          </View>
      )
  }

  const getSubredditPosts = () => {
    let uri = (subredditName) ? `https://oauth.reddit.com/r/${subredditName}/hot` : 'https://oauth.reddit.com/hot'
    fetchOAuth(uri)
      .then(response => response.json())
      .then((json) => {
        setHotPostList(json.data.children)
      }).catch(error => console.error(error))

    uri = (subredditName) ? `https://oauth.reddit.com/r/${subredditName}/new` : 'https://oauth.reddit.com/new'
    fetchOAuth(uri)
      .then(response => response.json())
      .then((json) => {
        setNewPostList(json.data.children)
      }).catch(error => console.error(error))

    uri = (subredditName) ? `https://oauth.reddit.com/r/${subredditName}/random` : 'https://oauth.reddit.com/random'
    fetchOAuth(uri)
      .then(response => response.json())
      .then((json) => {
        setRandomPostList(json[0].data.children)
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
    if (!hotpostList.length) {
      getSubredditPosts()
    }
    let i = 0;

    return (
      <View>
      {hotpostList.map(
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
    if (!hotpostList.length) {
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
      <FilterButtonGroup />
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
