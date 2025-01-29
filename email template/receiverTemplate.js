export default function generateReceiverEmail(data) {
    const { receiver } = data;

    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Template</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            color: #333;
        }
        .email-container {
            max-width: 600px;
            margin: 20px auto;
            background: #ffffff;
            border: 1px solid #ddd;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        .email-header {
            background-color: #3f97cf;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .email-header h1 {
            margin: 0;
            font-size: 24px;
        }
        .email-body {
            padding: 20px;
        }
        .email-body h2 {
            font-size: 20px;
            margin-bottom: 10px;
            color: #ff6f00;
        }
        .email-body p {
            margin: 5px 0;
        }
        .email-footer {
            text-align: center;
            padding: 15px;
            background-color: #f1f1f1;
            color: #777;
            font-size: 14px;
        }
        .email-footer a {
            color: #3f97cf;
            text-decoration: none;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>receiver Details</h1>
        </div>
        <div class="email-body">
            <h2>${receiver.name}</h2>
            <p><strong>Email:</strong> ${receiver.email}</p>
            <p><strong>Phone Number:</strong> ${receiver.number}</p>
            <p><strong>Address:</strong> ${receiver.address}</p>
            <p><strong>Country:</strong> ${receiver.country}</p>
            <p><strong>receiver ID:</strong> ${receiver.uniqueReceiverId}</p>
            <p><strong>Cash Amount:</strong> ${data.cashAmount}</p>
            <p><strong>Purpose Of Transfer:</strong> ${data.purposeOfTransfer}</p>
            <p><strong>Current Location:</strong> ${data.currentLocation}</p>
            <p><strong>Payment Tracking ID:</strong> ${data.paymentTrackingId}</p>
        </div>
        <div class="email-footer">
            <p>Thank you for using our service.</p>
            <p><a href="#">Contact Support</a></p>
        </div>
    </div>
</body>
</html>`;
}
