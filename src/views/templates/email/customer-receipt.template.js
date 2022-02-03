export default (ticket) => `
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
    </style>
    <style type="text/css">
      @media only screen and (max-width: 768px) {
        .order-info {
          font-size: 28px !important;
        }
        .movie-info {
          font-size: 30px !important;
        }
        .theater-info {
          font-size: 26px !important;
        }
        .showtime-title {
          font-size: 24px !important;
        }
        .showtime-date {
          font-size: 26px !important;
        }
        .ticket-info {
          font-size: 26px !important;
        }
        .instructions {
          font-size: 26px !important;
        }
        .summary-title {
          font-size: 28px !important;
        }
        .cart-table {
          font-size: 26px !important;
        }
        .cart-th {
          font-size: 30px !important;
        }
        .cart-total h1 {
          font-size: 36px !important;
        }
        .cart-total h3 {
          font-size: 28px !important;
        }
        .cust-card {
          font-size: 22px !important;
        }
        .promo {
          font-size: 28px !important;
        }
        .footer {
          font-size: 17px !important;
        }
      }
    </style>
</head>
<body style="margin: 0; padding: 0; font-family: arial; background-color: #f8655b; color: #2c2c2c; padding: 5px 0;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
    <tr>
      <td>
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="border-collapse: collapse; background-color: #ffffff;">
          <!-- email content -->
          <tr>
            <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" bgcolor="#fafafa" style="border-collapse: collapse;">
              <!-- header -->
              <tr>
                <td align="center" style="padding: 30px 0;">
                  <img src="https://i.ibb.co/SdHyC0m/flix-logo.png" alt="flix logo" width="70">
                </td>
              </tr>
              <tr>
                <td class="order-info">
                  <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; max-width: 100%; min-width: 100%;">
                    <tr>
                      <td width="48%" style="padding-left: 20px;">Confirmation: 584472918</td>
                      <td align="right" width="48%" style="padding-right: 20px;">${
                        ticket.movie.showTimes.date
                      } 2022</td>
                    </tr>
                  </table>
                </td>
              </tr>
              <!-- dividor -->
              <tr>
                <td>
                  <div style="background-color: #bbbbbb; height: 1px; margin: 12px 0 25px 0; width: 100%;"></div>
                </td>
              </tr>
              <!-- dividor -->
              <!-- email content body -->
              <tr>
                <td>
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                      <!-- movie information -->
                      <tr>
                        <td class="movie-info">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding-left: 20px;">
                            <tr>
                              <td>
                                <h3 style=" margin: 0;">${ticket.movie.title}</h3>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- theater link information -->
                      <tr>
                        <td class="theater-info">
                          <a href="#" style="text-decoration: none; color: currentColor;">
                            <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin: 30px 0; padding: 0 10px 0 20px; max-width: 100%; min-width: 100%; line-height: 0.7;">
                              <tr>
                                <td style="color: #f8655b;">
                                  <p style=" margin: 0;">FLIX Theater | Dine in Theater</p>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p style=" margin: 0;">1099 Flix Place</p>
                                </td>
                                <td align="right">
                                  <img src="https://i.ibb.co/5281jp4/chevron-right-solid.png" width="30">
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <p style=" margin: 0;">Flixville, NJ 07100</p>
                                </td>
                              </tr>
                            </table>
                          </a>
                        </td>
                      </tr>
                      <!-- movie screening information -->
                      <tr>
                        <td>
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="padding: 10px 20px 0 20px;">
                            <tr>
                              <td class="showtime-title">
                                <h4 style=" margin: 0;">Showtime</h4>
                              </td>
                            </tr>
                            <tr>
                              <td class="showtime-date">
                                <h3 style=" margin: 0;">${ticket.movie.showTimes.date} 2022 at ${
  ticket.movie.showTimes.time
}pm</h3>
                              </td>
                            </tr>
                            <tr>
                              <td class="ticket-info">
                                <table border="0" cellpadding="3" cellspacing="0" width="100%" style="margin-top: 25px; max-width: 100%; padding: 0 50px;">
                                  <tr>
                                    <td align="left">
                                      <h4 style="margin: 0; width: 130px;">Screen</h4>
                                    </td>
                                    <td align="center">
                                      <h4 style="margin: 0; width: 130px;">Seat(s)</h4>
                                    </td>
                                    <td align="right">
                                      <h4 style="margin: 0; width: 130px;">Tickets</h4>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td align="left">
                                      <p style="margin: 0; width: 130px; padding-left: 18px;">${
                                        ticket.movie.screenRoom
                                      }</p>
                                    </td>
                                    <td align="center">
                                      <p style="margin: 0; width: 130px;">${
                                        ticket.seats[0].id.seat_id
                                      }</p>
                                    </td>
                                    <td align="right">
                                      <p style="margin: 0; width: 130px;">${ticket.qty} Tickets</p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- qr code -->
                      <tr>
                        <td align="center" style="padding: 40px 0;">
                          <a rel="nofollow" href="https://www.qr-code-generator.com" border="0">
                            <img src="https://chart.googleapis.com/chart?cht=qr&chl=http%3A%2F%2Ftest.com&chs=180x180&choe=UTF-8&chld=L|2" role="img" alt="qr-code" width="250px">
                          </a>
                        </td>
                      </tr>
                      <!-- direct attention -->
                      <tr>
                        <td style="text-align: center;" class="instructions">
                          <p>
                            Have this ready and go directly to the ticket taker to have your mobile ticket scanned.
                          </p>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <tr>
                        <td style="padding: 0 42px;">
                          <div style="background-color: #bbbbbb; height: 1px; margin: 12px 0; width: 100%;"></div>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <!-- purchase summary -->
                      <tr>
                        <td style="padding: 0 40px;">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 100%; border-collapse: collapse;">
                            <tr>
                              <td style="margin: 0 0 20px 0;" class="summary-title">
                                <h1>Summary</h1>
                              </td>
                            </tr>
                            <!-- summary cart -->
                            <tr>
                              <table border="0" cellpadding="5" cellspacing="0" width="100%" style="max-width: 100%;">
                                <!-- default tablehead cells -->
                                <tr class="cart-table cart-th">
                                  <td align="left">
                                    <p style="width: 180px;">Description</p>
                                  </td>
                                  <td align="center">
                                    <p style="margin: 0; width: 180px;">Qty</p>
                                  </td>
                                  <td align="right">
                                    <p style="margin: 0; width: 180px;">Total</p>
                                  </td>
                                </tr>
                                <!-- cart items -->
                                <tr class="cart-table cart-tb">
                                  <td align="left">
                                    <p style="margin: 0; width: 180px;">${
                                      ticket.seats[0].id.seat_type
                                    }(s)</p>
                                  </td>
                                  <td align="center">
                                    <p style="margin: 0; width: 180px;">${
                                      ticket.seats[0].id.qty
                                    }</p>
                                  </td>
                                  <td align="right">
                                    <p style="margin: 0; width: 180px;">$${ticket.totalPrice.toFixed(
                                      2
                                    )}</p>
                                  </td>
                                </tr>
                              </table>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <tr>
                        <td style="padding: 0 42px;">
                          <div style="background-color: #bbbbbb; height: 1px; margin: 20px 0 10px 0; width: 100%;"></div>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <!-- grand total -->
                      <tr>
                        <td class="cart-total">
                          <table border="0" cellpadding="10" cellspacing="0" width="100%" style="padding: 0 45px 5px 0;  max-width: 100%; min-width: 100%;">
                            <tr align="right">
                              <td valign="bottom">
                                <h3 style="margin: 0;">Total:</h3>
                              </td>
                              <td>
                                <h1 style="margin: 0;">$${ticket.totalPrice.toFixed(2)}</h1>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr align="right">
                        <td style="padding-right: 45px;" class="cust-card">
                          <p style="margin: 0; margin-bottom: 20px;">Charged to card ending in x4930</p>
                        </td>
                      </tr>
                      <!-- grand total -->
                      <!-- email promo -->
                      <tr>
                        <td class="promo" style="font-size: 20px;">
                          <table border="0" cellpadding="5" cellspacing="0" width="100%" style="border-collapse: collapse; margin-top: 30px;">
                            <!-- promo items -->
                            <tr>
                              <td>
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                  <tr>
                                    <td>
                                      <img src="https://i.ibb.co/80pXX8Y/shop-rewards.webp" role="img" alt="member rewards" width="100%" style="max-width: 100%; max-height: 100%;">
                                    </td>
                                  </tr>
                                  <tr align="center" valign="bottom">
                                    <td style="padding: 10px 40px; line-height: 1.5;" class="mobile-view__caption">
                                      <p>As a member, you earn points for each dollar spent. Which you can use to redeem towards your future visit. Members also receive Birthday gifts, 
                                        discounts, and much more. To learn more about our memberships <a href="#" role="link" style="color: #f8655b;">visit us.</a>
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                            <tr>
                              <td style="padding: 0 0 50px;">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;">
                                  <tr>
                                    <td>
                                      <img src="https://i.ibb.co/mB6gfhV/dine-in.jpg" role="img" alt="member rewards" width="100%" style="max-width: 100%; max-height: 100%;">
                                    </td>
                                  </tr>
                                  <tr align="center" valign="bottom">
                                    <td style="padding: 10px 40px; line-height: 1.5;" class="mobile-view__caption">
                                      <p>
                                        Place your order at the concession counter and head to your reserved seat or give us a ring using our convenient button located on the arm rest of your seat.
                                        We’ll deliver everything right to you.
                                      </p>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <tr>
                        <td style="padding: 0 42px;">
                          <div style="background-color: #bbbbbb; height: 1px; margin: 12px 0; width: 100%;"></div>
                        </td>
                      </tr>
                      <!-- dividor -->
                      <!-- footer -->
                      <tr>
                        <td style="font-size: 12px;" class="footer">
                          <table border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse;  max-width: 100%;">
                            <tr align="center">
                              <td>
                                <p style="margin: 0;">If you have any questions, please contact us at <a href="#" role="link" style="color: #f8655b;">flixsupport@flix.com</a></p>
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
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;
