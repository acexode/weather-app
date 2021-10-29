import React from 'react'

const Input = ({debouncedResults}) => {
    return (
        <div className="row">
            <div className="col-8">
            <input
                type="text"
                placeholder="city"
                className="form-control"
                onChange={debouncedResults}
        />
            </div>
        </div>
    )
}

export default Input
