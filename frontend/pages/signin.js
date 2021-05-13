import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";
import styled from "styled-components";
import {useUser} from "../components/User";
import {useEffect} from "react";
import Router from "next/router";
import DisplayError from "../components/ErrorMessage";
import RequestReset from "../components/RequestReset";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const SignInPage = () => {

    const {user, loading} = useUser()

    useEffect(() => {
        if (user) {
            Router.push({
                pathname: `/`
            })
        }
    }, [user])

    return <GridStyles>
        <SignIn />
        <SignUp />
        <RequestReset />
    </GridStyles>
}

export default SignInPage