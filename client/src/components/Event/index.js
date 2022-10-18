import React from 'react' 
import htmlToText from "html-to-formatted-text"
import { useLocation } from 'react-router-dom'

import styles from "./event.module.css"

import { AiOutlineDoubleRight } from "react-icons/ai"
import Card from "../Card"
import Button from "../Button"

import { userPic } from "../../assets"
import { truncate } from "../../utils"


const EventCard = props => {

    const location = useLocation()

    const { event } = props 

    return (
        <Card.Container>
            <Card.Head>
                {/* <Card.Image src={event.image || event.video} alt="crossImg" /> */}
            </Card.Head>
            <Card.Body>
            <div className={styles.author}>
                <img src={userPic} alt="crossImg" />
                <div>
                    <Card.SubHeading>{event.author && event.author.fullName}</Card.SubHeading>
                    <p> {String(new Date(event.createdAt)).slice(0, 15)}</p>
                </div>
            </div>
            <Card.Heading>{event.title}</Card.Heading>
            <Card.Paragraph>{truncate(htmlToText(event.content), 200)}&hellip; </Card.Paragraph>
            <Button type="link" variant="primary" href={`/event/${event._id}/?redirect=${location.pathname}`} block={true}>Read More<AiOutlineDoubleRight /></Button>
            </Card.Body>
            
        </Card.Container>
    )
}

export default EventCard