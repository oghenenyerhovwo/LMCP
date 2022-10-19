import React from 'react' 
import htmlToText from "html-to-formatted-text"
// import { useLocation } from 'react-router-dom'

import styles from "./event.module.css"

// import { AiOutlineDoubleRight } from "react-icons/ai"
// import Card from "../Card"
// import Button from "../Button"

// import { userPic } from "../../assets"
import { truncate } from "../../utils"


const EventCard = props => {

    // const location = useLocation()

    const { event } = props

    return (
        <div className={`spacing-md ${styles.event}`}>
            <div className={`${styles.event_date} flex flex__column flex__center`}>
                <h1> {String(new Date(event.createdAt)).slice(0, 4)}</h1>
                <h2>
                    <span>{String(new Date(event.createdAt)).slice(8, 11)}</span>
                    <span>{String(new Date(event.createdAt)).slice(4, 8)}</span>
                </h2>
            </div>
            <div className={`image ${styles.event_image}`}>
                <img src={event.images && event.images[0] && event.images[0].url}  alt="eventImg" />
            </div>
            <div className={`${styles.home_mission_activities_item_text} flex flex__column flex__center`}>
                <h2 className="spacing-sm">{event.title} </h2>
                <p className="">{truncate(htmlToText(event.text), 200)}&hellip;</p>
            </div>
        </div>
    )
}

export default EventCard