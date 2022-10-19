import { useRef, useEffect } from 'react'

// importing css
import "./index.css"

const MessageBox = props => {
    const elMessageBox = useRef();

    useEffect(() => {
        window.scrollTo(0, elMessageBox.current.offsetTop)
    }, [props.children])
    
    return (
        <div ref={elMessageBox} className={`container alert alert-${props.variant || "info"}`} >
            {props.children}
        </div>
    )
}

export default MessageBox