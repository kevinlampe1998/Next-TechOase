import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import connectMongo from "@/lib/connectMongo";
import { serialize } from "cookie";

import User from "@/models/User.js";
import Admin from "@/models/Admin.js";

export const POST =  async (req, res) => {
    try {
        connectMongo();

        const body = await req.json();

        const {
            firstName,
            lastName,
            email,
            street,
            postalCode,
            town,
            birthDay,
            password,
        } = body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !street ||
            !postalCode ||
            !town ||
            !birthDay ||
            !password
        ) {
            return NextResponse.json({ message: "One of the inputs is missing!" });
        }

        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const existUser = await User.findOne({ email });
        if (existUser) {
            return NextResponse.json({ message: "User exists already!" });
        }

        const newUser = new User({
            firstName,
            lastName,
            email,
            street,
            postalCode,
            town,
            birthDay,
            hash,
        });

        const savedUser = await newUser.save();
        savedUser.hash = undefined;

        const token = jwt.sign(
            { userId: savedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: true,
            maxAge: 60 * 60 * 12,
            path: '/',
            sameSite: 'Strict',
        });

        const response = new NextResponse(JSON.stringify({ message: 'You are successfully logged in!', success: 1, savedUser }));
        response.headers.set('Set-Cookie', cookie);

        return response;

        return NextResponse.json({ message: "User successful registered!", success: 1, savedUser });
    } catch (err) {
        console.log("Error on POST /users/register", err);
        return NextResponse.json({ message: "Something went wrong!", error: 1 });
    }
};