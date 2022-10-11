// importing css
import "./index.css"

const MessageBox = props => {
    return (
        <div className={`container alert alert-${props.variant || "info"}`} >
            {props.children}
        </div>
    )
}

export default MessageBox