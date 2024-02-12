const mongoose = require("mongoose");
const Member = require("../models/member");
const jwt = require("jsonwebtoken");

function validateEmail(email) {
  var re = /\S+@\S+\.\S+/;
  return re.test(email);
}

exports.getAllMembers = async (req, res) => {
  try {
    const members = await Member.find({});
    res.status(200).json({
      data: members,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.getMemberById = async (req, res) => {
  const { id } = req.params;
  try {
    const member = await Member.findById(id);
    res.status(200).json({
      data: member,
      success: true,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

exports.addNewMember = async (req, res) => {
  const {
    name,
    email,
    password,
    domain,
    image,
    position,
    githubLink,
    instaLink,
    LinkedInLink,
    isAdmin,
  } = req.body;

  try {
    if (!validateEmail(email)) {
      throw new Error("Invalid Email");
    }

    const newMember = new Member({
      name,
      email,
      password,
      domain,
      image,
      position,
      github_link: githubLink,
      insta_link: instaLink,
      linkedin_link: LinkedInLink,
      isAdmin,
    });

    await newMember.save().catch((err) => {
      if (err.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error("Error while saving " + err.message);
    });

    res.status(200).json({
      data: newMember,
      success: true,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while adding new member " + error.message });
  }
};

exports.updateMember = async (req, res) => {
  const id = req.query.id;
  const {
    name,
    email,
    password,
    domain,
    image,
    position,
    githubLink,
    instaLink,
    LinkedInLink,
    isAdmin,
  } = req.body;

  try {
    if (!validateEmail(email)) {
      throw new Error("Invalid Email");
    }

    const member = await Member.findById(id);

    if (!member) {
      throw new Error("Invald member id");
    }

    (member.name = name),
      (member.email = email),
      (member.password = password),
      (member.domain = domain),
      (member.image = image),
      (member.position = position),
      (member.github_link = githubLink),
      (member.insta_link = instaLink),
      (member.linkedin_link = LinkedInLink),
      (member.isAdmin = isAdmin);
    await member.save().catch((err) => {
      if (err.code === 11000) {
        throw new Error("Email already exists");
      }
      throw new Error("Error while saving " + err.message);
    });

    res.status(200).json({
      data: member,
      success: true,
    });
  } catch (error) {
    res
      .status(400)
      .json({ message: "error while adding new member " + error.message });
  }
};

exports.removeMember = async (req, res) => {
  const id = req.query.id;
  try {
    const member = await Member.findByIdAndDelete(id).then((mem) => {
      if (!mem) {
        throw new Error("Invalid member id");
      }
      res.status(200).json({
        data: mem,
        success: true,
      });
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      err: err.message,
    });
  }
};

exports.adminLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Member.findOne({ email });
    if (!admin) {
      throw new Error("Wrong email");
    }
    if (admin.password !== password) {
      throw new Error("Wrong password");
    }
    if (admin.isAdmin === false) {
      throw new Error("Not an Admin");
    }

    const adminId = admin.toJSON();
    console.log(adminId);
    const token = jwt.sign(adminId.email, process.env.SECRET);

    res.status(200).json({
      data: { admin, token },
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      data: err.message,
      success: false,
    });
  }
};
