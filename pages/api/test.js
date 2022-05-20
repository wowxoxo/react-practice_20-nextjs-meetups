export default async function handler(req, res) {
  console.log("req", req);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ status: 200 })
  //   })
  // }, 1000)

  if (req.method === "GET") {
    res.status(200).json({ name: "Danger" });
    // res.status(200).send("Success");
  } else {
    res.status(500);
  }
}
