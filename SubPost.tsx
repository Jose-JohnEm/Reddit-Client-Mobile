import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native"
import React, { useState } from "react"
import { StyleSheet, Text, View, Image } from "react-native"
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
    const getSubredditPic = () => {
        fetchOAuth(`https://oauth.reddit.com/r/${parsed.data.subreddit}/about/`)
        .then((response) => response.json())
        .then(json => {
            setSubredditPic(json.data.icon_img)
        })
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
                        thumb={subredditPic}
                    />
                    <Card.Body>
                        <View>
                            <Text style={styles.title}>{parsed.data.title}</Text>
                            <Image source={{ uri: /*(parsed.data.url) ? parsed.data.url : */'https://www.elementaryos-fr.org/wp-content/uploads/2019/08/logo-reddit.png' }} />
                            <Text style={{ marginLeft: 16, marginTop: 10, fontSize: 16 }}>{parsed.data.selftext}</Text>
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