import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useLocation, useParams } from 'react-router-dom'

// components
import { Spinner, MessageBox, Button, Form } from "../../components"

// css
import styles from "./editprofile.module.css"

// functions
import { updateUser, getUserById } from "../../actions"

// type
import { UPDATE_USER_RESET, GET_USER_BY_ID_RESET } from '../../constants/userConstants'


const EditProfile = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams()

  // state
  const {
    errorGetUserById,
    successGetUserById,
    loadingGetUserById,
    errorUpdateUser,
    successUpdateUser,
    loadingUpdateUser,
    idUpdateUser,
    userByID,
  } =  useSelector(state => state.userStore)

  const initialFormState = {
    fullName: "",
    email: "",
    phoneNumber: "",
    gender: "",
    isCatholic: false,
    isCommunicant: false,
    isConfirmed: false,
    isBaptised: false,
    parish: "",
    birthday: "",
    membership: "",
  }
  const [form, setForm] = useState(initialFormState)

  useEffect(() => {
    dispatch(getUserById(params.id))
  }, [dispatch, params.id])

  useEffect(() => {
    if(successGetUserById){
      dispatch({type: GET_USER_BY_ID_RESET})
      setForm(prevForm => {
        return {
          ...prevForm,
          fullName: userByID.fullName || "",
          email: userByID.email || "",
          phoneNumber: userByID.phoneNumber || "",
          gender: userByID.gender || "",
          isCatholic: userByID.isCatholic || false,
          isBaptised: userByID.isBaptised || false,
          isCommunicant: userByID.isCommunicant || false,
          isConfirmed: userByID.isConfirmed || false,
          parish: userByID.parish || "",
          birthday: userByID.birthday || "",
          membership: userByID.membership || "",
        } 
      })
    }
  }, [dispatch,userByID, successGetUserById])

  useEffect(() => {
    if(successUpdateUser){
      dispatch({type: UPDATE_USER_RESET})
      navigate(location.search ? location.search.split("=")[1] : `/profile/${idUpdateUser}` )
    }
  }, [dispatch, successUpdateUser, idUpdateUser, location.search, navigate])

  

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(updateUser(form, params.id))
  }

  const handleChange = e => {
    const {name,value} = e.target
    setForm({...form, [name]: value})
  }

  const handleCheck = e => {
    const {name} = e.target
    setForm({...form, [name]: !form[name]})
  }

  const handleDate = date => {
    setForm({...form, birthday: date})
  }

  return (
    <>
      {
        loadingGetUserById ? <Spinner /> :
        errorGetUserById ? <MessageBox variant="danger">{errorGetUserById} </MessageBox> :
        <div className={`grid ${styles.signin}`}>

          <div className={`${styles.form}`}>
            <div className={`${styles.form_container}`}>
              <h1 className="spacing-md">User Profile </h1>

              <form className="spacing-xs" onSubmit={handleSubmit}>
                
                {loadingUpdateUser && <Spinner />}
                {errorUpdateUser && <MessageBox variant="danger">{errorUpdateUser} </MessageBox>}
                
                <Form.Input 
                  label="Full Name"
                  onChange={handleChange}
                  value={form.fullName}
                  type="text"
                  name="fullName"
                />

              <Form.Input 
                  label="Email"
                  onChange={handleChange}
                  value={form.email}
                  type="text"
                  name="email"
                />

              <Form.Input 
                  label="Phone Number"
                  onChange={handleChange}
                  value={form.phoneNumber}
                  type="text"
                  name="phoneNumber"
                />

              <Form.Dropdown 
                  label="Gender"
                  onChange={handleChange}
                  value={form.gender}
                  name="gender"
                  options={[{_id: 1, label: "Male", name:"male"}, {_id: 2, label: "Female", name:"female"}]}
                />

                <Form.CheckBox 
                  label="Are you a Catholic?"
                  onChange={handleCheck}
                  checked={form.isCatholic}
                  name="isCatholic"
                />

                <Form.CheckBox 
                  label="Are you Baptised?"
                  onChange={handleCheck}
                  checked={form.isBaptised}
                  name="isBaptised"
                />

                <Form.CheckBox 
                  label="Are you a Communicant?"
                  onChange={handleCheck}
                  checked={form.isCommunicant}
                  name="isCommunicant"
                />

                <Form.CheckBox 
                  label="Are you Confirmed?"
                  onChange={handleCheck}
                  checked={form.isConfirmed}
                  name="isConfirmed"
                />

                <Form.Input 
                  label="Home Parish / Church"
                  onChange={handleChange}
                  value={form.parish}
                  type="text"
                  name="parish"
                />

                <Form.Date
                  label="Birthday"
                  onChange={handleDate}
                  value={form.birthday}
                  name="birthday"
                />

                <Form.Dropdown 
                  label="Membership"
                  onChange={handleChange}
                  value={form.membership}
                  name="membership"
                  options={[{_id: 1, label: "Active", name:"Active"}, {_id: 2, label: "Auxiliary", name:"Auxiliary"},]}
                />
                

                <Button variant="primary" className="spacing-sm" type="submit">Update Profile</Button>
              </form>
              <p>
                Go <Link to={`/profile/${params.id}`}>Back</Link>
              </p>

              </div>
            </div>

          <div className={styles.image_col}>
            <div className={styles.image_col_container}>
                <h1 className="spacing-sm">Tell us more <span>you </span></h1>
                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!</p>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default EditProfile