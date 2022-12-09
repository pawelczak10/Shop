import { NextApiHandler } from "next";
import * as bcrypt from "bcrypt";
import { authorizedApolloClient } from "../../graphql/apolloClient";
import { CreateAccountDocument, CreateAccountMutation, CreateAccountMutationVariables } from "../../src/gql/graphql";
const SignHandler: NextApiHandler = async (req, res) => {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.hash(password, 12);
    console.log({ email, password });

    const user = authorizedApolloClient.mutate<CreateAccountMutation, CreateAccountMutationVariables>({
        mutation: CreateAccountDocument,
        variables: {
            email: email,
            password: passwordHash
        }
    })
    console.log(user)
    res.json({});
};

export default SignHandler;
