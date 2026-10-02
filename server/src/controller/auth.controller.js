import userModel from "../model/user.model.js";
import bcrypt from "bcryptjs";
import {
  createAccessToken,
  createRefreshToken,
  readRefreshToken,
} from "../utils/auth.utils.js";

export const registerUserController = async (req, res) => {
  const { email, name, password } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    email,
  });

  if (isUserAlreadyExists) {
    return res.status(400).json({
      message: "User already registered with this email address",
      errors: [
        {
          field: "email",
          message: "User already exists with this email address",
        },
      ],
    });
  }

  const user = await userModel.create({
    email,
    name,
    passwordHash: await bcrypt.hash(password, 12),
  });

  const accessToken = createAccessToken({
    userId: user._id,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  await userModel.findByIdAndUpdate(user._id, {
    refreshToken,
  });

  res.status(201).json({
    message: "User Registered Successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
      accessToken,
    },
  });
};

export const loginUserController = async (req, res) => {
  const { email, password } = req.body;

  const user = await userModel.findOne({ email });

  if (!user) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

  if (!isPasswordValid) {
    return res.status(400).json({
      message: "Invalid email or password",
    });
  }

  const accessToken = createAccessToken({
    userId: user._id,
  });

  const refreshToken = createRefreshToken({
    userId: user._id,
  });

  await userModel.findOneAndUpdate(
    { email },
    {
      refreshToken,
    },
  );

  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({
    message: "User loggedIn Successfully",
    data: {
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
      },
      accessToken,
    },
  });
};

export const refreshUserController = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh Token is required",
    });
  }

  try {
    const decoded = readRefreshToken(refreshToken);

    const { userId } = decoded;

    const user = await userModel.findById(userId);

    if (refreshToken !== user.refreshToken) {
      await userModel.findByIdAndUpdate(user._id, {
        refreshToken: null,
      });

      return res.status(401).json({
        message: "Refresh token mismatch",
      });
    }

    const accessToken = createAccessToken({
      userId,
    });

    const newRefreshToken = createRefreshToken({
      userId,
    });

    await userModel.findByIdAndUpdate(user._id, {
      refreshToken: newRefreshToken,
    });

    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
    });

    res.status(200).json({
      message: "Tokens rotated successfully",
      data: {
        user: {
          email: user.email,
          name: user.name,
          id: user._id,
        },
        accessToken,
      },
    });
  } catch (error) {
    return res.status(401).json({
      message: "Invalid Refresh Token",
    });
  }
};

export const getMe = async (req, res) => {
  const { userId } = req.user;

  const user = await userModel.findById(userId);

  res.status(200).json({
    message: "User data fetched successfully",
    data: {
      user: {
        email: user.email,
        name: user.name,
        id: user._id,
      },
    },
  });
};

export const logoutUserController = async (req, res) => {
  await userModel.findByIdAndUpdate(req.user.userId, {
    refreshToken: null,
  });

  res.clearCookie("refreshToken");

  return res.status(200).json({
    message: "Logout successful",
  });
  
};
