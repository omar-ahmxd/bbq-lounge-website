# EmailJS Setup Guide for BBQ Lounge Website

## Setup Steps:

### 1. Create EmailJS Account
1. Go to [https://www.emailjs.com](https://www.emailjs.com)
2. Sign up for a free account
3. Verify your email address

### 2. Add Email Service
1. In EmailJS dashboard, go to "Email Services"
2. Click "Add New Service"
3. Choose "Gmail" (or your preferred service)
4. Click "Connect Account"
5. Authorize EmailJS to send emails from thebarbequelounge@gmail.com
6. Note down your **Service ID** (e.g., "service_abc123")

### 3. Create Email Template
1. Go to "Email Templates"
2. Click "Create New Template"
3. Use this template:

**Subject:** New Reservation - {{from_name}}

**Template Content:**
```
You have received a new reservation request!

CUSTOMER DETAILS:
Name: {{from_name}}
Email: {{from_email}}
Phone: {{phone}}

RESERVATION DETAILS:
Date: {{date}}
Time: {{time}}
Number of Guests: {{guests}}

Special Requests:
{{message}}

Reservation submitted on: {{reservation_date}}

---
Please contact the customer to confirm their reservation.
```

4. Set "To Email" field to: {{to_email}}
5. Save the template and note down your **Template ID** (e.g., "template_xyz789")

### 4. Get Your Public Key
1. Go to "Account" → "API Keys"
2. Copy your **Public Key** (e.g., "pk_live_ABC123xyz")

### 5. Update the Website Code
Replace the placeholders in `script.js`:

```javascript
// Line 184: Replace with your actual public key
emailjs.init("pk_live_YOUR_ACTUAL_KEY");

// Line 213: Replace with your actual service and template IDs
emailjs.send('service_YOUR_ID', 'template_YOUR_ID', templateParams)
```

### 6. Test the Integration
1. Open the website
2. Fill out the reservation form
3. Submit and verify email is received at thebarbequelounge@gmail.com

## Important Notes:
- EmailJS free plan allows 200 emails/month
- The email will be sent from EmailJS servers, not directly from Gmail
- Replies will go to the customer's email address (from_email field)
- Always keep your Public Key secure (though it's safe to use in frontend code)

## Troubleshooting:
- If emails aren't sending, check browser console for errors
- Verify all IDs are correctly entered
- Check EmailJS dashboard for email history and errors
- Ensure thebarbequelounge@gmail.com is verified in EmailJS