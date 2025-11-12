const nodemailer =  require("nodemailer") 
// ✅ Send Result Mail Controller
const sendResultMail = async (req, res) => {
  try {
    const { email, score, total, percentage, isPass } = req.body;

    if (!email || score === undefined || !total || !percentage) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // ✅ Gmail SMTP setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // from .env file
        pass: process.env.EMAIL_PASS, // from .env file
      },
    });

    // ✅ Email content
    const mailOptions = {
      from: `"Apptitude Test" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your Apptitude Test Result 🎯",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border-radius: 10px; background: #f9f9f9;">
          <h2 style="color: #007bff;">Apptitude Test Result</h2>
          <p>Hi there 👋,</p>
          <p>Here’s your test result summary:</p>

          <ul style="line-height: 1.8;">
            <li><strong>Score:</strong> ${score}/${total}</li>
            <li><strong>Percentage:</strong> ${percentage}%</li>
            <li><strong>Status:</strong> ${isPass ? "✅ Pass" : "❌ Fail"}</li>
          </ul>

          <p>Keep learning and improving 🚀</p>
          <p style="font-size: 14px; color: #555;">– Team Apptitude</p>
        </div>
      `,
    };

    // ✅ Send email
    await transporter.sendMail(mailOptions);

    console.log(`✅ Result mail sent to ${email}`);
    res.status(200).json({ message: "Result mail sent successfully" });
  } catch (error) {
    console.error("❌ Error sending result mail:", error);
    res.status(500).json({ message: "Failed to send result mail", error: error.message });
  }
};
module.exports = {sendResultMail}