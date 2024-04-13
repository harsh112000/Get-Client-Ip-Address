const axios = require("axios");
const express = require("express");
const app = express();
const requestIp = require("request-ip");

app.use((req, res, next) => {
  const serverIP = req.socket.remoteAddress;
  console.log(`Server IP: ${serverIP}`, req.ip);
  next();
});

app.use((req, res, next) => {
  // Method 1:
  var clientIp = requestIp.getClientIp(req);
  // Methode 2:
  var ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || null;

  console.log(`Request from IP: ${clientIp} :${ip}`);
  next();
});
// app.get('/', (req, res) => {
//   res.send(`Your IP Address is ${clientIp}.`)
// })

app.get("/random-user", async (req, res) => {
  try {
    const response = await axios.get("https://randomuser.me/api/");
    const userData = response.data.results[0];

    res.json(userData);
  } catch (error) {
    console.error("Error fetching random user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
