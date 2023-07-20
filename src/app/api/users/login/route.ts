import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;
    // console.log(reqBody);

    // Check if the user exists
    const user = await User.findOne({ email });
    const validPassword = await bcrypt.compare(password, user.password);
    console.log(user)
    if (!user || !validPassword) {
      return NextResponse.json(
        {
          message: "User Name or password is incorrect",
          success: true,
        },
        { status: 400 }
      );
    }

    // create a TokenData
    const tokenData = {
      id: user._id,
      email: user.email,
      username: user.username,
    };

    // create a token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: 3600,
    });

    const response = NextResponse.json({
      status: 200,
      message: "Successfully authenticated",
    });

    response.cookies.set("token", token, { httpOnly: true });
    return response;
  } catch (error: any) {
    console.log(error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
