
import React, { useState, useEffect } from 'react';
import Left from "./Left";
import Right from "./Right";
import Add from './Add';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Comment from './Comment';
import RoadMap from './RoadMap';






function App() {

  const [jsonTask, setJsonTask] = useState([]);

  const [categoryType, setCategoryType] = useState("all")
  const idFromSessionStorage = parseInt(window.sessionStorage.getItem("id"))
  const [idForComment, setIdForComment] = useState(idFromSessionStorage)

  const [userComment, setUserComment] = useState({})



  async function comment() {

    const data = await fetch("http://localhost:3022/comments").then((res) => res.json())

    const [arrayDest] = data

    const { productRequests } = arrayDest
    for (const el of productRequests) {

      if (el.id === idForComment) {

        const comment = JSON.stringify(el)
        window.sessionStorage.setItem("comment", comment)

        const userCommenta = JSON.parse(window.sessionStorage.getItem("comment"))
        console.log(userComment)
        setUserComment(userCommenta)

      }
    }




  }





  useEffect(() => {

    comment()

  }, [idForComment]
  )


  useEffect(() => {
    if (jsonTask.length) return
    fetch(`http://localhost:3022/${categoryType}`, { method: "GET" }).then((res) => {

      return res.json()

    }).then((data) => {

      const FilteredCategory = data[0].filtered


      setJsonTask(FilteredCategory)

    })

  }, [jsonTask]);
  useEffect(() => {
    setJsonTask([])
  }, [categoryType])


 

  return (
    <BrowserRouter>

      <Routes>
        <Route exact path='/' element={
          <div className="app">

            <Left setCategoryType={setCategoryType} />
            <Right jsonTask={jsonTask} setJsonTask={setJsonTask} setIdForComment={setIdForComment} />
          </div>
        }>


        </Route>

        <Route path='/add' element={<Add jsonTask={jsonTask}  routBack={"/"}   setJsonTask={setJsonTask}/>}>

        </Route>

        <Route path='/addView' element={<Add jsonTask={jsonTask} routBack={"/roadMap"} setJsonTask={setJsonTask}/>}>

        </Route>




        <Route path='/comments' element={<Comment userComment={userComment} idForComment={idForComment} comment={comment} />}>

        </Route>

        <Route path='/roadMap' element={<RoadMap setJsonTask={setJsonTask} />}>

        </Route>


      </Routes>

    </BrowserRouter>

  );
}

export default App;
