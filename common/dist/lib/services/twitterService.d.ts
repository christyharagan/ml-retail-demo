import { Tweet } from '../models/twitter';
export interface TwitterService {
    getTweets(username: string, hashtag: string): Promise<Tweet[]>;
}
