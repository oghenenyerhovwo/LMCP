import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from 'react-redux'
import styles from './style.module.css'

import { Card, Button, Tab, StoryCard, Spinner } from "../../components"
import { activitiesTab, activitiesContent, homeFaq, aims } from "../../utils"
import { amenPicture } from "../../assets"

// functions
import { getStoriesWithLimit } from "../../actions"

// type
import { GET_STORIES_WITH_LIMIT_RESET } from "../../constants/storyConstants"


const Home = () => {
  const dispatch = useDispatch()

  const { currentUser } =  useSelector(state => state.userStore)

  const [tab, setTab] = useState("tab2")

  // state
  const {
    successGetStoriesWithLimit,
    loadingGetStoriesWithLimit,
    storiesWithLimit,
  } =  useSelector(state => state.storyStore)

  useEffect(() => {
    dispatch(getStoriesWithLimit(3))
  }, [dispatch])

  useEffect(() => {
    if(successGetStoriesWithLimit){
      dispatch({type: GET_STORIES_WITH_LIMIT_RESET})
    }
  }, [dispatch, successGetStoriesWithLimit])  
  
  return (
    <section className="container">
      <div className={`${styles.home}`}>

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
      

          <div className={`${styles.home_mission_activities_items}`}>
            {
              activitiesContent.length > 0 && activitiesContent.map(activity => (
                  <div className={`spacing-md ${styles.home_mission_activities_item}`} key={activity._id}>
                      { 
                        activity.eventKey && activity.eventKey.includes(tab)  && (
                          <>
                            <div className={`image ${styles.home_mission_activities_item_image}`}>
                                <img src={activity.img}  alt="testImg" />
                            </div>
                            <div className={`${styles.home_mission_activities_item_text}`}>
                                <h2 className="spacing-md">{activity.title} </h2>
                                <p className="spacing-md">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>
                                <Button type="link" variant="primary" href={activity.btnLink}>{activity.btnText}</Button>
                            </div>
                          </>
                        )
                      } 
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

            {loadingGetStoriesWithLimit && <Spinner />}
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
