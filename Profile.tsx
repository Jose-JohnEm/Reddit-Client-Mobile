import React, { useState } from 'react';
import { View, Text, Image } from 'react-native'
import { useAuth } from './Auth';
import { Card, WhiteSpace, WingBlank } from '@ant-design/react-native';

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
      pdp_uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png',
      nb_friends: 0,
      banner_uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png',
      color: '',
      coins: 0,
      karma: 0
    }
  )

  const getProfile = () => {
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
                banner_uri: parsed.subreddit.banner_img,//.split('?')[0],
                color: parsed.subreddit.icon_color,
                coins: parsed.coins,
                karma: parsed.total_karma
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
        <WingBlank size="lg">
            <Image source={{ uri: profileData.banner_uri }}/>
            <Card>
            <Card.Header
                title={profileData.name}
                thumbStyle={{ width: 70, height: 70 }}
                thumb={profileData.pdp_uri}
                extra={profileData.nb_friends + " amis"}
            />
            <Card.Body>
                <View style={{ height: 200 }}>
                <Text style={{ marginLeft: 16 }}>Description :</Text>
                <Text style={{ marginLeft: 16, marginTop: 10, fontSize: 20 }}>{profileData.description}</Text>
                </View>
            </Card.Body>
            <Card.Footer
                content={profileData.karma + " karmas"}
                extra={profileData.coins + " coins"}
            />
            </Card>
        </WingBlank>
    </View>
  )
}

export default Profile;
