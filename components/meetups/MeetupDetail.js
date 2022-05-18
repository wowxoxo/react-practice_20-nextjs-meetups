import classes from  './MeetupDetail.module.css'
import Image from 'next/image'

export function MeetupDetail(props) {
  return <section className={classes.detail}>
    <img src={props.image} alt={props.image}/>
    {/* <Image src={props.image} alt={props.image} height="auto" width="100%"/> */}
    <h1>{props.title}</h1>
    <address>{props.address}</address>
    <p>{props.description}</p>
  </section>
}