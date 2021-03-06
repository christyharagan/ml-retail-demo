declare class Twitter {
  constructor(config:Twitter.Config)

  get(path:string, options:any, cb:(error:any, tweets:Twitter.Tweets, response:any)=>void)
}

declare module Twitter {
  export interface Config {
    consumer_key: string
    consumer_secret: string
    access_token_key: string
    access_token_secret: string
  }

  export interface Tweet {
    text: string
    id: string
  }

  export interface Tweets {
    statuses: Tweet[]
  }
}

declare module 'twitter' {
  export = Twitter
}
