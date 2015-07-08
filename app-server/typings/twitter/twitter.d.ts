declare class Twitter {
  constructor(config:Twitter.Config)

  get(path:string, options:any, cb:(error:any, tweets:Twitter.Tweet[], response:any)=>void)
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
  }
}

declare module 'twitter' {
  export = Twitter
}
