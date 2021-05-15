import Link from "next/link";
import NavStyles from "./styles/NavStyles";
import {useUser} from "./User";
import SignOut from "./SignOut";
import styled from "styled-components";
import {useCart} from "../lib/CartStateProvider";
import CartCount from "./CartCount";

const Button = styled.button`
  cursor: pointer;
`

const Nav = () => {
    const {user} = useUser()
    const {open, openCart} = useCart()

    return (
        <NavStyles>
            <Link href="/products">Products</Link>
            {user && (
                <>
                    <Link href="/sell">Sell</Link>
                    <Link href="/orders">Orders</Link>
                    <Link href="/account">Account</Link>
                    <Button
                        id="my-cart"
                        type="button"
                        onClick={openCart}
                        aria-expanded={open}
                        aria-controls='cart'
                    >
                        My Cart
                        <CartCount count={user.cart.reduce((rez, item) => {
                            rez + (item.product ? item.quantity : 0)
                        }, 0)} />
                    </Button>
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