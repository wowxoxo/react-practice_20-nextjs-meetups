import { MongoClient } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import MeetupList from "../components/meetups/MeetupList";

export default function HomePage(props) {
  return (
    <Fragment>
      <Head>
        <title>React Meetups</title>
        <meta name="description" content="Browse a huge list of out meetups" />
      </Head>
      <MeetupList meetups={props.meetups} />
    </Fragment>
  );
}

// export function getServerSideProps(context) {
// const req = context.req
// const res = context.res

// return {
//   props: {
//     meetups: DUMMY_MEETUPS
//   }
// }
// }

// app.post('/', (req: Request, res: Response) => {
//   req.body
//   res.sendStatus(200)
// })

// export async function getStaticProps() {
//   // fetch data from an API
//   const response = await fetch(
//     `${process.env.REACT_APP_BASE_URL}/meetups.json`
//   );

//   const data = await response.json();
//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch meetups.");
//   }

//   const transformedMeetups = [];

//   for (const key in data) {
//     const quoteObj = {
//       id: key,
//       ...data[key]
//     };

//     transformedMeetups.push(quoteObj);
//   }

//   return {
//     props: {
//       meetups: transformedMeetups
//     },
//     revalidate: 3600
//   };
// }

export async function getStaticProps() {
  const client = await MongoClient.connect(process.env.REACT_APP_MONGO_URL);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        address: meetup.address,
        image: meetup.image,
        id: meetup._id.toString()
      }))
    },
    revalidate: 10
  };
}
