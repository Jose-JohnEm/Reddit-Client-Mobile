import { Card, WhiteSpace, WingBlank } from "@ant-design/react-native"
import React, { useState } from "react"
import { StyleSheet, Text, View } from "react-native"
import fetchOAuth from "./Fetchoauth"

export type SPprops = {
    parsed: {data: any}
}

const styles = StyleSheet.create({
    bg: {
      backgroundColor: "white",
      borderRadius: 15,
      borderWidth: 2,
    }
});

const SubPost : React.FC<SPprops> = ({ parsed }) => {
    const [subredditPic, setSubredditPic] = useState()
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
                        title={parsed.data.title}
                        thumbStyle={{ width: 40, height: 40 }}
                        thumb={subredditPic}
                        extra={"r/" + parsed.data.subreddit}
                    />
                    <Card.Body>
                        <View style={{ height: 200 }}>
                        <Text style={{ marginLeft: 16, marginTop: 10, fontSize: 20 }}>{parsed.data.selftext}</Text>
                        </View>
                    </Card.Body>
                    <Card.Footer
                        content={"publié par " + parsed.data.author}
                        extra={"Score: " + parsed.data.score}
                    />
                </Card>
            </WingBlank>
            <WhiteSpace />
        </View>
    )

}

export default SubPost