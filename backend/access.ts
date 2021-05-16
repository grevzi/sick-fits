import {ListAccessArgs} from "./types";
import {permissionsList} from "./schemas/fields";

export function isSignedIn({session}: ListAccessArgs) {
    return !!session
}

const generatedPermissions = Object.fromEntries(permissionsList.map(permission => [
    permission,
    ({session}: ListAccessArgs) => !!session?.data.role?.[permission]
]))

export const permissions = {
    ...generatedPermissions,
    isAwesome({session}: ListAccessArgs) {
        return session?.data.name.includes('cool')
    }
}

//rules can return a bool or a filter with limits which products they can CRUD
export const rules = {
    canManageProducts({session}: ListAccessArgs) {
        if (!isSignedIn({session})) {
            return false
        }

        if (permissions.canManageProducts({session})) {
            return true
        }

        return {user: {id: session.itemId}}
    },
    canReadProducts({session}: ListAccessArgs) {
        if (!isSignedIn({session})) {
            return false
        }

        if (permissions.canManageProducts({session})) {
            return true
        }

        return {status: 'AVAILABLE'}
    },
    canOrder({session}: ListAccessArgs) {
        if (!isSignedIn({session})) {
            return false
        }

        if (permissions.canManageCart({session})) {
            return true
        }

        return {user: {id: session.itemId}}
    },
    canManageOrderItems({session}: ListAccessArgs) {
        if (!isSignedIn({session})) {
            return false
        }

        if (permissions.canManageCart({session})) {
            return true
        }

        return {order: {user: {id: session.itemId}}}
    },
    canManageUsers({session}: ListAccessArgs) {
        if (!isSignedIn({session})) {
            return false
        }

        if (permissions.canManageUsers({session})) {
            return true
        }

        return {id: session.itemId}
    },
}