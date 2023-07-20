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

    if (user) {

        return NextResponse.json({
            message: "Login Successful",
            success: true,
            
          }, {status: 200});
        
    }

    // check if password is correct
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json({
        status: 400,
        message: "Password is incorrect",
      });
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


  const response =  NextResponse.json({
            status: 400,
            message: "User not found",
        });
    
    response.cookies.set("token", token, { httpOnly: true });
    return response;

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
