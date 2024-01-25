
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";



function Left({ setCategoryType }) {




  // useEffect(() => {
  //   let res;
  //   if (categoryType !== "all") {

  //     fetch(`http://localhost:3022/${categoryType}`, { method: "GET" }).then((res) => {
  //       setJsonTask((res.json()))
  //     });
  //   }
  // }, [categoryType])



  return (
    <section className="left">
      <div className="name">
        <div className="name-1">Frontend Mentor</div>
        <div className="name-2">Feedback board</div>
      </div>
      <div className="type-cont">
        <div className="type-1"><div onClick={() => {

          setCategoryType("all");
        }}>All</div><div onClick={() => {
          setCategoryType("ui");

        }}>UI</div><div onClick={() => {
          setCategoryType("ux");
        }}>UX</div></div>
        <div className="type-2"><div onClick={() => {
          setCategoryType("enhancement");
        }}>Enhancement</div><div onClick={() => {
          setCategoryType("feature");

        }}>Feature</div></div>
        <div className="type-3"><span
          onClick={() => {
            setCategoryType("bug");
          }}
        >Bug</span></div>
      </div>
      <div className="roadmap-cont">
        <div className="roadmap-1"><span>Roadmap</span> <Link className="roadmap-page" to={"/roadMap"}>View</Link></div>
        <div className="roadmap-2"><div className="dot-cont"><div className="dot-yellow"></div> <span className="roadmap-name">Planned</span></div> <span className="count">2</span></div>
        <div className="roadmap-3"><div className="dot-cont"><div className="dot-purple"></div> <span className="roadmap-name">In-Progress</span></div><span className="count">3</span></div>
        <div className="roadmap-4"><div className="dot-cont"><div className="dot-blue"></div> <span className="roadmap-name">Live</span></div><span className="count">1</span></div>
      </div>

    </section>


  )


}



export default Left;