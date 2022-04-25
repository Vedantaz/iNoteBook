import React from 'react'
export default function Alert(props) {
    const capitalize = (word) => {
        if (word === "danger") {
            word = 'error';
        }
    }

    console.log('message to alert', props);
    return (
        <div style={{ height: ' 50px' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
                {/* This happens because all the JSX will be converted to the Javascript calls  */}
                <strong>{props.alert.type}</strong> : {props.alert.msg}
                <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>}
        </div>
    )

}
// export default Alert