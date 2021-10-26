import React, { useState } from 'react';
import { View, Text } from 'react-native'
import { useAuth } from './Auth';

function fetchOAuth(url: string): Promise<Response> {
  const auth = useAuth()

  return fetch(
    url,
    {
      headers:
      {
        "Authorization": 'bearer ' + auth.state.accessToken,
      }
    }
  )
}

const Profile = () => {
  const auth = useAuth()
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
    fetchOAuth('https://oauth.reddit.com/api/v1/me')
      .then(
        (response) => {
          response.json().then((parsed) => {
            setProfileData(
              {
                name: parsed.name,
                description: parsed.subreddit.public_description,
                pdp_uri: parsed.icon_img,
                nb_friends: parsed.num_friends,
                banner_uri: parsed.subreddit.banner_img,
                color: parsed.subreddit.icon_color
              }
            )
          }
          ).catch(
            (error) => console.log("Error : " + error)
          )
        }
      )
  }

  if (auth.state.accessToken) { getProfile() }

  return (
    <View>
      <Text>Name : {profileData.name}</Text>
      <Text>Desc : {profileData.description}</Text>
      <Text>{profileData.nb_friends} Friends</Text>
    </View>
  )
}

export default Profile;
