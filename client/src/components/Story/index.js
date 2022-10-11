import React from 'react' 
import htmlToText from "html-to-formatted-text"

import styles from "./story.module.css"

import { AiOutlineDoubleRight } from "react-icons/ai"
import Card from "../Card"
import Button from "../Button"

import { userPic, amenPicture } from "../../assets"
import { truncate } from "../../utils"


const StoryCard = props => {

    const { story } = props 

    return (
        <Card.Container>
            <Card.Head>
                <Card.Image src={story.image || story.video || amenPicture} alt="crossImg" />
            </Card.Head>
            <Card.Body>
            <div className={styles.author}>
                <img src={userPic} alt="crossImg" />
                <div>
                    <Card.SubHeading>{story.author && story.author.fullName}</Card.SubHeading>
                    <p> {String(new Date(story.createdAt)).slice(0, 15)}</p>
                </div>
            </div>
            <Card.Heading>{story.title}</Card.Heading>
            <Card.Paragraph>{truncate(htmlToText(story.content), 200)}&hellip; </Card.Paragraph>
            <Button type="link" variant="primary" href={`/story?storyid=${story._id}`} block={true}>Read More<AiOutlineDoubleRight /></Button>
            </Card.Body>
            
        </Card.Container>
    )
}

export default StoryCard