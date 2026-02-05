import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT || 587),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const { name, email, service } = await req.json();

    await transporter.sendMail({
      from: `"Clinic Appointment" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_TO,
      replyTo: email,
      subject: "New Appointment Request",
      html: `
        <h2>New Appointment Request</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Service:</b> ${service}</p>

      `,
    });

    return Response.json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("Appointment email error:", error);
    return Response.json({ success: false, message: "Failed to send email" }, { status: 500 });
  }
}
