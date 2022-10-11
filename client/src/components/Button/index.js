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
    } = props
  return (
    <>
      {
        type === "link" ?
        <Link 
          className={`btn btn-${variant }  ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
        >
            {children} 
        </Link>:
        <button 
          className={`btn btn-${variant }  ${block && `flex flex__center btn-block` }`} 
          to={href || "#"}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      }
    </>
  )
}

export default Button