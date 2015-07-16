import { TwitterService, Tweet } from 'ml-retail-demo-common';
export declare class TwitterServiceML implements TwitterService {
    getTweets(username: string, hashtag: string): Promise<Tweet[]>;
}
