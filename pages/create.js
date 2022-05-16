import NewMeetupForm from "../components/meetups/NewMeetupForm";
import { useRouter } from 'next/router'

export default function CreateMeetupPage () {
  const router = useRouter()

  async function addMeetupHandler(enteredMeetupData) {
    const response = await fetch('/api/create', { method: 'POST', body: JSON.stringify(enteredMeetupData), headers: { 'Content-Type': 'application/json'}})
    console.log(enteredMeetupData)

    const data = await response.json()

    console.log(data)

    router.replace('/')
    
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}