import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import styles from './style.module.css'
import moment from "moment"

import { Card, Button, Tab, StoryCard, Spinner, EventCard } from "../../components"
import { activitiesTab, homeFaq, aims } from "../../utils"
import { amenPicture } from "../../assets"

// functions
import { getStoriesWithLimit, getEvents } from "../../actions"

// type
import { GET_STORIES_WITH_LIMIT_RESET } from "../../constants/storyConstants"
import { GET_EVENTS_WITH_LIMIT_RESET } from "../../constants/eventConstants"


const Home = () => {
  const dispatch = useDispatch()

  const { currentUser } =  useSelector(state => state.userStore)

  const [tab, setTab] = useState(activitiesTab[0].eventKey)

  const [tabEvents, setTabEvents] = useState([])

  // state
  const {
    successGetStoriesWithLimit,
    loadingGetStoriesWithLimit,
    storiesWithLimit,
  } =  useSelector(state => state.storyStore)

  // state
  const {
    successGetEvents,
    loadingGetEvents,
    events,
  } =  useSelector(state => state.eventStore)

  useEffect(() => {
    dispatch(getStoriesWithLimit(3))
    dispatch(getEvents(2))
  }, [dispatch])

  useEffect(() => {
    if(successGetStoriesWithLimit){
      dispatch({type: GET_STORIES_WITH_LIMIT_RESET})
    }

    if(successGetEvents){
      dispatch({type: GET_EVENTS_WITH_LIMIT_RESET})
    }
  }, [dispatch, successGetStoriesWithLimit, successGetEvents])  

  useEffect(() => {
    setTabEvents(
      events.filter(event => {
        const eventTime = moment(event.date)
        const nowTime = moment()
        if(tab === "past"){
          return eventTime.isBefore(nowTime)
        }
        else if(tab === "future"){
          return eventTime.isAfter(nowTime)
        }
        return false
      })
    )
  }, [ events, tab]) 
  
  return (
    <section className="container">
      <div className={`${styles.home}`}>

      {(loadingGetStoriesWithLimit || loadingGetEvents) && <Spinner />}

      <section className={`${styles.home_intro} grid spacing-xl`}>
          <div className={`${styles.home_intro_text}`}>
            <h1 className="spacing-md">LAY MISSIONARY OF CHRIST TO THE POOR <br /> (LMCP) </h1>
            <p className="spacing-sm"></p>
            <div className={`${styles.home_intro_btn}`}>
              {
                currentUser.email ? <Button type="link" variant="primary" href="/story">Join the conversations</Button> :
                <Button type="link" variant="primary" href="/signup">Join the Mission</Button>
              }
              <Button type="link" href="/ninjas">Learn More ABout Mission</Button>
            </div>
          </div>
          <div className={`image spacing-md ${styles.home_intro_img}`}><img src={amenPicture}  alt={amenPicture || "image"} /></div>
        </section>

        <section className={`${styles.home_mission_activities} spacing-xl`}>
          <h2 className="spacing-md">WHAT WE DO</h2>
          <p>We share the Gospel of Christ to the poor under the following categories:</p>

          <div className={`${styles.aims}`}>
            {
              aims.length > 0 && aims.map(aim => (
                <div key={aim._id} className={`${styles.aims_card}`}>
                    <div className={`${styles.aims_card_number} flex flex__center spacing-sm`}>
                        {aim._id}
                    </div>

                    <p className={`${styles.aims_card_text}`}>
                        {aim.text}
                    </p>
                </div>
              ))
            }
          </div>


          <Tab.Container tab={tab}>
            {
              activitiesTab.length > 0 && activitiesTab.map(activity => (
                <React.Fragment key={activity._id}>
                  <Tab.Item eventKey={activity.eventKey} tab={tab} setTab={setTab} >{activity.label}</Tab.Item>
                </React.Fragment>
              ))
            }
          </Tab.Container>
      

          <div className={`${styles.events}`}>
            {
              tabEvents.length > 0 && tabEvents.map(event => (
                  <div className={`spacing-md ${styles.event}`} key={event._id}>
                      <EventCard event={event} />
                  </div>
              ))
            }
          </div>
          <Button type="link" variant="primary" href="/event">See All</Button>
        </section>

        <section className={`${styles.home_articles} spacing-xl`}>
          <h2 className="spacing-md">Some of Our Latest Articles</h2>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>

          <div className={`${styles.home_articles_cards}`}> 

            {
              storiesWithLimit.length > 0 && storiesWithLimit.map(story => (
                <React.Fragment key={story._id}>
                    <StoryCard story={story} />
                </React.Fragment>
              ))
            }
          </div>

          


        </section>
        <section className={`${styles.home_faq} spacing-xl`}>
            <h2 className="spacing-md">Frequently Asked Questions</h2>
            <p className="spacing-sm">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>

            <div className={`${styles.home_faq_cards}`}> 

              {homeFaq.length > 0 && homeFaq.map(faq => (
                <React.Fragment key={faq._id}>
                    <Card.ContainerFaq faq={faq} />
                </React.Fragment>
              ))}

            </div>


          </section>
      </div>
    </section>
  )
}

export default Home
