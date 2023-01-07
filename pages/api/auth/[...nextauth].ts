import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizedApolloClient } from "../../../graphql/apolloClient";
import {
    GetAccountByEmailDocument,
    GetAccountByEmailQuery,
    GetAccountByEmailQueryVariables,
} from "../../../src/gql/graphql";
import * as bcrypt from "bcrypt";
import Email from "next-auth/providers/email";

export const authOptions = {
    secret: process.env.NEXT_AUTH_SECRET,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                username: { label: "Email", type: "email", placeholder: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials, req) {
                if (!credentials) {
                    return null;
                }
                const userByEmail = await authorizedApolloClient.query<
                    GetAccountByEmailQuery,
                    GetAccountByEmailQueryVariables
                >({
                    query: GetAccountByEmailDocument,
                    variables: {
                        email: credentials.username,
                    },
                });
                console.log(userByEmail)
                if (!userByEmail.data.account?.password) {
                    return null;
                }
                const arePasswordEqual = await bcrypt.compare(
                    credentials.password,
                    userByEmail.data.account.password
                );
                if (!arePasswordEqual) {
                    return null;
                }

                return {
                    id: userByEmail.data.account.id,
                    email: userByEmail.data.account.email,

                };
            },
        }),
    ],
};

export default NextAuth(authOptions);
