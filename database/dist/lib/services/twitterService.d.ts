import { Observable } from 'uservices';
import { MLService } from 'ml-uservices';
export declare class TwitterService extends MLService {
    updateTweets(): Observable<boolean>;
}
