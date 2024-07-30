const nodemailer = require("nodemailer");

const transport = nodemailer.createTransport({
  host: "smtpout.secureserver.net",
  secure: true,
  secureConnection: false,
  tls: {
    ciphers: "SSLv3",
  },
  requireTLS: true,
  port: 465,
  debug: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const sendMail = async ({ name, email, message }) => {
  try {
    const t = await transport.sendMail({
      from: process.env.SMTP_USER,
      to: process.env.SMTP_USER,
      subject: "Website Form Submission2",
      text: "Hello World2",
      html: `<h3>From: ${name}</h3>
            <h3>Email: ${email}</h3>
            <hr />
            <p>${message}</p>
            `,
    });
    console.log(t);
    return { OK: true, status: t.response, from: t.envelope.from, to: t.envelope.to[0] };
  } catch (error) {
    return { OK: false, status: error.message };
  }
};

module.exports = sendMail;
