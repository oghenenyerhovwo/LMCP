import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// components
import { Spinner, MessageBox, EventCard, Button } from "../../components"

// css
import styles from "./events.module.css"

// functions
import { getEvents } from "../../actions"

// type
import { GET_EVENTS_RESET } from "../../constants/eventConstants"



const Events = () => {
  const dispatch = useDispatch()

  // state
  const {
    successGetEvents,
    loadingGetEvents,
    errorGetEvents,
    events,
  } =  useSelector(state => state.eventStore)

  const {
    currentUser,
  } =  useSelector(state => state.userStore)

  useEffect(() => {
    dispatch(getEvents())
  }, [dispatch])

  useEffect(() => {
    if(successGetEvents){
      dispatch({type: GET_EVENTS_RESET})
    }
  }, [dispatch, successGetEvents])  

  return (
    <div className={`container`}>
      {loadingGetEvents && <Spinner />}
      {errorGetEvents && <MessageBox variant="danger">{errorGetEvents} </MessageBox>}

      {
      currentUser.role === "admin" &&
        (
          <div className={styles.events_button}>
              <Button type="link" href="/event/create" variant="primary">Add An EVent</Button>
          </div>
        )
    }

      <div className={`${styles.events}`}>
          {
            events.length > 0 ?
            <>
                {
                  events.map(event => (
                    <React.Fragment key={event._id}>
                        <EventCard event={event} />
                    </React.Fragment>
                  ))
                }
              
            </>: <></>
          }   
      </div>
      
    </div>
  )
}

export default Events