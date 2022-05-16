import { MeetupDetail } from "../components/meetups/MeetupDetail";

export default function MeetupDetails(props) {
  return <MeetupDetail title={props.meetupData.title}
  image={props.meetupData.image}
  address= {props.meetupData.address}
  description= {props.meetupData.description}  />
}

export async function getStaticPaths() {
  return {
    fallback: false,
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

  return {
    props: {
      meetupData: {
        id: meetupId,
        title:  "First meetup",
        image: "https://images.unsplash.com/photo-1610197361600-33a3a5073cad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
        address: "Saint Petersburg, Petergof",
        description: "Some people meet at bar"
      }
    }
  }
}