import Contact from "../models/Contact.js";

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all fields",
      });
    }

    const contact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    return res.status(201).json({
      success: true,
      message: "Message sent successfully",
      contact: {
        _id: contact._id,
        name: contact.name,
        email: contact.email,
        message: contact.message,
      },
    });
  } catch (error) {
    console.error("Contact Error:", error);

    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
