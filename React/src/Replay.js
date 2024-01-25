
import React from "react";
import { useState } from "react";
import ReplayToReplay from "./ReplayToReplay";

function Replay({ el, i, id, idToFindCommentInBase, comment }) {
    const [showReplay, setShowReplay] = useState(false)
    const [replayTextArea, setReplayTextArea] = useState("")

 
    function replay() {

   

        const commentId = el.id

        const replayObj = {

            content: replayTextArea,
            replyingTo:showReplay? el.user.username:el.replies[i].user.username,
            user: {
                image: "./assets/user-images/image-zena.jpg",
                name: "Zena Kelley",
                username: "velvetround"
            }
        }

        fetch("http://localhost:3022/replay", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({ commentId, idToFindCommentInBase, replayObj })
        })



    }








    return (

        <div className="img-cont-com" key={i} >

            <div>
                <img className="com-img" src={el.user.image ? el.user.image : "https://i.pravatar.cc/600"} />
            </div>

            <div className="com-cont-com">


                <div>


                    <div className="replay-cont-com" >


                        <div className="new-cont">

                            <div className="com-name-cont">
                                <span className="com-auth-name">{el.user.name}</span>
                                <span className="com-auth-tag">@{el.user.username}</span>
                            </div>

                            <button className="com-replay" id={el.id} onClick={(e) => { setShowReplay(true) }}>Reply</button>


                        </div>
                        <p className="com-p">{el.content}</p>

                        {showReplay && <div className="replay-cont">

                            <textarea className="com-textarea-replay" value={replayTextArea} onInput={(e) => { setReplayTextArea(e.target.value) }}></textarea>
                            <button className="replay-post-bnt" onClick={(e) => { replay(); comment(); setShowReplay(false); }}>Post Replay</button>

                        </div>}

                    </div>
                </div>

                {el.replies && el.replies.map((el, i) => {
                    return <ReplayToReplay key={i} el={el} i={i}  replayTextArea={replayTextArea} setReplayTextArea={setReplayTextArea} comment={comment} replay={replay}/>

                })}



            </div>
        </div>)
}


export default Replay;