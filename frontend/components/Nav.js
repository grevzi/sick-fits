import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import {useUser} from "./User";
import SignOut from "./SignOut";
import styled from "styled-components";
import {useCart} from "../lib/CartStateProvider";

const Button = styled.button`
  cursor: pointer;
`

const Nav = () => {
    const {user} = useUser()
    const {openCart} = useCart()
    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/account">Account</Link>
                    <Button type="button" onClick={openCart}>My Cart</Button>
                    <SignOut/>
                </>
            )}

            {!user && (
                <Link href="/signin">Sign In</Link>
            )}

        </NavStyles>
    )
}

export default Nav