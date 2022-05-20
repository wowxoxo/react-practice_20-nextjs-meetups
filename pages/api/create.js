// /api/create

import { MongoClient } from "mongodb";

// async function handler(req, res)  {
//   if (req.method === 'POST') {
//     const data = req.body

//     try {
//       const result = fetch(`${process.env.REACT_APP_BASE_URL}/meetups.json`, {
//         method: 'POST',
//         body: JSON.stringify(data),
//       })

//       console.log(result)
//       res.status(201).json(result)
//     } catch (error) {
//       consol.log(error)
//       res.status(500)
//     }

//   }
// }

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;

    const client = await MongoClient.connect(process.env.REACT_APP_MONGO_URL);

    const db = client.db();

    const meetupsCollection = db.collection("meetups");

    const result = await meetupsCollection.insertOne(data);

    console.log("result", result);

    client.close();

    res.status(201).send("Meetup inserted!");
  }
}

export default handler;
