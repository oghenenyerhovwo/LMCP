import { homeArticles, activitiesTab,activitiesContent, homeFaq, aims } from "./homeObj"
import { onChangeError, onSubmitError } from "./formHandling"
import Category from "./productCategory"
import { 
  backend_url,
  frontend_url,
  setError,
  setHeader,
} from "./apiActions"
import {
  stateApi,
} from "./apis"
import firebaseStorage from "./firebase"

const truncate = (str, n, useWordBoundary=true) => {
    if(str.length <= n){
      return str
    }
    const subString = str.slice(0, n-1)
    return (
      useWordBoundary ? subString.slice(0, subString.lastIndexOf(" ")) : subString 
    ) + " ";
}

const setTagArray = (str) => {
  let tag = ""
  let tags = []
  let _id = 1
    for (let index = 0; index < str.length; index++) {
       if((str[index] === " ") && tag !== "") {
        tags.push({tag, _id})
        tag=""
        _id += 1
       }

       else if((index === str.length - 1)) {
        tag += str[index]
        tags.push({tag, _id})
        tag=""
        _id += 1
       }

       else {
        tag += str[index]
       }
    }
    const hashTags = tags.filter(tagObj => tagObj.tag.includes("#")).map(tagObj => {
      return {...tagObj, tag: tagObj.tag.replace("#", "")}
    })
    return hashTags
}

export {
    onChangeError,
    onSubmitError,
    Category,
    frontend_url,
    backend_url,
    setError,
    setHeader,
    stateApi,
    firebaseStorage,
    homeArticles,
    activitiesTab,
    homeFaq,
    activitiesContent,
    truncate,
    setTagArray,
    aims,
}