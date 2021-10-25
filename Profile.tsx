import React, { useState, useEffect } from 'react';
import {SafeAreaView, TextInput, Button, View, StatusBar, StyleSheet, Text, Image } from 'react-native'

function fetchOAuth(url : string) : Promise<Response> {
    return fetch(url, {
            headers: {
                "Authorization": 'bearer ' + '808530141276-neWNwY5_XfgNF4HuwAB-jiPPSuh-zQ',
            }
        }
    )
}

const Profile : React.FC = () => {
    const [profileData, setProfileData] = useState(
        {
            name: '',
            description: '',
            pdp_uri: '',
            nb_friends: 0,
            banner_uri: '',
            color: ''
        }
    )

    function getProfile() {
        fetchOAuth('https://oauth.reddit.com/api/v1/me/')
        .then(response => response.json())
        .then((json) => {
            setProfileData(
                {
                    name: json.name,
                    description: json.subreddit.public_description,
                    pdp_uri: json.icon_img,
                    nb_friends: json.num_friends,
                    banner_uri: json.subreddit.banner_img,
                    color: json.subreddit.icon_color
                }
            )
        })
    }

    return(
        <View>
            <Text>{profileData.name}</Text>
            <Text>{profileData.description}</Text>
            <Text>{profileData.nb_friends} Friends</Text>
        </View>
    )
}

export default Profile;