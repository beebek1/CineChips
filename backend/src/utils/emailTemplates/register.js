const registrationEmailTemplate = (userName, verifyLink) => `
<!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en">
<head>
  <title>Welcome to CineChip</title>
  <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * { box-sizing: border-box; }
    body { margin: 0; padding: 0; }
    a[x-apple-data-detectors] { color: inherit !important; text-decoration: inherit !important; }
    #MessageViewBody a { color: inherit; text-decoration: none; }
    p { line-height: inherit; }
    .desktop_hide, .desktop_hide table { mso-hide: all; display: none; max-height: 0px; overflow: hidden; }

    @media (max-width: 680px) {
      .row-content { width: 100% !important; }
      .stack .column { width: 100%; display: block; }
      .hero-title { font-size: 32px !important; }
      .side-col { display: none !important; }
    }
  </style>
</head>

<body style="margin:0; padding:0; background-color:#080808; -webkit-text-size-adjust:none; text-size-adjust:none;">

  <!-- Outer wrapper -->
  <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
    style="mso-table-lspace:0pt; mso-table-rspace:0pt; background-color:#080808;">
    <tbody><tr><td>

      <!-- Top spacer -->
      <table align="center" width="680" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt; mso-table-rspace:0pt; margin:0 auto;">
        <tbody><tr><td style="height:32px; line-height:32px; font-size:1px;">&#8202;</td></tr></tbody>
      </table>

      <!-- LOGO ROW -->
      <table align="center" width="680" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt; mso-table-rspace:0pt; margin:0 auto;">
        <tbody><tr>
          <td style="text-align:center; padding:0 20px 24px;">
            <!-- Gold divider lines around logo -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation">
              <tbody><tr>
                <td style="width:80px; height:1px; background-color:#d4af37; opacity:0.4;"></td>
                <td style="text-align:center; padding:0 20px;">
                  <span style="font-family:Georgia, 'Times New Roman', serif; font-size:11px; font-weight:bold;
                    letter-spacing:0.5em; color:#d4af37; text-transform:uppercase;">&#9670; CineChip &#9670;</span>
                </td>
                <td style="width:80px; height:1px; background-color:#d4af37; opacity:0.4;"></td>
              </tr></tbody>
            </table>
          </td>
        </tr></tbody>
      </table>

      <!-- HERO CARD -->
      <table align="center" width="680" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt; mso-table-rspace:0pt; margin:0 auto;">
        <tbody><tr>
          <td style="padding:0 20px;">

            <!-- Card container -->
            <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
              style="border:1px solid #d4af37; border-radius:4px; overflow:hidden;">
              <tbody>

                <!-- Gold top accent bar -->
                <tr>
                  <td style="background-color:#d4af37; height:4px; line-height:4px; font-size:1px;">&#8202;</td>
                </tr>

                <!-- Dark header band -->
                <tr>
                  <td style="background-color:#0d0d0d; padding:48px 56px 40px; text-align:center;
                    border-bottom:1px solid rgba(212,175,55,0.15);">

                    <!-- Ticket icon block -->
                    <div style="display:inline-block; width:72px; height:72px; border-radius:50%;
                      border:2px solid #d4af37; background:transparent; text-align:center; line-height:72px;
                      margin-bottom:28px;">
                      <span style="font-size:28px; line-height:72px; color:#d4af37;">&#127915;</span>
                    </div>

                    <h1 class="hero-title" style="margin:0 0 12px; color:#ffffff; font-family:Georgia, 'Times New Roman', serif;
                      font-size:40px; font-weight:normal; letter-spacing:-0.02em; line-height:1.1; text-transform:uppercase;">
                      Welcome<br><span style="font-weight:bold; font-style:italic;">to the Show</span>
                    </h1>

                    <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:10px;
                      font-weight:bold; letter-spacing:0.4em; color:#d4af37; text-transform:uppercase;">
                      Your Seat Is Reserved
                    </p>
                  </td>
                </tr>

                <!-- White content body -->
                <tr>
                  <td style="background-color:#ffffff; padding:48px 56px;">

                    <p style="margin:0 0 10px; font-family:Arial, Helvetica, sans-serif; font-size:11px;
                      font-weight:bold; letter-spacing:0.3em; color:#d4af37; text-transform:uppercase;">
                      Hello, ${userName}
                    </p>

                    <p style="margin:0 0 24px; font-family:Georgia, 'Times New Roman', serif;
                      font-size:22px; font-weight:normal; color:#101010; line-height:1.3;">
                      Your account has been created.<br>
                      <em>One last step to get started.</em>
                    </p>

                    <p style="margin:0 0 36px; font-family:Arial, Helvetica, sans-serif; font-size:14px;
                      line-height:1.8; color:#666666;">
                      Thank you for joining CineChip. To activate your account and begin booking tickets,
                      please verify your email address by clicking the button below.
                    </p>

                    <!-- Divider -->
                    <table width="100%" border="0" cellpadding="0" cellspacing="0" role="presentation"
                      style="margin-bottom:36px;">
                      <tbody><tr>
                        <td style="height:1px; background:linear-gradient(to right, transparent, #d4af37, transparent);
                          background-color:#d4af37; opacity:0.3;"></td>
                      </tr></tbody>
                    </table>

                    <!-- CTA Button -->
                    <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto;">
                      <tbody><tr>
                        <td style="text-align:center;">
                          <a href="${verifyLink}" target="_blank" style="display:inline-block; text-decoration:none;">
                            <span style="display:inline-block; background-color:#080808; color:#d4af37;
                              font-family:Arial, Helvetica, sans-serif; font-size:10px; font-weight:bold;
                              letter-spacing:0.35em; text-transform:uppercase; padding:16px 48px;
                              border:1px solid #d4af37; border-radius:2px; mso-padding-alt:16px 48px;">
                              &#9670;&nbsp;&nbsp;Verify My Account&nbsp;&nbsp;&#9670;
                            </span>
                          </a>
                        </td>
                      </tr></tbody>
                    </table>

                    <!-- Fallback link -->
                    <p style="margin:32px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px;
                      color:#999999; text-align:center; line-height:1.6;">
                      Button not working? Copy and paste this link into your browser:<br>
                      <a href="${verifyLink}" style="color:#d4af37; text-decoration:underline;
                        word-break:break-all; font-size:11px;">${verifyLink}</a>
                    </p>

                    <p style="margin:24px 0 0; font-family:Arial, Helvetica, sans-serif; font-size:12px;
                      color:#bbbbbb; text-align:center;">
                      This link expires in <strong style="color:#101010;">24 hours</strong>.
                      If you did not create an account, you can safely ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Gold bottom accent bar -->
                <tr>
                  <td style="background-color:#d4af37; height:4px; line-height:4px; font-size:1px;">&#8202;</td>
                </tr>

              </tbody>
            </table>

          </td>
        </tr></tbody>
      </table>

      <!-- FOOTER -->
      <table align="center" width="680" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt; mso-table-rspace:0pt; margin:0 auto;">
        <tbody><tr>
          <td style="padding:32px 40px; text-align:center;">

            <p style="margin:0 0 16px; font-family:Arial, Helvetica, sans-serif; font-size:10px;
              font-weight:bold; letter-spacing:0.4em; color:#d4af37; text-transform:uppercase;">
              CineChip
            </p>

            <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="margin:0 auto 16px;">
              <tbody><tr>
                <td style="padding:0 12px;">
                  <a href="#" style="font-family:Arial, Helvetica, sans-serif; font-size:11px;
                    color:#555555; text-decoration:none; letter-spacing:0.1em;">Unsubscribe</a>
                </td>
                <td style="color:#333333; font-size:10px;">|</td>
                <td style="padding:0 12px;">
                  <a href="#" style="font-family:Arial, Helvetica, sans-serif; font-size:11px;
                    color:#555555; text-decoration:none; letter-spacing:0.1em;">Help</a>
                </td>
                <td style="color:#333333; font-size:10px;">|</td>
                <td style="padding:0 12px;">
                  <a href="#" style="font-family:Arial, Helvetica, sans-serif; font-size:11px;
                    color:#555555; text-decoration:none; letter-spacing:0.1em;">Privacy</a>
                </td>
              </tr></tbody>
            </table>

            <p style="margin:0; font-family:Arial, Helvetica, sans-serif; font-size:11px;
              color:#333333; line-height:1.6;">
              &copy; 2025 CineChip. All rights reserved.
            </p>
          </td>
        </tr></tbody>
      </table>

      <!-- Bottom spacer -->
      <table align="center" width="680" border="0" cellpadding="0" cellspacing="0" role="presentation"
        style="mso-table-lspace:0pt; mso-table-rspace:0pt; margin:0 auto;">
        <tbody><tr><td style="height:32px; line-height:32px; font-size:1px;">&#8202;</td></tr></tbody>
      </table>

    </td></tr></tbody>
  </table>

</body>
</html>
`;

export default registrationEmailTemplate;