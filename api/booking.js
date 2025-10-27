import mongoose from "mongoose";
import joi from "joi";
import nodemailer from "nodemailer";

// ENV VARIABLES IMPORT
const { SMTP_HOST_NAME, SMTP_PORT, SECURE, MONGODB_URI, SMTP_MAIL, SMTP_PASS } =
  process.env;

// MONGODB DATABASE CONNECTION
let cached = null;
const dbConnection = async () => {
  try {
    if (cached && cached.connection.readyState === 1) {
      return cached;
    }
    cached = await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
    });
    console.log("Database connected successfully");
    return cached;
  } catch (error) {
    console.error("Error While Connecting Database:", error);
    throw error;
  }
};

// MONGODB SCHEMA
const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "* Full Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "* Email is required"],
      lowercase: true,
      trim: true,
    },
    phone: {
      type: String,
      required: [true, "* Phone is required"],
    },
    persons: {
      type: Number,
      required: [true, "* Number of persons is required"],
    },
    destination: {
      type: String,
      trim: true,
    },
    budget: {
      type: String,
      trim: true,
    },
    date: {
      type: String,
      trim: true,
    },
    tourDetails: {
      type: String,
      trim: true,
    },
    packageName: {
      type: String,
      trim: true,
    },
    packagePrice: {
      type: String,
      trim: true,
    },
    packageDuration: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

// MONGODB MODELS
const BookingModel =
  mongoose.models.bookingModel || mongoose.model("bookingModel", bookingSchema);

// VALIDATION SCHEMA
const bookingValidationSchema = joi.object({
  name: joi.string().required().messages({
    "string.base": "* Name Must Be String",
    "string.required": "* Name Is Required",
  }),
  phone: joi.string().required().messages({
    "string.base": "* Phone Must Be String",
    "string.required": "* Phone Is Required",
  }),
  email: joi
    .string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.base": "* Email Must Be String",
      "string.required": "* Email is required",
    }),
  persons: joi.number().min(1).required().messages({
    "number.base": "* Number of persons Must Be Number",
    "number.min": "* Please enter at least 1 person",
    "any.required": "* Number of persons is required",
  }),
  destination: joi.string().allow('').optional(),
  budget: joi.string().allow('').optional(),
  date: joi.string().allow('').optional(),
  tourDetails: joi.string().allow('').optional(),
  packageName: joi.string().allow('').optional(),
  packagePrice: joi.string().allow('').optional(),
  packageDuration: joi.string().allow('').optional(),
});

// TRANSPORTER
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SMTP_MAIL,
    pass: SMTP_PASS,
  },
});

// SEND MAIL
const sendMail = async (from, to, subject, template) => {
  try {
    let info = await transporter.sendMail({
      to,
      from,
      subject,
      html: template,
    });
    if (info) {
      console.log("Mail Sent Successfully to:", to);
    }
  } catch (error) {
    console.error("Error While Sending Mail:", error);
    throw error;
  }
};

// Firm Template (for Global Pioneers team)
const firmTemplate = (data) => {
  let { name, email, phone, persons, destination, budget, date, tourDetails, packageName, packagePrice, packageDuration } = data;

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Booking Inquiry - Global Pioneers Tours & Travels</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
          }
          * {
            box-sizing: border-box;
          }
          body {
            background-color: #f7f7f7;
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 680px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background: linear-gradient(135deg, #1e40af, #06b6d4);
            padding: 35px 20px;
            color: white;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1.5px;
          }
          .header-divider {
            height: 8px;
            background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
          }
          .content {
            padding: 40px 50px;
          }
          h2 {
            color: #333;
            margin: 0 0 20px 0;
            font-size: 24px;
          }
          p {
            color: #555;
            margin-bottom: 30px;
            font-size: 16px;
            line-height: 1.6;
          }
          .highlight {
            background-color: rgba(37, 99, 235, 0.08);
            border-left: 4px solid #2563eb;
            padding: 15px;
          }
          table {
            width: 100%;
            border-collapse: separate;
            border-spacing: 0;
            border: none;
            border-radius: 14px;
            overflow: hidden;
            margin: 25px 0;
            box-shadow: 0 5px 15px rgba(37, 99, 235, 0.08);
            font-size: 16px;
          }
          th {
            background: linear-gradient(to right, #2563eb, #06b6d4);
            color: #ffffff;
            width: 30%;
            font-weight: 600;
            padding: 18px 24px;
            text-align: left;
          }
          td {
            background-color: #ffffff;
            color: #444;
            border-bottom: 1px solid #f0f0f0;
            padding: 18px 24px;
            text-align: left;
          }
          tr:last-child td {
            border-bottom: none;
          }
          tr:nth-child(even) td {
            background-color: #fafafa;
          }
          a {
            color: #2563eb;
            text-decoration: none;
            font-weight: 500;
          }
          .footer {
            margin-top: 10px;
            background-color: #fcfcfc;
            font-size: 14px;
            color: #888;
            text-align: center;
            border-top: 1px solid #eee;
            padding: 25px 40px;
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 25px 15px;
              font-size: 20px;
            }
            table {
              border-radius: 8px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            Global Pioneers Tours & Travels
          </div>
          <div class="header-divider"></div>
          <div class="content">
            <h2>📧 New Booking Inquiry</h2>
            <p class="highlight">You have received a new booking inquiry with the following details:</p>
            <table>
              <tr><th>Full Name</th><td>${name}</td></tr>
              <tr><th>Email</th><td><a href="mailto:${email}">${email}</a></td></tr>
              <tr><th>Phone Number</th><td><a href="tel:+91${phone}">${phone}</a></td></tr>
              <tr><th>Number of Persons</th><td>${persons}</td></tr>
              ${destination ? `<tr><th>Destination</th><td>${destination}</td></tr>` : ''}
              ${budget ? `<tr><th>Budget Per Person</th><td>${budget}</td></tr>` : ''}
              ${date ? `<tr><th>Preferred Travel Date</th><td>${date}</td></tr>` : ''}
              ${packageName ? `<tr><th>Package Name</th><td>${packageName}</td></tr>` : ''}
              ${packagePrice ? `<tr><th>Package Price</th><td>${packagePrice}</td></tr>` : ''}
              ${packageDuration ? `<tr><th>Package Duration</th><td>${packageDuration}</td></tr>` : ''}
              ${tourDetails ? `<tr><th>Tour Related Details</th><td>${tourDetails}</td></tr>` : ''}
            </table>
          </div>
          <div class="footer">
            This email was automatically generated by your website's booking form.
          </div>
        </div>
      </body>
    </html>
  `;
};

// User Template (for applicant)
const userTemplate = (data) => {
  let { name, destination, date, packageName } = data;
  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Your Inquiry - Global Pioneers Tours & Travels</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
          }
          * {
            box-sizing: border-box;
          }
          body {
            background-color: #f7f7f7;
            padding: 40px 20px;
          }
          .email-wrapper {
            max-width: 680px;
            margin: auto;
            background-color: #ffffff;
            border-radius: 16px;
            overflow: hidden;
            box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background: linear-gradient(135deg, #1e40af, #06b6d4);
            padding: 35px 20px;
            color: white;
            font-size: 24px;
            font-weight: 700;
            letter-spacing: 1.5px;
          }
          .header-divider {
            height: 8px;
            background: linear-gradient(90deg, rgba(255,255,255,0.2), rgba(255,255,255,0.5), rgba(255,255,255,0.2));
          }
          .content {
            padding: 40px 50px;
          }
          h2 {
            color: #333;
            margin: 0 0 20px 0;
            font-size: 24px;
          }
          p {
            color: #555;
            margin-bottom: 20px;
            font-size: 16px;
            line-height: 1.6;
          }
          .highlight {
            background-color: rgba(30, 64, 175, 0.08);
            border-left: 4px solid #1e40af;
            padding: 15px;
            margin-bottom: 25px;
          }
          .button {
            display: inline-block;
            background: linear-gradient(to right, #1e40af, #06b6d4);
            color: white;
            text-decoration: none;
            padding: 12px 28px;
            border-radius: 50px;
            font-weight: 600;
            margin: 15px 0;
            text-align: center;
          }
          .footer {
            margin-top: 10px;
            background-color: #fcfcfc;
            font-size: 14px;
            color: #888;
            text-align: center;
            border-top: 1px solid #eee;
            padding: 25px 40px;
          }
          @media only screen and (max-width: 600px) {
            .content {
              padding: 30px 20px;
            }
            .header {
              padding: 25px 15px;
              font-size: 20px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-wrapper">
          <div class="header">
            Global Pioneers Tours & Travels
          </div>
          <div class="header-divider"></div>
          <div class="content">
            <h2>Thank You for Your Inquiry!</h2>
            <p class="highlight">Dear ${name}, thank you for your interest in Global Pioneers Tours & Travels! We've received your inquiry${packageName || destination ? ` for ${packageName || destination}` : ''} and appreciate your interest in our services.</p>
            
            <p>Our travel experts will review your inquiry and contact you within 1-2 business days with a personalized plan.</p>
            
            <center><a href="https://globalpioneertravels.in/" class="button">Visit Our Website</a></center>
          </div>
          <div class="footer">
            Thank you for choosing Global Pioneers Tours & Travels.
          </div>
        </div>
      </body>
    </html>
  `;
};

// MAIN FUNCTION
module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ isSuccess: false, message: "Only Post Method Is Allowed" });
  }
  
  try {
    console.log("Request received:", JSON.stringify(req.body, null, 2));
    
    // Check environment variables
    if (!MONGODB_URI || !SMTP_MAIL || !SMTP_PASS) {
      console.error("Missing environment variables:", {
        MONGODB_URI: !!MONGODB_URI,
        SMTP_MAIL: !!SMTP_MAIL,
        SMTP_PASS: !!SMTP_PASS
      });
      return res.status(500).json({ 
        isSuccess: false, 
        message: "Server configuration error - Missing environment variables"
      });
    }
    
    await dbConnection();
    
    let { name, phone, email, persons, destination, budget, date, tourDetails, packageName, packagePrice, packageDuration } = req.body;
    
    // Convert persons to number if it's a string
    const personsNumber = typeof persons === 'string' ? parseInt(persons, 10) : persons;
    
    let { error } = bookingValidationSchema.validate({ 
      name, phone, email, persons: personsNumber, destination, budget, date, tourDetails, 
      packageName, packagePrice, packageDuration 
    });
    
    if (error) {
      console.error("Validation error:", error.details[0].message);
      return res
        .status(400)
        .json({ 
          isSuccess: false, 
          message: error.details[0].message
        });
    }

    // Create booking with converted persons value
    const bookingData = {
      ...req.body,
      persons: personsNumber
    };
    
    let newBooking = new BookingModel(bookingData);
    let isSaved = await newBooking.save();
    
    if (isSaved) {
      try {
        await Promise.all([
          sendMail(
            SMTP_MAIL,
            email,
            "Thank You for Your Booking Inquiry - Global Pioneers Tours & Travels",
            userTemplate(req.body)
          ),
          sendMail(
            SMTP_MAIL,
            SMTP_MAIL,
            `New Booking Inquiry from ${name}`,
            firmTemplate(req.body)
          ),
        ]);
        console.log("Emails sent successfully");
      } catch (emailError) {
        console.error("Error sending emails:", emailError);
        // Don't fail the request if emails fail - booking is already saved
      }
      
      return res.status(201).json({
        isSuccess: true,
        message: "Booking Inquiry Submitted Successfully",
      });
    } else {
      return res.status(400).json({
        isSuccess: false,
        message: "Error While Submitting Booking Inquiry",
      });
    }
  } catch (error) {
    console.error("Server Error:", error);
    console.error("Error stack:", error.stack);
    return res
      .status(500)
      .json({ 
        isSuccess: false, 
        message: error.message || "Internal Server Error"
      });
  }
};
