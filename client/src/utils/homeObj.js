import { crossImg,  ministerToThePoor, christmasWithChildren } from "../assets"


export const activitiesContent = [
    {
        _id: 1, 
        eventKey: ["tab2"], 
        title: "Ministering to the Poor at Ubuluku",
        btnText: "See Works",
        btnLink: "/works",
        img: christmasWithChildren,
    },
    {
        _id: 2, 
        eventKey: ["tab2", "tab1"],
        title: "Spreading the Joy of the Gospel",
        btnText: "See Works",
        btnLink: "/articles",
        img: ministerToThePoor,
    },
    {
        _id: 3, 
        eventKey: ["tab3"],
        title: "Christmas Celebration with Chidren",
        btnText: "See upcoming programs",
        btnLink: "/programs",
        img: christmasWithChildren,
    },
]

export const activitiesTab = [
    {
        _id: 1, 
        label: "Charity Works",
        eventKey: "tab1",
    },
    {
        _id: 2, 
        label: "Promoting the Faith",
        eventKey: "tab2",
    },
    {
        _id: 3, 
        label: "Self Development",
        eventKey: "tab3"
    },
]

export const homeArticles = [
    {
        _id: 1,
        heading: "Why we make the Sign of the Cross",
        paragraph: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
        img: crossImg,
        btnText: "Read Full Story",
        btnLink: "/article",
    },
    {
        _id: 2,
        heading: "Why we make the Sign of the Cross",
        paragraph: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
        img: crossImg,
        btnText: "Read Full Story",
        btnLink: "/article",
    },
    {
        _id: 3,
        heading: "Why we make the Sign of the Cross",
        paragraph: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
        img: crossImg,
        btnText: "Read Full Story",
        btnLink: "/article",
    },
]

export const homeFaq = [
    {
        _id: 1,
        question: "How does the mission support the poor",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
    },
    {
        _id: 2,
        question: "How does the mission support the poor",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
    },
    {
        _id: 3,
        question: "How does the mission support the poor",
        answer: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ex, dignissimos doloremque ducimus a eaque impedit aut rem facere earum magnam nobis delectus? Saepe iusto ad, dolorum architecto minus dolorem nemo!s",
    },
]