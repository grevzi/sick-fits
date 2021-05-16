import {list} from "@keystone-next/keystone/schema";
import {integer, password, relationship, select, text, virtual} from "@keystone-next/fields";
import formatMoney from "../lib/formatMoney";
import {isSignedIn, rules} from "../access";

export const Order = list({
    access: {
        create: isSignedIn,
        read: rules.canOrder,
        update: () => false,
        delete: () => false,
    },
    fields: {
        label: virtual({
            graphQLReturnType: "String",
            resolver: function (item) {
                return `${item.charge} - ${formatMoney(item.total)}`
            }
        }),
        total: integer({isRequired: true}),
        items: relationship({ref: "OrderItem.order", many: true}),
        user: relationship({ref: "User.orders"}),
        charge: text()
    },
    ui: {
        listView: {
            initialColumns: ['total', 'charge', 'user', 'items']
        }
    }
})