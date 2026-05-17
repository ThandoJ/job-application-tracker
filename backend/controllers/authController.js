import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import supabase from "../config/supabase.js";

export const register = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    const { data: existingUser } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const { data, error } = await supabase
      .from("users")
      .insert([
        {
          email,
          password: hashedPassword,
          role
        }
      ])
      .select();

    if (error) {
      return res.status(500).json(error);
    }

    res.status(201).json(data[0]);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log("Login attempt:", email, password);

    const { data: user, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();

       console.log("Supabase user:", user, "error:", error);

    if (error) {
      console.error("Error fetching user:", error);
      return res.status(500).json({
        message: "Error fetching user"
      });
    }

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const validPassword =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!validPassword) {
      return res.status(400).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};