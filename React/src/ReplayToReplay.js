import React from "react";
import { useState } from "react";



function ReplayToReplay({ el, i, replayTextArea, setReplayTextArea, comment, replay }) {

    const [showReplayForReplay, setShowReplayForReplay] = useState(false)


    return (<div className="replies-cont" key={i} >
        <div>
            <img className="com-img" src={el.user.image ? el.user.image : "https://i.pravatar.cc/600"} />
        </div>

        <div className="replay-main">
            <div className="reply-cont-com-replay" >
                <div className="outline-in-replay">
                    <div className="com-name-cont">
                        <span className="com-auth-name">{el.user.name}</span>
                        <span className="com-auth-tag">@{el.user.username}</span>
                    </div>
                    <button className="com-replay" onClick={(e) => { setShowReplayForReplay(true) }} >Reply</button>
                </div>
            </div>
            <p className="com-p"><span className="replay-to">@{el.replyingTo}</span>{el.content}</p>

            {showReplayForReplay && <div className="replay-cont">

                <textarea className="com-textarea-replay" value={replayTextArea} onInput={(e) => { setReplayTextArea(e.target.value) }}></textarea>
                <button className="replay-post-bnt" onClick={(e) => { replay(); comment(); setShowReplayForReplay(false); }}>Post Replay</button>

            </div>}
        </div>


    </div>




    )




}


export default ReplayToReplay