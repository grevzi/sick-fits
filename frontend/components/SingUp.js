import Form from "./styles/Form";
import useForm from "../lib/useForm";
import {gql} from "@apollo/client/core";
import {useMutation} from "@apollo/client";
import {CURRENT_USER_QUERY} from "./User";
import ErrorMessage from "./ErrorMessage";

const SIGNUP_MUTATION = gql`
    mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
        createUser(data: {email: $email, name: $name, password: $password}) {
            id
            email
            name
        }
    }
`

export default function SingUp() {
    const {inputs, handleChange, resetForm} = useForm({
        email   : '',
        name   : '',
        password: '',
    })

    const [signup, {data, error, loading}] = useMutation(SIGNUP_MUTATION, {
        variables     : inputs,
        // refetchQueries: [{query: CURRENT_USER_QUERY}]
    })

    const handleSubmit = async e => {
        e.preventDefault()
        await signup().catch(console.error)
        console.log(data, error);
        // resetForm()
    }

    return (
        <Form method="POST" onSubmit={handleSubmit}>
            <h2>Sign Up for an account</h2>
            <ErrorMessage error={error} />
            <fieldset>
                {data?.createUser && <p>Signed Up with {data?.createUser.email} - please go head and sign in</p>}
                <label htmlFor="name">
                    Your Name
                    <input
                        type="text"
                        name="name"
                        placeholder="Your name"
                        autoComplete="name"
                        value={inputs.name}
                        onChange={handleChange}
                    />
                </label>

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

                <button type="submit">Sign Up</button>
            </fieldset>

        </Form>
    )
}