import { TwitterService, Tweet } from 'ml-retail-demo-common';
import Twitter = require('twitter');
export declare class TwitterServiceImpl implements TwitterService {
    constructor(config: Twitter.Config);
    private client;
    private config;
    getTweets(username: string, hashtag: string): Promise<Tweet[]>;
}
