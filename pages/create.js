import NewMeetupForm from "../components/meetups/NewMeetupForm";

export default function CreateMeetupPage () {
  function addMeetupHandler(enteredMeetupData) {
    console.log(enteredMeetupData)
  }

  return <NewMeetupForm onAddMeetup={addMeetupHandler} />
}