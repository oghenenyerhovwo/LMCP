import React from 'react'
import { Link } from '../../../node_modules/react-router-dom/index'
import "./button.css"

const Button = props => {
    const {
        href,
        block,
        variant,
        children,
        type,
        disabled,
        onClick,
        error,
    } = props
  return (
    <>
      {
        type === "link" ?
        <Link 
          className={`btn btn-${variant } spacing-sm  ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
        >
            {children} 
        </Link>:
        <button 
          className={`btn btn-${variant } spacing-sm   ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      }
      {error && <p className="btn-error"><em>{"/* Make sure all required fields are filled */"}</em> </p>}

    </>
  )
}

export default Button