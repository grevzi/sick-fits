import SingIn from "../components/SingIn";
import SingUp from "../components/SingUp";
import styled from "styled-components";

const GridStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
`

const SignInPage = () => {
    return <GridStyles>
        <SingIn />
        <SingUp />
    </GridStyles>
}

export default SignInPage