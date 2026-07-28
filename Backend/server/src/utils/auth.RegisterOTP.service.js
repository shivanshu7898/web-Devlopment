const registerOTPTemplate = (fullName, otp) => {
  return `
  <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;padding:20px;border:1px solid #ddd;border-radius:10px">

    <h2 style="color:#ff6b35;text-align:center;">
      🍕 Welcome to Cravings
    </h2>

    <p>Hello <b>${fullName}</b>,</p>

    <p>Thank you for registering on <b>Cravings</b>.</p>

    <p>Your verification OTP is:</p>

    <div style="
      text-align:center;
      font-size:32px;
      font-weight:bold;
      letter-spacing:8px;
      background:#f5f5f5;
      padding:15px;
      border-radius:8px;
      margin:20px 0;
    ">
      ${otp}
    </div>

    <p>This OTP will expire in <b>5 minutes</b>.</p>

    <p>If you didn't request this, please ignore this email.</p>

    <hr>

    <p style="text-align:center;color:gray;">
      Team Cravings ❤️
    </p>

  </div>
  `;
};

export default registerOTPTemplate;