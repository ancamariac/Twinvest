import React from "react";
import TweetCard from "react-tweet-card";
const moment = require('moment');

function Tweet (tweetData) {
	return (
	<div style={{'marginTop':'15px', 'marginLeft':'auto', 'marginRight':'auto', 'width':'80%'}}>
		<TweetCard 
			author={{
			name: tweetData.name,
			username: tweetData.username,
			image:tweetData.profile_image,
			}}
			tweet={tweetData.tweet}
         time={moment(tweetData.date).format('h:mm A · MMM D, YYYY')}
			source={tweetData.source}
			permalink={tweetData.tweet_link}
			engagement={{
         replies: tweetData.reply_count,
			likes: tweetData.likes,
			retweets: tweetData.retweets,
			}}
		/>
	</div>
	);
}

export default Tweet;
