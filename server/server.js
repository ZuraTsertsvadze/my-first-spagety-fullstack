


const http = require("http")
const { MongoClient, ObjectId } = require('mongodb');
const path = require("path");




const uri = "SERVER ADDRESS";

const client = new MongoClient(uri);


async function main() {


    try {

        await client.connect();


    } catch (e) {
        console.error(e);
    }

}

main().catch(console.error);




const categoryFilter = async (res, req, type) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "application/json");

    try {

        const taskfilter = await client.db("task").collection("task").aggregate([

            {
                $project: {
                    _id: 0,
                    filtered: {
                        $filter: {
                            input: "$productRequests",
                            as: "productRequest",
                            cond: { $eq: ["$$productRequest.category", type] }
                        }
                    }
                }
            },

        ]).toArray();


        const filteredJson = JSON.stringify(taskfilter)



        res.end(filteredJson)

    } catch (error) {
        console.log(error)

    }
}


async function sorter(sortBy, direction, res) {

    const dad = await client.db("task").collection('task').aggregate([

        {
            $unwind: { path: "$productRequests" }
        },

        {
            $sort: { [`productRequests.${sortBy}`]: direction }
        },
        {
            $group: {
                _id: "$_id",
                "productRequests": { $push: "$productRequests" }
            }
        }
    ]).toArray()


    res.writeHead(200, {
        'Content-Type': 'application/json',
    })
    res.end(JSON.stringify(dad))
}


const server = http.createServer(function (req, res) {
    try {
        if (req.url === "/" && req.method === "GET") {
            const taskCollection = client.db("task").collection("task").find({})

            const taskPromise = taskCollection.toArray()

            res.statusCode = 200;

            res.setHeader("Content-type", "application/json");

            taskPromise.then((data) => {


                const dataJson = JSON.stringify(data)

                res.end(dataJson)

            }

            )







        } else if (req.url === "/ui" && req.method === "GET") {


            categoryFilter(res, req, "ui")

        } else if (req.url === "/ux" && req.method === "GET") {


            categoryFilter(res, req, "ux")

        } else if (req.url === "/enhancement" && req.method === "GET") {


            categoryFilter(res, req, "enhancement")

        } else if (req.url === "/bug" && req.method === "GET") {


            categoryFilter(res, req, "bug")

        } else if (req.url === "/feature" && req.method === "GET") {


            categoryFilter(res, req, "feature")

        } else if (req.url === "/sortLeastUpvote" && req.method === "GET") {


            sorter("upvotes", 1, res)


        } else if (req.url === "/sortMostUpvote" && req.method === "GET") {


            sorter("upvotes", -1, res)


        } else if (req.url === "/sortLeastComments" && req.method === "GET") {


            async function sorter() {

                const dad = await client.db("task").collection('task').aggregate([

                    {
                        $unwind: { path: "$productRequests" }
                    },
                    {
                        $addFields: { commentsLength: { $size: "$productRequests.comments" } }
                    },
                    {
                        $sort: { "commentsLength": 1 }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "productRequests": { $push: "$productRequests" }
                        }
                    }
                ]).toArray()


                res.writeHead(200, {
                    'Content-Type': 'application/json',
                })
                res.end(JSON.stringify(dad))
            }


            sorter()






        } else if (req.url === "/sortMostComments" && req.method === "GET") {


            async function sorter() {

                const dad = await client.db("task").collection('task').aggregate([

                    {
                        $unwind: { path: "$productRequests" }
                    },
                    {
                        $addFields: { commentsLength: { $size: "$productRequests.comments" } }
                    },
                    {
                        $sort: { "commentsLength": -1 }
                    },
                    {
                        $group: {
                            _id: "$_id",
                            "productRequests": { $push: "$productRequests" }
                        }
                    }
                ]).toArray()


                res.writeHead(200, {
                    'Content-Type': 'application/json',
                })
                res.end(JSON.stringify(dad))
            }


            sorter()


            // sorter("comments", -1, res)



        } else if (req.url === "/replay" && req.method === "POST") {

            let body = ""

            req.on("data", (chunk) => {

                body += chunk

            })


            req.on("end", () => {

                const bodyObj = JSON.parse(body)
                const commentId = parseInt(bodyObj.commentId)
                const idToFindCommentInBase = bodyObj.idToFindCommentInBase
                const replayObj = bodyObj.replayObj

                console.log(replayObj)


                client.db("task").collection("task").updateOne({
                    "productRequests.id": idToFindCommentInBase,

                }, {

                    $push: { "productRequests.$.comments.$[b].replies": replayObj }


                }, { arrayFilters: [{ "b.id": commentId }] })


                res.writeHead(200, {
                    'Content-Type': 'application/json',
                })
                res.end(JSON.stringify({ message: "delivered" }))



            })

        } else if (req.url === "/sendComment" && req.method === "POST") {
            try {
                let dada = ""
                req.on("data", (chunk) => { return dada += chunk })


                req.on("end", async () => {

                    const bodyObject = JSON.parse(dada)
                    const idForFind = bodyObject.idToFindCommentInBase
                    delete bodyObject.idToFindCommentInBase
                    await client.db("task").collection("task").updateOne({
                        "productRequests.id": idForFind,

                    }, {
                        $push: { "productRequests.$.comments": bodyObject }

                    })

                    res.end("")
                })

            } catch (err) { console.log(err) }

        } else if (req.url === "/user" && req.method === "GET") {

            res.writeHead(200, {
                'Content-Type': 'application/json',
            })


            const user = client.db("task").collection("task").find({}, { projection: { currentUser: 1, _id: 0 } }).toArray().then((data) => {

                res.end(JSON.stringify(data))

            }).catch((err) => { req.end(err) })

        } else if (req.url === "/comments" && req.method === "GET") {


            async function dad() {


                const mama = await client.db("task").collection("task").find({}, { projection: { "productRequests": 1, _id: 0 } }).toArray()


                res.writeHead(200, {
                    'Content-Type': 'application/json',
                })

                res.end(JSON.stringify(mama))



            }

            dad()



        } else if (req.url === "/upvote" && req.method === "POST") {

            let data = ""

            req.on("data", (chunk) => {

                data += chunk

            })

            req.on('end', () => {


                try {

                    const jsonData = JSON.parse(data);

                    const { id, upvotes } = jsonData;
                    const upvoted = true;



                    client.db("task").collection("task").updateOne({

                        "productRequests.id": id,
                    }, {

                        $set: {
                            "productRequests.$.upvotes": upvotes,
                            "productRequests.$.upvoted": upvoted
                        }

                    })


                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });

                    res.end(JSON.stringify({ message: 'Data received successfully' }));

                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON data' }));
                }
            });

        } else if (req.url === "/add/form" && req.method === "POST") {

            let data = '';
            req.on('data', chunk => {
                data += chunk;
            });

            req.on('end', () => {

                try {
                    const jsonData = JSON.parse(data);

                    console.log(jsonData, "esasa");
                    try {


                        client.db("task").collection("task").updateOne(
                            { _id: new ObjectId('65843709fd1d2347248b2675') },
                            { $push: { productRequests: jsonData } }
                        )


                    } catch (err) { console.log(err) }

                    res.writeHead(200, {
                        'Content-Type': 'application/json',
                    });
                    res.end(JSON.stringify({ message: 'Data received successfully' }));
                } catch (error) {
                    console.error('Error parsing JSON:', error);
                    res.writeHead(400, { 'Content-Type': 'application/json' });
                    res.end(JSON.stringify({ error: 'Invalid JSON data' }));
                }
            });


        } else if (req.url === "/all" && req.method === "GET") {
            res.statusCode = 200;
            res.setHeader("Content-type", "application/json")
            async function getAllTask() {

                const allTaskDocument = await client.db("task").collection("task").aggregate([

                    { $addFields: { "filtered": "$productRequests" } },


                    {

                        $project: {
                            productRequests: 0,
                            _id: 0,
                            currentUser: 0
                        },




                    },

                ]).toArray()

                const allTask = JSON.stringify(allTaskDocument)

                res.end(allTask)

            }
            getAllTask().catch((error) => console.log(error))

        }
    } catch (error) {

        console.log(error)
    }

})


server.listen(3022, function () {
    console.log("aqqqq")
})


