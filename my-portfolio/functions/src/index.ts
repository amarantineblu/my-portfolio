import * as functions from "firebase-functions/v1";
import * as admin from "firebase-admin";
// Import nodemailer without TypeScript types to avoid missing @types error
// (use require so TS treats it as any when types are not installed)
const nodemailer: any = require("nodemailer");

admin.initializeApp();

// Mailtrap SMTP configuration
const transporter = nodemailer.createTransport({
  host: "sandbox.smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "7c710197bfc9c7",   // from Mailtrap dashboard
    pass: "****cc1c"    // from Mailtrap dashboard
  }
});

export const sendVisitorEmail = functions.firestore
  .document("visitors/{visitorId}")
  .onCreate(async (snap: functions.firestore.DocumentSnapshot, context: functions.EventContext) => {
    const data = snap.data();

    const mailOptions = {
      from: "noreply@eliomamarcus.vercel.app",
      to: "lebmarcus5@gmail.com", // Mailtrap will catch this
      subject: "New Website Visitor",
      text: `New visitor logged:
      URL: ${data?.url || ""}
      Referrer: ${data?.referrer || ""}
      UserAgent: ${data?.userAgent || ""}
      Language: ${data?.language || ""}
      ScreenSize: ${data?.screenSize || ""}
      Time: ${data?.timestamp || ""}`
    };

    try {
      await transporter.sendMail(mailOptions);
      console.log("Email sent via Mailtrap");
    } catch (err) {
      console.error("Error sending email:", err);
    }
  });
