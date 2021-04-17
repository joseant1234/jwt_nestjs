import * as fs from 'fs';
import { parse } from 'dotenv';

export class ConfigService {
    private readonly envConfig: { [key: string]: string };

    constructor() {
        const isProductionEnv = process.env.ENVIRONMENT === 'production';

        if (isProductionEnv) {

            this.envConfig = {
                PORT: process.env.PORT as string,
                GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID as string,
                GOOGLE_SECRET: process.env.GOOGLE_SECRET as string,
                HOST: process.env.HOST as string,
            };

        } else {

            const envFilePath = __dirname + '/../../.env';
            const existPath = fs.existsSync(envFilePath);

            if (!existPath) {
                console.error('.env file does not exist'); // tslint:disable-line
                process.exit(0);
            }

            this.envConfig = parse(fs.readFileSync(envFilePath));

        }
    }

    get(key: string): string {
        return this.envConfig[key];
    }
}
