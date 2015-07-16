import { TwitterService } from 'ml-retail-demo-common';
export declare class TwitterTask {
    private twitterService;
    constructor(twitterService?: TwitterService);
    fetchTweets(): void;
}
