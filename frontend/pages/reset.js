import React from "react";
import RequestReset from "../components/RequestReset";
import Reset from "../components/Reset";

const reset = ({query}) => {

    if (!query?.token) {
        return <div>
            <p>Sorry, you must supply a token</p>
            <RequestReset />
        </div>
    }
    return (
        <div>
            <p>Reset your password {query.token}</p>
            <Reset token={query.token} />
        </div>
    )
}

export default reset