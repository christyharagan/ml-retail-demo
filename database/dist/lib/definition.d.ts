import { ServerSpec, DatabaseSpec } from 'ml-admin';
import { Config } from 'ml-project';
export declare class RetailDemo {
    constructor(config: Config);
    config: Config;
    server: ServerSpec;
    contentDatabase: DatabaseSpec;
    triggersDatabase: DatabaseSpec;
    modulesDatabase: DatabaseSpec;
    schemaDatabase: DatabaseSpec;
    customerRuleSet(): string;
}
