export default async function handler (req, res) {
  console.log('req', req)
  // return new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve({ status: 200 })
  //   })
  // }, 1000)

  if (req.method === 'GET') {
    res.status(200)
  } else {
    res.status(500)
  }
}