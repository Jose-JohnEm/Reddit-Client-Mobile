import React, { useState, useEffect } from 'react';
import {SafeAreaView, TextInput, Button, View, StatusBar, StyleSheet, Text, Image } from 'react-native'

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

function fetchOAuth(url : string) : Promise<Response> {
    return fetch(url, {
            headers: {
                "Authorization": 'bearer ' + '808530141276-neWNwY5_XfgNF4HuwAB-jiPPSuh-zQ',
            }
        }
    )
}

const SubReddit : React.FC = () => {
    const [search, setSearch] = useState('')
    const [searching, setSearching] = useState(false)
    const [subreddit, setSubreddit] = useState(
        {
            name: '',
            title: '',
            description: '',
            icon_uri: '',
            bg_uri: '',
        }
    )


  function getSubreddit(name : string): void {
    fetchOAuth('https://oauth.reddit.com/r/' + name + '/about/.json?raw_json=1')
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

  function renderWithSubreddit() {
    if (searching)
        return (
            <View>
                <Image source={{uri: subreddit.bg_uri}} />
                <Text style={styles.baseText}>{subreddit.title}</Text>
                <Text style={styles.middleText}>{subreddit.name}</Text>
                <Text style={styles.comment}>{subreddit.description}</Text>
            </View>
        )
  }

  return (
    <View>
        <SafeAreaView>
            <TextInput
            style={styles.input}
            onChangeText={(text) => {setSearch(text); setSearching(false)}}
            value={search}
            />
            <Button
                title="Search"
                onPress={() => {getSubreddit(search); setSearching(true)}}
            />
        </SafeAreaView>
        {renderWithSubreddit()}
    </View>
  )
}

export default SubReddit;