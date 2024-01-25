import React, { useState } from "react";
import { Link } from "react-router-dom";


function Add({ jsonTask, routBack, setJsonTask }) {

    const [FeedbackTitleInput, setFeedbackTitleInput] = useState("")
    const [categoryInput, setCategoryInput] = useState("")
    const [FeedbackDetailInput, setFeedbackDetailInput] = useState("")
    const [FeedbackStatusInput, setFeedbackStatusInput] = useState("")



    function sendTask(jsonTask) {

        const data = {
            "id": jsonTask.length + 1,
            "title": FeedbackTitleInput,
            "category": categoryInput,
            "upvotes": 0,
            "upvoted": false,
            "status": FeedbackStatusInput,
            "description": FeedbackDetailInput,
            "comments": []
        }


        fetch("http://localhost:3022/add/form", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => {
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            return res.json();
        }).then((responseData) => {
            console.log(responseData);
        }).catch((err) => {
            console.error("Fetch error:", err);
        });

    }

    function setUpdatedTask() {

        fetch("http://localhost:3022").then((res) => {

            return res.json()

        }).then((data) => {

            const [dataObg] = data
            const productRequests = dataObg.productRequests


            setJsonTask(productRequests)



        })





    }

    return (
        <div className="add-body">
            <div className="add-main">

                <div className="add-back-btn-cont">

                    <Link to={routBack}>
                        <button className="add-back-btn">
                            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 5l4-4" stroke="#4661E6" strokeWidth="2" fill="none" strokerull="evenodd" /></svg>
                            <span className="back-btn-txt-add" onClick={()=>{setUpdatedTask()}}> Go Back</span></button>
                    </Link>

                </div>

                <section className="form-cont">
                    <svg className="plus-svg-add" width="56" height="56" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient cx="103.9%" cy="-10.387%" fx="103.9%" fy="-10.387%" r="166.816%" id="a"><stop stopColor="#E84D70" offset="0%" /><stop stopColor="#A337F6" offset="53.089%" />
                        <stop stopColor="#28A7ED" offset="100%" /></radialGradient></defs><g fill="none" strokerull="evenodd"><circle fill="url(#a)" cx="28" cy="28" r="28" /><path fill="#FFF" strokerull="nonzero" d="M30.343 36v-5.834h5.686v-4.302h-5.686V20h-4.597v5.864H20v4.302h5.746V36z" />
                        </g>
                    </svg>

                    <h1 className="form-txt-add">Create New Feedback</h1>

                    <form className="fed-form">
                        <label className="label-add">Feedback Title</label>
                        <label className="label-add-p">Add a short,descriptive headline</label>
                        <input className="add-input" value={FeedbackTitleInput} onInput={(e) => { setFeedbackTitleInput(e.target.value) }} />
                    </form>

                    <form className="cat-form">
                        <label className="label-add">Category</label>
                        <label className="label-add-p">Choose a category for your feedback</label>

                        <select className="add-input" onInput={(e) => { setCategoryInput(e.target.value) }}>
                            <option></option>
                            <option className="add-option">Feature</option>
                            <option className="add-option">UI</option>
                            <option className="add-option">UX</option>
                            <option className="add-option">Enhancement</option>
                            <option className="add-option">Bug</option>

                        </select>

                    </form>

                    <form className="feed-form-update">
                        <label className="label-add">Update status</label>
                        <label className="label-add-p">Add a short,descriptive headline</label>
                        <select className="add-input" onInput={(e) => { setFeedbackStatusInput(e.target.value) }}>
                            <option></option>
                            <option className="add-option">planned</option>
                            <option className="add-option">in-progress</option>
                            <option className="add-option">suggestion</option>
                            <option className="add-option">live</option>
                        </select>

                    </form>




                    <form className="area-form">
                        <label className="label-add">Feedback Detail</label>
                        <label className="label-add-p">Include any specific comments on what should be improved, added, etc.</label>
                        <textarea className="add-input" value={FeedbackDetailInput} onInput={(e) => { setFeedbackDetailInput(e.target.value) }} />
                    </form>

                    <div className="add-btn-cont"> <Link to={routBack}><button className="cancel-btn-add"  onClick={()=>{setUpdatedTask()}}>Cancel</button></Link>
                    <button onClick={() => {



                        if (FeedbackTitleInput && categoryInput && FeedbackDetailInput && FeedbackStatusInput) {

                            sendTask(jsonTask)
                        }




                    }} className="feed-btn-add">Add Feedback</button></div>


                </section>

            </div>

        </div>
    )
}



export default Add