import {TwitterService, Tweet} from 'ml-retail-demo-common'
import Twitter = require('twitter')
import {bind} from 'tschuss'

@bind()
export class TwitterServiceImpl implements TwitterService {
  constructor(config:Twitter.Config) {
    this.config = config
    this.client = new Twitter(this.config)
  }
  private client:Twitter
  private config:Twitter.Config

  getTweets(username: string, hashtag: string): Promise<Tweet[]> {
    let client = this.client
    return new Promise(function(resolve, reject){
      client.get('search/tweets', {q: `from:${username} #${hashtag}`}, function(error, tweets, response){
        if (error) {
          reject(error)
        } else {
          resolve(tweets.statuses.map(function(tweet){
            return {
              message: tweet.text,
              id: tweet.id
            }
          }))
        }
      })
    })
  }
}
