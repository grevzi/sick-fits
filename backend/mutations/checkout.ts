import {KeystoneContext} from "@keystone-next/types";
import {CartItemCreateInput, OrderCreateInput} from "../.keystone/schema-types";
import stripeConfig from "../lib/stripe";

interface Arguments {
    token: string
}

async function checkout(root: any, {token}: Arguments, context: KeystoneContext): Promise<OrderCreateInput> {
    const userId = context.session.itemId;

    if (!userId) {
        throw new Error('You must be logged in to do this.')
    }

    const user = await context.lists.User.findOne({
        where: {id: userId},
        resolveFields: `
            id
            name
            email
            cart {
                id
                quantity
                product {
                    name
                    description
                    price
                    photo {
                        id
                        image {
                            id
                            publicUrlTransformed
                        }       
                    }       
                }
            }
        `
    })

    const cartItems = user.cart.filter(cartItem => cartItem.product)

    const amount = cartItems
        .reduce((rez: number, item: CartItemCreateInput) => rez += item.product.price * item.quantity, 0)


    const charge = await stripeConfig.paymentIntents.create({
        amount,
        currency: "USD",
        confirm: true,
        payment_method: token
    }).catch(error => {
        console.log(error);
        throw new Error(error.message)
    })

    const orderItems = cartItems.map(item => {
        return {
            name: item.product.name,
            description: item.product.description,
            price: item.product.price,
            quantity: item.quantity,
            photo: {connect: {id: item.product.photo.id}},
        }
    })

    const order = await context.lists.Order.createOne({
        data: {
            total: charge.amount,
            charge: charge.id,
            items: { create: orderItems},
            user: {connect: {id: userId}}
        }
    })

    const cartItemIds = user.cart.map(item => item.id)

    await context.lists.CartItem.deleteMany({
        ids: cartItemIds
    })

    return order
}

export default checkout