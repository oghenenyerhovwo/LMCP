import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, Link, useNavigate } from 'react-router-dom'
import htmlToText from "html-to-formatted-text"

// components
import { ButtonGroup } from 'react-rainbow-components';
import { Spinner, MessageBox, StoryCard, Button, CommentSection, VideoPlayer } from "../../components"
import { BsFacebook } from "react-icons/bs"
import { BsTwitter } from "react-icons/bs"
import { BsInstagram } from "react-icons/bs"
import { FaClipboard, FaAngleRight, FaAngleLeft } from "react-icons/fa"

// css
import styles from "./stories.module.css"

// functions
import { getStories, getStory, deleteStory } from "../../actions"
import { userPic, amenPicture } from "../../assets"
import { setTagArray } from "../../utils"

// type
import { GET_STORIES_RESET, GET_STORY_RESET, DELETE_STORY_RESET } from "../../constants/storyConstants"

const AllStories = () => {
    // state
    const {
      errorGetStories,
      loadingGetStories,
      stories,
    } =  useSelector(state => state.storyStore)
  return (
    <div className={`${styles.stories}`}> 
        {loadingGetStories && <Spinner />} 
        {errorGetStories && <MessageBox variant="danger">{errorGetStories} </MessageBox>}
        
      {
        stories.length > 0 ?
        <>
            {
              stories.map(story => (
                <React.Fragment key={story._id}>
                    <StoryCard story={story} />
                </React.Fragment>
              ))
            }
          
        </>: <></>
      }
    </div>
  )
}

const SelectedStory = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  

  // state
  const {
    errorGetStory,
    loadingGetStory,
    errorDeleteStory,
    loadingDeleteStory,
    successDeleteStory,
    story,
  } =  useSelector(state => state.storyStore)

  const { 
    currentUser,
  } =  useSelector(state => state.userStore)

  const [toggleDeleteOverlay, setToggleDeleteOverlay] = useState(false)
  const [showVideo, setShowVideo] = useState(false)

  useEffect(() => {
    if(successDeleteStory){
      dispatch({type: DELETE_STORY_RESET})
      navigate("/story")
    }
  }, [dispatch,navigate, successDeleteStory])

  const handleToggleDeleteOverlay = () => {
    setToggleDeleteOverlay(prevToggle => !prevToggle)
  }

  const navigateToEditScreen= () => {
    navigate(`/story/${story._id}/edit`)
  }

  const handleShowVideoToggle = () => {
    setShowVideo(prevToggle => !prevToggle)
  }

  const handleDeleteAccount = () => {
    dispatch(deleteStory(story._id))
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(htmlToText(story.content))

    const copiedElement = document.querySelector(`.${styles.copied}`)
    
    copiedElement.style.opacity = "1"

    setTimeout(() => {
      copiedElement.style.opacity = "0"
    }, 1500);
  }

  return (
    <>
        {loadingGetStory && <Spinner />}
        {errorGetStory && <MessageBox variant="danger">{errorGetStory} </MessageBox>}

        {
          story._id ?
          <div className={`${styles.story}`}>
            <div className={`${styles.story_head} spacing-md`}>
              <div className={`${styles.story_head_title} spacing-md`}>
                <div className={`spacing-md ${styles.author}`}>
                  <div>
                      <p>Published on {String(new Date(story.createdAt)).slice(0, 15)}</p>
                      <h4> <span>Written by</span> {story.author && story.author.fullName}</h4>
                  </div>
                  <img className={`${styles.author_pic}`} src={userPic} alt="crossImg" />
                </div>
                <h1 className="spacing-xs">{story.title}</h1>
                <h3 className="spacing-md">{story.subtitle}</h3>
                <div className={`${styles.story_head_tags} spacing-md`}>
                  {setTagArray(story.tags).map(tagObj => (
                    <div key={tagObj._id}>
                      <Button type="link">{tagObj.tag}</Button>
                    </div>
                  ))}
                </div>
              </div>

              {
                story.video ? (
                  <div className={`grid ${styles.image_and_video}`}>
        
                      {
                          !showVideo ? (
                            <div>
                              <img className={`${styles.content_pic}`} src={story.image || amenPicture} alt="crossImg" /> 
                            </div>
                          ) : (
                            <div>
                              {story.video && <VideoPlayer url={story.video} />}
                            </div>
                          )
                      }

                      <div className={`${styles.image_and_video_icons}`}>
                          <FaAngleLeft className={`${showVideo && styles.image_and_video_icons_active}`} onClick={handleShowVideoToggle} />
                          <FaAngleRight className={`${!showVideo && styles.image_and_video_icons_active}`} onClick={handleShowVideoToggle} />
                      </div>
                      
                      
                  </div>
                ):
                <img className={`${styles.content_pic}`} src={story.image || amenPicture} alt="crossImg" />
            }
              
              
            </div>
            <div className={`grid ${styles.story_body}`}>
              <div className={`spacing-lg container ${styles.content}`} dangerouslySetInnerHTML={{ __html: story.content }} />
              {/* <p className="spacing-lg container">{story.content}</p> */}
              <div className={`${styles.story_body_icons}`}>
                <div className={`spacing-sm `}>
                  <BsFacebook />
                </div>
                <div className={`spacing-sm `}>
                  <BsTwitter />
                </div>
                <div className={`spacing-sm `}>
                  <BsInstagram />
                </div>
                <div onClick={copyToClipboard} className={`spacing-sm `}>
                  <FaClipboard  />
                  <h4 className={`${styles.copied}`}>Copied!</h4>
                </div>
              </div>
            </div>
            <div className="spacing-lg"></div>
            <CommentSection storyId={story._id} comments={story.comments} currentUser={currentUser} />
            <div className="spacing-lg"></div>
            {
              (currentUser._id === story.author._id) &&
              <> 
                <div className={`${styles.story_buttons}`}>
                  <ButtonGroup className="rainbow-m-around_medium">
                      <Button onClick={navigateToEditScreen} label="Edit" variant="primary">Update</Button>
                      <Button onClick={handleToggleDeleteOverlay} label="Delete" variant="secondary">Delete</Button>
                  </ButtonGroup>
                </div>
                {
                  toggleDeleteOverlay && <div className={`flex flex__center ${styles.delete_overlay}`}>
                      <div className={styles.delete_overlay_container}>
                        <h2 className="spacing-md">Are you sure you want to delete this post?</h2>
                        {errorDeleteStory && <MessageBox variant="danger">{errorDeleteStory} </MessageBox> }
                        {loadingDeleteStory && <Spinner /> }
                        {(errorDeleteStory || loadingDeleteStory) && <><br /><br /></>}
                        <div className={styles.delete_overlay_container_button}>
                          <Button variant="secondary" onClick={handleDeleteAccount}>Delete</Button>
                          <Button onClick={handleToggleDeleteOverlay}>Cancel</Button>
                        </div>
                      </div>
                  </div>
                }
              </>
            }
          </div> : <></>
        }
    </>
   
  )
}

const Stories = () => {
  const dispatch = useDispatch()
  const location = useLocation()


  const [storyState, setStoryState] = useState({})

  // state
  const {
    successGetStories,
    successGetStory,
    story,
  } =  useSelector(state => state.storyStore)

  const {
    successCreateComment,
    successDeleteComment,
} =  useSelector(state => state.commentStore)


  useEffect(() => {
    dispatch(getStories())
  }, [dispatch])

  useEffect(() => {
    if(successGetStory){
      setStoryState(story)
      dispatch({type: GET_STORY_RESET})
    }
  }, [dispatch, story, successGetStory])

  useEffect(() => {
    if( (successCreateComment || successDeleteComment) && location.search ){
      dispatch(getStory(location.search.split("=")[1]))
    }
  }, [dispatch, location.search, successCreateComment, successDeleteComment ])

  useEffect(() => {
    if(location.search ){
      dispatch(getStory(location.search.split("=")[1]))
    }
  }, [dispatch, location.search ])

  useEffect(() => {
    if(successGetStories){
      dispatch({type: GET_STORIES_RESET})
    }
  }, [dispatch, successGetStories])

  const backToAllSTories = () => {
    setStoryState({})
  }
  

  return (
    <div className={`${styles.stories_container}`}>
      { !storyState._id ?
          <div className="container"><AllStories />  </div>:
          <div className={`${styles.story_container}`}>
              <div className={`${styles.story_column}`}>
                <SelectedStory />
                <Link className={`spacing-md ${styles.story_container_link}`} to="/story" onClick={backToAllSTories}  >Back</Link>
              </div>
            <div className={` ${styles.story_container_stories}`}>
              <Button type="link" href="/story/create" variant="primary">Write an Arcticle</Button>
              <AllStories />
            </div>
          </div>
      }
    </div>
  )
}

export default Stories