const app = require('./app')
const port = process.env.PORT

// app.use((req, res, next) => {
//   if (req.method === "GET") {
//     res.send('GET requests are disabled')
//   } else {
//       next()
//   }
// });


// app.use((req, res, next) => {

//   res.status(503).send("Sorry, site is under maitenance right now")
// });


app.listen(port, () => {
  console.log("Server is up on port " + port);
});
