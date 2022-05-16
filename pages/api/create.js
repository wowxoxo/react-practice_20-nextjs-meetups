// /api/create

async function handler(req, res)  {
  if (req.method === 'POST') {
    const data = req.body

    try {
      const result = fetch(`${process.env.REACT_APP_BASE_URL}/meetups.json`, {
        method: 'POST',
        body: JSON.stringify(data),
      })
  
      console.log(result)
      res.status(201).json(result)
    } catch (error) {
      consol.log(error)
      res.status(500)
    }
    
  }
} 

export default handler