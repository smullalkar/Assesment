import React from 'react'

export default function Error({ error }) {
    return (
        <div>
            <h1>Error : {error.message}</h1>
        </div>
    )
}
