import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native"
import React, { useState } from "react"
import { StyleSheet, Text, View, Image, ScrollView } from "react-native"
import VideoPlayer from "react-native-video-player"
import fetchOAuth from "./Fetchoauth"

export type SPprops = {
    parsed: any
}

const styles = StyleSheet.create({
    bg: {
      backgroundColor: "white",
      borderRadius: 15,
      borderWidth: 2,
    },
    title: {
        marginLeft: 15,
        marginRight: 20,
        marginTop: 5,
        paddingVertical: 1,
        color: "#20232a",
        textAlign: "left",
        fontSize: 20,
    }
});

const SubPost : React.FC<SPprops> = ({ parsed }) => {
    const [subredditPic, setSubredditPic] = useState('https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png')
    const [postPic, setPostPic] = useState({
        uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png',
        width: 10,
        height: 10,
    })
    const getSubredditPic = () => {
        fetchOAuth(`https://oauth.reddit.com/r/${parsed.data.subreddit}/about/`)
        .then((response) => response.json())
        .then(json => {
                setSubredditPic(json.data.icon_img)
                if (parsed.data.preview && parsed.data.preview.images && !parsed.data.is_video) {

                    setPostPic({
                        uri: parsed.data.url,
                        width: parsed.data.preview.images[0].resolutions[2].width,
                        height: parsed.data.preview.images[0].resolutions[2].height
                    })
                } else if (parsed.data.is_video) {
                    setPostPic({
                        uri: parsed.data.media.reddit_video.fallback_url,
                        width: parsed.data.media.reddit_video.width,
                        height: parsed.data.media.reddit_video.height
                    })
                }
            }
        )
    }

    const picOrVid = () => {
        if (parsed.data.is_video) {
            // return <VideoPlayer
            //     videoWidth={100}
            //     videoHeight={100}
            //     video={{uri: 'https://static.videezy.com/system/resources/previews/000/000/248/original/http-bing.mp4'}}
            //     autoplay={true}
            //     defaultMuted={true}
                // thumbnail={{uri: 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'}}
            //     />
            return (
                <ScrollView scrollEnabled={false} nestedScrollEnabled={false}>
                    <Text>ça marche pas lol</Text>
                    <VideoPlayer
                        videoWidth={postPic.width}
                        videoHeight={postPic.height}
                        video={{uri: postPic.uri}}
                        autoplay={false}
                        defaultMuted={true}
                        loop={true}
                        pauseOnPress={true}
                        hideControlsOnStart={true}
                    />
                </ScrollView>
            )
        } else {
            return <Image style={{width: postPic.width, height: postPic.height, marginLeft:27}} source={{ uri: postPic.uri}}/>
        }
    }

    getSubredditPic()
    return (
        <View>
            <WhiteSpace />
            <WhiteSpace />

            <WingBlank size="lg">
                <Card style={styles.bg}>
                    <Card.Header
                        title={"r/" + parsed.data.subreddit}
                        thumbStyle={{ width: 40, height: 40 }}
                        thumb={(subredditPic) ? subredditPic : 'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png'}
                    />
                    <Card.Body>
                        <View>
                            <Text style={styles.title}>{parsed.data.title}</Text>
                            <Text style={{ marginLeft: 16, marginTop: 10, fontSize: 16 }}>{parsed.data.selftext}</Text>
                            {picOrVid()}
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={"by " + parsed.data.author}
                        extra={"Score: " + parsed.data.score}
                    />
                </Card>
            </WingBlank>
            <WhiteSpace />
        </View>
    )

}

export default SubPost