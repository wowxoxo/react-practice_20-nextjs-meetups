import MeetupList from "../components/meetups/MeetupList";

const DUMMY_MEETUPS = [
  {
    id: 'm1',
    title: "First meetup",
    image: "https://images.unsplash.com/photo-1610197361600-33a3a5073cad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80",
    address: "Saint Petersburg, Petergof",
    description: "Some people meet at bar"
  },
  {
    id: 'm2',
    title: "Second meetup",
    image: "https://dn1.vtomske.ru/a/b5cb6aab1353b239a4c576e72d8559b9_lg9aa2de.jpg",
    address: "Tomsk",
    description: "Some people meet at big supermarket"
  },
]

export default function HomePage(props) {
  return <MeetupList meetups={props.meetups}/>
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

export function getStaticProps() {
  // fetch data from an API
  return {
    props: {
      meetups: DUMMY_MEETUPS
    },
    revalidate: 3600
  }
}