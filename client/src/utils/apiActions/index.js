// offline
export const backend_url = "http://localhost:5000/api"
export const frontend_url = "http://localhost:3000/"


// Online
// export const backend_url = "https://demanager-app.herokuapp.com/api"
// export const frontend_url = "https://demanager-app.netlify.app/"

export const setError = (err) => {
    return err.response && err.response.data.message ? err.response.data.message : err.message
}

export const setHeader = (token) => {
  return {
    headers: {
        Authorization: `Bearer ${token}`
    }
  }
 }