export function createWelcomeEmailTemplate(name, clientURL, joinedAt) {
  return `
<!DOCTYPE html>
<html lang="en" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>Welcome to Chatify</title>
</head>
<body style="margin:0;padding:0;background-color:#0a0a0f;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI','Helvetica Neue',Arial,sans-serif;">

  <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">
    Your Chatify account is ready. Start connecting.
  </div>

  <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#0a0a0f;">
    <tr>
      <td align="center" style="padding:48px 16px;">
        <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">

          <!-- ── HEADER ── -->
          <tr>
            <td style="background:linear-gradient(135deg,#13131a 0%,#1a1a2e 50%,#13131a 100%);
                        border-radius:16px 16px 0 0;padding:52px 48px 44px;text-align:center;
                        border:1px solid #2a2a3d;border-bottom:none;">

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 28px;">
                <tr>
                  <td style="background:linear-gradient(135deg,#6c63ff 0%,#4f46e5 100%);
                              border-radius:16px;padding:0;">
                    <div style="width:56px;height:56px;line-height:56px;text-align:center;
                                border-radius:16px;font-size:28px;font-weight:800;color:#ffffff;">
                      C
                    </div>
                  </td>
                </tr>
              </table>

              <div style="font-size:11px;font-weight:700;letter-spacing:4px;
                          text-transform:uppercase;color:#6c63ff;margin-bottom:20px;">
                Chatify
              </div>

              <h1 style="margin:0 0 16px;font-size:32px;font-weight:700;
                          line-height:1.2;color:#f0f0ff;letter-spacing:-0.5px;">
                Welcome aboard, ${name}.
              </h1>

              <p style="margin:0 auto;font-size:16px;line-height:1.6;
                         color:#8888aa;max-width:420px;">
                Your account has been created. You are now part of a real-time messaging platform built for speed, clarity, and security.
              </p>

            </td>
          </tr>

          <!-- ── SHIMMER ── -->
          <tr>
            <td style="background-color:#0f0f1a;
                        border-left:1px solid #2a2a3d;border-right:1px solid #2a2a3d;
                        padding:0 48px;">
              <div style="height:1px;background:linear-gradient(to right,transparent,#6c63ff,transparent);"></div>
            </td>
          </tr>

          <!-- ── BODY ── -->
          <tr>
            <td style="background-color:#0f0f1a;padding:40px 48px;
                        border-left:1px solid #2a2a3d;border-right:1px solid #2a2a3d;">

              <p style="margin:0 0 32px;font-size:15px;line-height:1.8;color:#9999bb;">
                Everything is set up and ready. Use the button below to sign in and explore your dashboard, update your profile, and start your first conversation.
              </p>

              <!-- CTA -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 40px;">
                <tr>
                  <td style="border-radius:10px;
                              background:linear-gradient(135deg,#6c63ff 0%,#4f46e5 100%);">
                    <a href="${clientURL}"
                       style="display:inline-block;padding:14px 36px;
                               font-size:15px;font-weight:600;color:#ffffff;
                               text-decoration:none;letter-spacing:0.2px;border-radius:10px;">
                      Open Chatify
                    </a>
                  </td>
                </tr>
              </table>

              <div style="height:1px;background:linear-gradient(to right,transparent,#2a2a3d,transparent);margin-bottom:36px;"></div>

              <!-- ── ACCOUNT CARD ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#13131f;border:1px solid #2a2a3d;
                             border-radius:12px;margin-bottom:20px;">
                <tr>
                  <td style="padding:28px 28px 6px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:3px;
                                text-transform:uppercase;color:#6c63ff;margin-bottom:20px;">
                      Account Information
                    </div>
                  </td>
                </tr>
                <tr>
                  <td style="padding:0 28px 22px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td style="padding:11px 0;border-bottom:1px solid #1e1e2e;">
                          <span style="font-size:13px;color:#55556a;">Name</span>
                        </td>
                        <td style="padding:11px 0;border-bottom:1px solid #1e1e2e;text-align:right;">
                          <span style="font-size:13px;font-weight:500;color:#d0d0f0;">${name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding:11px 0;">
                          <span style="font-size:13px;color:#55556a;">Member since</span>
                        </td>
                        <td style="padding:11px 0;text-align:right;">
                          <span style="font-size:13px;font-weight:500;color:#d0d0f0;">${joinedAt}</span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>

              <!-- ── SECURITY CARD ── -->
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="background-color:#110d1f;border:1px solid #2d1f4a;border-radius:12px;">
                <tr>
                  <td style="padding:22px 26px;">
                    <div style="font-size:10px;font-weight:700;letter-spacing:3px;
                                text-transform:uppercase;color:#9d7fe0;margin-bottom:10px;">
                      Security Notice
                    </div>
                    <p style="margin:0;font-size:13px;line-height:1.7;color:#7a7a99;">
                      If you did not create a Chatify account, please disregard this email or contact our support team immediately. No action is required if you did not make this request.
                    </p>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── FOOTER ── -->
          <tr>
            <td style="background-color:#0a0a0f;border-radius:0 0 16px 16px;
                        padding:32px 48px;text-align:center;
                        border:1px solid #2a2a3d;border-top:1px solid #1a1a2e;">

              <p style="margin:0 0 16px;font-size:13px;color:#44445a;">
                The Chatify Team
              </p>

              <table cellpadding="0" cellspacing="0" border="0" style="margin:0 auto 20px;">
                <tr>
                  <td style="padding:0 12px;">
                    <a href="${clientURL}/privacy"
                       style="font-size:12px;color:#55556a;text-decoration:none;">Privacy Policy</a>
                  </td>
                  <td style="color:#2a2a3d;font-size:12px;">|</td>
                  <td style="padding:0 12px;">
                    <a href="${clientURL}/terms"
                       style="font-size:12px;color:#55556a;text-decoration:none;">Terms of Service</a>
                  </td>
                  <td style="color:#2a2a3d;font-size:12px;">|</td>
                  <td style="padding:0 12px;">
                    <a href="${clientURL}/support"
                       style="font-size:12px;color:#55556a;text-decoration:none;">Support</a>
                  </td>
                </tr>
              </table>

              <p style="margin:0;font-size:11px;color:#33334a;line-height:1.6;">
                You received this email because an account was created with your email address.<br/>
                &copy; 2025 Chatify. All rights reserved.
              </p>

            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
  `;
}
