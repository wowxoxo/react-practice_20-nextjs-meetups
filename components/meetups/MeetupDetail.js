import classes from "./MeetupDetail.module.css";
import Image from "next/image";

export function MeetupDetail(props) {
  return (
    <section className={classes.detail}>
      {/* <img src={props.image} alt={props.image}/> */}
      <div className={classes.container}>
        <Image
          src={props.image}
          alt={props.title}
          height0="auto"
          width0="100%"
          layout="fill"
          objectFit="contain"
        />
      </div>
      <h1>{props.title}</h1>
      <address>{props.address}</address>
      <p>{props.description}</p>
    </section>
  );
}
