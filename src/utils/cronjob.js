const cron = require("node-cron");
const { subDays, startOfDay, endOfDay } = require("date-fns");
const sendEmail = require("./sendEmail");
const ConnectionRequestModel = require("../models/connectionRequest");
// This cron job will run every day at 8 AM
cron.schedule("0 8 * * *", async () => {
  // Send email to all people who get requests the previous day
  try {
    const yesterday = subDays(new Date(), 1);
    const yesterdayStart = startOfDay(yesterday);
    const yesterdayEnd = endOfDay(yesterday);
    const pendingRequests = await ConnectionRequestModel.find({
      status: "interested",
      createdAt: {
        $gte: yesterdayStart,
        $lte: yesterdayEnd,
      },
    }).populate("fromUserId toUserId");
    const listOfEmails = [
      ...new Set(pendingRequests.map((row) => row.toUserId.emailId)),
    ];
    console.log(listOfEmails);
    for (const email of listOfEmails) {
      try {
        // send email
        const res = await sendEmail.run(
          "You have new connection requests on DevTinder",
          `You have ${
            pendingRequests.filter((row) => row.toUserId.emailId === email)
              .length
          } new connection requests. Please login to your account to view and respond to them.`
        );
        console.log("Email sent to ", email, " response: ", res);
      } catch (err) {
        console.error("Error sending email to ", email, " error: ", err);
      }
    }
  } catch (err) {
    console.error(err);
  }
});
