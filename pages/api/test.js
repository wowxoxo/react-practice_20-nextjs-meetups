export default function handler(req, res) {
  console.log("req", req);
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ status: 200 })
  //   })
  // }, 1000)

  if (req.method === "GET") {
    res.status(200).json({ name: "Danger" });
  } else {
    res.status(500);
  }
}
