const Capsule = require("../models/Capsule");
const User = require("../models/User");

exports.createCapsule = async (req, res) => {
  try {
    const { title, content, media, lockDate, memberEmails } = req.body;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    
    // Convert memberEmails (if provided) to user IDs
    let members = [];
    if (memberEmails && Array.isArray(memberEmails)) {
      // Look up each email and add the user ID if found
      for (const email of memberEmails) {
        const user = await User.findOne({ email });
        if (user) {
          members.push(user._id);
        }
      }
    }
    
    const capsule = new Capsule({
      title,
      content,
      media: media ? (Array.isArray(media) ? media : [media]) : [],
      lockDate: lockDate ? new Date(lockDate) : null,
      createdBy: req.user.id,
      members  // Array of user IDs (may be empty)
    });

    await capsule.save();
    res.status(201).json({ message: "Capsule created", capsule });
  } catch (error) {
    console.error("Error creating capsule:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getCapsules = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const capsules = await Capsule.find({ createdBy: req.user.id });
    res.json(capsules);
  } catch (error) {
    console.error("Error fetching capsules:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
