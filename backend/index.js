const express = require("express");
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const PORT = process.env.PORT || 8080
require('./model/connector')
const BookMovie = require('./model/schema')
app.use(bodyParser.json());
app.use(cors())



app.get('/ping', (req, res) => {
  res.send('PONG');
});


/////////to Show details

app.get("/api/booking", async (req, res) => {
    try {
      // Fetch the most recent booking
      const data = await BookMovie.find().sort({ _id: -1 }).limit(1);
  
      // Check if any booking was found
      if (data.length === 0) {
        return res.status(200).json({
          message: "No Previous Booking found!",
        });
      }
  
      // Respond with the most recent booking
      return res.status(200).json({
        message: "Last booking found!",
        data: data[0], // data is an array, so access the first element
      });
    } catch (error) {
      // Handle any errors
      console.error('Error fetching booking:', error);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  });
  


///////// Data inserting
app.post('/api/booking',async(req,res)=>{
    const { movie, slot, seats } = req.body
    try{
      if (!movie || typeof movie !== 'string') {
        return res.status(400).json({ message: "Please provide  movie name" });
      }
      if (!slot || typeof slot !== 'string') {
        return res.status(400).json({ message: "Please provide slot" });
      }
      if (!seats || typeof seats !== 'object' || Object.keys(seats).length === 0) {
        return res.status(400).json({ message: "Please provide seats" });
      }
            const respone = new BookMovie({
              movie: movie,
              slot: slot,
              seats: seats,
          })
      
        await  respone.save()
        res.status(200)
        .json({message:'Booking Successful'})
    }catch(error){
        res.status(500)
        .json({message:'Booking Failed'})
    }
})



app.listen(PORT, () => console.log(`App listening on port ${PORT}!`));

