import { MongoClient, ObjectId } from "mongodb";
import { Fragment } from "react";
import Head from "next/head";

import { MeetupDetail } from "../components/meetups/MeetupDetail";

export default function MeetupDetails({ meetupData }) {
  return (
    <Fragment>
      <Head>
        <title>{meetupData.title}</title>
        <meta name="description" content={meetupData.description} />
      </Head>
      {!meetupData && <p>No data at current time</p>}
      {meetupData && (
        <MeetupDetail
          title={meetupData.title}
          image={meetupData.image}
          address={meetupData.address}
          description={meetupData.description}
        />
      )}
    </Fragment>
  );
}

// export async function getStaticPaths() {
//   return {
//     fallback: "blocking",
//     paths: [
//       {
//         params: {
//           meetupId: "m1"
//         }
//       },
//       {
//         params: {
//           meetupId: "m2"
//         }
//       }
//     ]
//   };
// }

// export async function getStaticProps(context) {
//   // fetch data for a single meetup
//   const meetupId = context.params.meetupId

//   console.log('meetupId', meetupId)

//   const response = await fetch(`${process.env.REACT_APP_BASE_URL}/meetups/${meetupId}.json`)

//   const data = await response.json();

//   console.log('data', data)

//   if (!response.ok) {
//     throw new Error(data.message || "Could not fetch meetup.");
//   }

//   const loadedMeetup = {
//     id: meetupId,
//     ...data
//   };

//   console.log('loadedMeetup', loadedMeetup)

//   return {
//     props: {
//       meetupData: loadedMeetup
//     }
//   }
// }

export async function getStaticPaths() {
  const client = await MongoClient.connect(process.env.REACT_APP_MONGO_URL);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const meetups = await meetupsCollection
    .find({}, { projection: { _id: 1, title: 1 } })
    .toArray();

  client.close();

  // console.log("meetups1", meetups);

  return {
    fallback: "blocking",
    paths: meetups.map((meetup) => ({
      params: { meetupId: meetup._id.toString() }
    }))
  };
}

export async function getStaticProps(context) {
  const meetupId = context.params.meetupId;

  const client = await MongoClient.connect(process.env.REACT_APP_MONGO_URL);

  const db = client.db();

  const meetupsCollection = db.collection("meetups");

  const selectedMeetup = await meetupsCollection.findOne({
    _id: ObjectId(meetupId)
  });

  client.close();

  return {
    props: {
      meetupData: {
        id: selectedMeetup._id.toString(),
        title: selectedMeetup.title,
        address: selectedMeetup.address,
        image: selectedMeetup.image,
        description: selectedMeetup.description
      }
    }
  };
}
