import { MeetupDetail } from "../components/meetups/MeetupDetail";

export default function MeetupDetails({ meetupData = {} }) {
  return <MeetupDetail title={meetupData.title}
  image={meetupData.image}
  address= {meetupData.address}
  description= {meetupData.description}  />
}

export async function getStaticPaths() {
  return {
    fallback: 'blocking',
    paths: [
      {
        params: {
          meetupId: 'm1'
        }
      },
      {
        params: {
          meetupId: 'm2'
        }
      }
    ]
  }
}

export async function getStaticProps(context) {
  // fetch data for a single meetup
  const meetupId = context.params.meetupId

  console.log('meetupId', meetupId)


  const response = await fetch(`${process.env.REACT_APP_BASE_URL}/meetups/${meetupId}.json`)
  
  const data = await response.json();

  console.log('data', data)



  if (!response.ok) {
    throw new Error(data.message || "Could not fetch meetup.");
  }

  const loadedMeetup = {
    id: meetupId,
    ...data
  };

  console.log('loadedMeetup', loadedMeetup)

  return {
    props: {
      meetupData: loadedMeetup
    }
  }
}