import {TwitterService, Tweet} from 'ml-retail-demo-common'
import Twitter = require('twitter')

export class TwitterServiceImpl implements TwitterService {
  constructor(config:Twitter.Config) {
    this.config = config
    this.client = new Twitter(this.config)
  }
  private client:Twitter
  private config:Twitter.Config

  getTweets(username: string, hashtag: string): Promise<Tweet[]> {
    return new Promise(function(resolve, reject){
      this.client.get('search/tweets', {q: 'node.js'}, function(error, tweets, response){
        if (error) {
          reject(error)
        } else {
          resolve(tweets.map(function(tweet){
            return {
              message: tweet.text
            }
          }))
        }
      })
    })
  }
}
