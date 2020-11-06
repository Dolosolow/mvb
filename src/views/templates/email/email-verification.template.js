export default (verifyToken) => `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en-GB">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>FLIX | Theater Confirmation Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style type="text/css">
      a[x-apple-data-detectors] {color: inherit !important;}
      body {
          font-size: 16px;
      }
      .content-body {
          font-size: 18px;
        }
      .btn-submit {
        background-color: #f8655b;
        color: #fff !important;
        font-size: 20px;
        padding: 15px 25px;
        text-decoration: none;
      }
      .footer {
        font-size: 12px;
        padding: 0 20px;
      }
    </style>
    <style type="text/css">
      @media only screen and (max-width: 768px) {
        .header-title {
          font-size: 24px !important;
          text-align: center;
        }
        .content-body {
          font-size: 24px !important;
        }
        .btn-submit {
          font-size: 25px !important;
          color: #000000 !important;
        }
        .footer {
          font-size: 16px !important;
        }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: arial; color: #2c2c2c; padding: 50px 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
    <tr>
      <!-- email content container -->
      <td>
        <table align="center" border="0" bgcolor="#fafafa" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse;">
          <tr>
            <!-- img -->
            <td>
              <img src="https://i.ibb.co/WtGnf4x/Frame-2.png" role="img" alt="verify your account" width="100%">
            </td>
          </tr>
          <tr>
            <td>
              <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <!-- header text -->
                  <td align="center" class="header-title">
                    <h1>Just one more step...</h1>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="content-body">
                    <p style="margin: 0; width: 450px;">
                      Hey Jose, you're almost ready to start enjoying FLIX membership perks. Simply click the button below
                      to verify your email address.
                    </p>
                  </td>
                </tr>
                <tr>
                  <td align="center" class="btn-wrapper" style="padding: 50px 0;">
                    <a href="http://localhost:5001/verify?token=${verifyToken}" id="verify-e-btn" class="btn-submit">Verify email address</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <!-- dividor -->
          <tr>
            <td style="padding: 0 42px;">
              <div style="background-color: #bbbbbb; height: 1px; margin: 12px 0 25px 0; width: 100%;"></div>
            </td>
          </tr>
          <!-- dividor -->
          <tr>
            <td class="footer">
              <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                <tr>
                  <td align="center">
                    <p style="margin: 0;">
                      If you did not create a FLIX account using this address, please ignore this email or contact us at
                      <a href="#" role="link" style="color: #f8655b;">flixsupport@flix.com</a>
                    </p>
                  </td>
                </tr>
                <tr align="center">
                  <td>
                    <p>2020 FLIX Dine-in Theater 1099 Flix Place Flixville, NJ 07100</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;