import User from "./../models/User.js";
import md5 from "md5";

const postSignup = async (req, res) => {
  const { name, email, phone, password, bookings } = req.body;
  const user = new User({
    name,
    email,
    phone,
    password: md5(password),
    bookings,
  });
  try {
    const savedUser = await user.save();
    res.status(201).json({
      message: "User created successfully",
      user: savedUser,
      success: true,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error creating user",
      error: err.message,
      success: false,
    });
  }
};

const postLogin = async (req, res) => {
  const { email, password } = req.body;
  const encryptedPassword = md5(password);
  const user = await User.findOne({ email, password: encryptedPassword });
  if (!user) {
    return res.status(401).json({
      message: "Invalid email or password",
      success: false,
    });
  }
  res.json({
    message: "User login successfully",
    success: true,
    data: user,
  });
};
const putUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  const { name, email, phone, bookings } = req.body;
  await User.updateOne(
    {
      _id: id,
    },
    {
      $set: {
        name: name,
        email: email,
        phone: phone,
        bookings: bookings,
      },
    }
  );
  res.json({
    message: "User updated successfully",
    success : true,
    data : user
  })
};

const getUsers = async (req ,res)=>{
  const user = await User.find();
  res.json({
    message: "User data fetched successfully",
    success: true,
    data : user
  })
};


export { postSignup, postLogin  , putUser , getUsers};
