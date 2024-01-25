import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"


function RoadMap({ setJsonTask }) {

    const [planned, setPlanned] = useState([])
    const [inProgress, setInProgress] = useState([])
    const [live, setLive] = useState([])



    const filter = (type, setFunction) => {


        fetch("http://localhost:3022").then((res) => {

            return res.json()

        }).then((data) => {

            const [dataObg] = data
            const productRequests = dataObg.productRequests


            const plannedArray = productRequests.filter((product) => {

                if (product.status === type) {

                    return product
                }

            })


            setFunction(plannedArray)



        })



    }




    function upvoteUpdater(task,type,setFunction) {

        const data = {

            id: task.id,
            upvotes: task.upvotes + 1

        }

        fetch("http://localhost:3022/upvote", {
            method: 'POST',
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(data)
        }).then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                return res.json();
            }).then((responseData) => {
                setJsonTask([])
            })
            .catch((err) => {
                console.error("Fetch error:", err);
            });

        filter(type,setFunction)

    }














    useEffect(() => { filter("planned", setPlanned) }, [])
    useEffect(() => { filter("in-progress", setInProgress) }, [])
    useEffect(() => { filter("live", setLive) }, [])



    return (
        <div className="road-body">

            <div className="road-main">

                <div className="road-header">

                    <div className="road-header-left">

                        <div> <Link to={"/"}><button className="road-back-btn">

                            <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg"><path d="M6 9L2 5l4-4" stroke="#fff" strokeWidth="2" fill="none" strokerull="evenodd" /></svg>

                            Go Back</button></Link></div>


                        <span className="road-label">Roadmap</span>

                    </div>

                    <Link to={"/addView"}><button className="add-button">+ Add Feedback</button></Link>

                </div>

                <div className="road-columns-cont">



                    <div>

                        <div className="road-task-column">


                            <div className="road-task-header">

                                <span className="road-task-cont-hd"> Planned (2)</span>
                                <span className="road-task-cont-text">Ideas prioritized for research</span>

                            </div>

                            {planned.map((task, taskIndex) => {

                                return (<div className="road-task-cont" key={taskIndex}>

                                    <div className="road-task-cont-border" style={{ backgroundColor: "#f49f85" }}></div>
                                    <div className="road-dot-cont"> <div className="dot-road"></div>Planned</div>

                                    <h1 className="road-h1">{task.title}</h1>
                                    <p className="road-p">{task.description}</p>
                                    <div>   <span className="task-type">{task.category}</span></div>

                                    <div className="upvote-cont-road"  style={task.upvoted ?{backgroundColor:"#cfd7ff"}:{}} onClick={() => { !task.upvoted && upvoteUpdater(task,"planned", setPlanned); }}><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" strokeWidth="2" fill="none" fillRule="evenodd" /></svg> <span className="upvote-count" >{task.upvotes}</span></div>

                                </div>)


                            })}



                        </div>
                    </div>



                    <div>

                        <div className="road-task-column">


                            <div className="road-task-header">

                                <span className="road-task-cont-hd"> In-Progress (2)</span>
                                <span className="road-task-cont-text">Currently being developed</span>

                            </div>

                            {inProgress.map((task, taskIndex) => {

                                return (<div className="road-task-cont" key={taskIndex}>

                                    <div className="road-task-cont-border" style={{ backgroundColor: "#ad1fea" }}></div>
                                    <div className="road-dot-cont"> <div className="dot-road" style={{ backgroundColor: "#ad1fea" }}></div>In-Progress</div>

                                    <h1 className="road-h1">{task.title}</h1>
                                    <p className="road-p">{task.description}</p>
                                    <div>   <span className="task-type">{task.category}</span></div>

                                    <div className="upvote-cont-road" style={task.upvoted ?{backgroundColor:"#cfd7ff"}:{}} onClick={() => { !task.upvoted && upvoteUpdater(task,"in-progress", setInProgress); }}><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" strokeWidth="2" fill="none" fillRule="evenodd" /></svg> <span className="upvote-count" >{task.upvotes}</span></div>

                                </div>)


                            })}



                        </div>

                    </div>

                    <div>

                        <div className="road-task-column">


                            <div className="road-task-header">

                                <span className="road-task-cont-hd"> Live (2)</span>
                                <span className="road-task-cont-text">Released features</span>

                            </div>

                            {live.map((task, taskIndex) => {

                                return (<div className="road-task-cont" key={taskIndex}>

                                    <div className="road-task-cont-border" style={{ backgroundColor: "#62bcfa" }}></div>
                                    <div className="road-dot-cont"> <div className="dot-road" style={{ backgroundColor: "#62bcfa" }}></div>Live</div>

                                    <h1 className="road-h1">{task.title}</h1>
                                    <p className="road-p">{task.description}</p>
                                    <div>   <span className="task-type">{task.category}</span></div>

                                    <div className="upvote-cont-road"  style={task.upvoted ?{backgroundColor:"#cfd7ff"}:{}} onClick={() => { !task.upvoted && upvoteUpdater(task,"live", setLive); }}><svg width="10" height="7" xmlns="http://www.w3.org/2000/svg"><path d="M1 6l4-4 4 4" stroke="#4661E6" strokeWidth="2" fill="none" fillRule="evenodd" /></svg> <span className="upvote-count" >{task.upvotes}</span></div>

                                </div>)


                            })}



                        </div>
                    </div>

                </div>

            </div>
        </div>)


}



export default RoadMap