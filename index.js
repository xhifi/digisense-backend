const express = require("express");
const sendMail = require("./sendMail");

const app = express();
const port = 3100;
app.use(express.json());

app.post("/send-mail", async (req, res) => {
  const { name, email, message } = req.body;

  const mail = await sendMail({ name, email, message });
  if (mail.OK) {
    return res.status(200).json({ mail });
  }
  return res.status(500).json({ mail });
});

app.listen(port, (err) => {
  if (err) throw new Error(err.message);
  console.log(`Example app listening at http://localhost:${port}`);
});
