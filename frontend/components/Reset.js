import Form from "./styles/Form";
import useForm from "../lib/useForm";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "./User";
import ErrorMessage from "./ErrorMessage";

const RESET_MUTATION = gql`
    mutation RESET_MUTATION($email: String!, $password: String!, $token: String!) {
        redeemUserPasswordResetToken(email: $email, password: $password, token: $token) {
            code
            message
        }
    }
`

export default function Reset({token}) {
    const {inputs, handleChange, resetForm} = useForm({
        email   : '',
        password: '',
        token   : token
    })

    const [resetPassword, {data, error}] = useMutation(RESET_MUTATION, {
        variables: inputs,
        // refetchQueries: [{query: CURRENT_USER_QUERY}]
    })

    let errorMessage = error ? error : data?.redeemUserPasswordResetToken?.code ? data?.redeemUserPasswordResetToken : undefined

    const handleSubmit = async e => {
        e.preventDefault()
        await resetPassword().catch(console.error)
        resetForm()
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Reset Your Password</h2>
            <ErrorMessage error={errorMessage}/>
            <fieldset>
                {data?.redeemUserPasswordResetToken === null && <p>Success! You can now sign in.</p>}

                <label htmlFor="email">
                    Email
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email address"
                        autoComplete="email"
                        value={inputs.email}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="password">
                    Password
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password address"
                        autoComplete="email"
                        value={inputs.password}
                        onChange={handleChange}
                    />
                </label>

                <input type="hidden" value={inputs.token}/>

                <button type="submit">Request Reset</button>
            </fieldset>

        </Form>
    )
}