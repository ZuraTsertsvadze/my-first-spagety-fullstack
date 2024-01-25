import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Replay from "./Replay";

function Comment({ userComment, comment }) {

    const [textarea, SetTextArea] = useState("")

    const idToFindCommentInBase = JSON.parse(window.sessionStorage.getItem("comment")).id

    async function user() {

        const data = await fetch("http://localhost:3022/user").then((res) => { return res.json() })
        const [mav] = data

        const { currentUser } = mav

        const newComment = {
            idToFindCommentInBase,
            id: userComment.comments?.length + 1,
            content: textarea,
            user: currentUser

        }




        await fetch("http://localhost:3022/sendComment", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(newComment),
        })




    }







    return (<div className="com-body">
        <div className="com-main">
            <div className="com-nav-cont">
                <Link to={"/"}>
                    <button className="com-back-btn">
                        <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 5l4-4" stroke="#4661E6" strokeWidth="2" fill="none" strokerull="evenodd" /></svg>
                        Go Back</button>
                </Link>
                <button className="com-edit-btn" >Edit Feedback</button>

            </div>

            <div className="task-cont" >
                <div className="upvote-cont" ><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" strokeWidth="2" fill="none" fillRule="evenodd" /></svg> <span className="upvote-count" >{userComment.upvotes}</span></div>

                <div className="task-com-cont">

                    <div>
                        <h3 className="task-header">{userComment.title}</h3>
                        <p className="task">{userComment.description}</p>
                        <span className="task-type">{userComment.category}</span>
                    </div>

                    <div className="task-comment"><svg width="18" height="16" xmlns="http://www.w3.org/2000/svg"><path d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z" fill="#CDD2EE" fillRule="nonzero"></path></svg><span>{userComment.comments?.length}</span></div>

                </div>

            </div>



            <div className="com-content-cont">

                <h3 className="com-counter">2 comments</h3>

                {userComment.comments?.map((el, i) => {

                    return (
                     <Replay el={el} i={i} key={i} idToFindCommentInBase={idToFindCommentInBase}  comment={ comment } />
                    
                    
                   )


                })}




            </div>

            <div className="com-footer">
                <h3 className="com-add-title">Add Comment</h3>
                <textarea className="com-textarea" value={textarea} onInput={(e) => { SetTextArea(e.target.value) }}></textarea>

                <div className="com-foot-btn">
                    <span className="com-word-counter">225 characters left</span>
                    <button className="com-post-bnt" onClick={() => { user().then(comment).catch(comment) }} >Post Comment</button>
                </div>

            </div>

        </div>

    </div>)
}



export default Comment;
