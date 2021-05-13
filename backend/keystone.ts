import 'dotenv/config'
import {config, createSchema} from "@keystone-next/keystone/schema";
import {createAuth} from "@keystone-next/auth";
import {withItemData, statelessSessions} from "@keystone-next/keystone/session";
import {User} from "./schemas/User";
import {Product} from "./schemas/Product";
import {ProductImage} from "./schemas/ProductImage";
import {insertSeedData} from "./seed-data";
import {sendResetPasswordEmail} from "./lib/mail";

const databaseURL = process.env.DATABASE_URL || ''

const sessionConfig = {
    maxAge: 60 * 60 * 24 * 360,
    secret: process.env.COOKIE_SECRET
}

const {withAuth} = createAuth({
    listKey: 'User',
    identityField: 'email',
    secretField: 'password',
    initFirstItem: {
        fields: ['name', 'email', 'password'],
        //TODO add roles
    },
    passwordResetLink: {
        async sendToken(args) {
            console.log(args);
            await sendResetPasswordEmail(args.token, args.identity)
        }
    }
})

export default withAuth(config({
    server: {
        cors: {
            origin: [process.env.FRONTEND_URL],
            credentials: true
        }
    },
    db: {
        adapter: 'mongoose',
        url: databaseURL,
        async onConnect(keystone) {
            console.log('Connected to the database');
            if (process.argv.includes('--seed-data')) {
                await insertSeedData(keystone)
            }
        }
    },
    lists: createSchema({
        User,
        Product,
        ProductImage
    }),
    ui: {
        isAccessAllowed: ({session}) => {
            console.log(session);
            return !!session?.data
        }
    },
    session: withItemData(statelessSessions(sessionConfig), {
        User: 'id name email'
    })
}))