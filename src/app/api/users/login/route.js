import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import connectMongo from "@/lib/connectMongo";
import { serialize } from 'cookie';

import User from "@/models/User.js";
import Admin from "@/models/Admin.js";

export const POST = async (req, res) => {
    try {
        console.log('login route is requested');

        connectMongo();

        const body = await req.json();

        const { email, password } = body;

        if ((!email, !password)) {
            res.json({ message: "Email or Password is wrong!" });
            return;
        }

        const admin = await Admin.findOne({ email });
        if (admin) {
            password === admin.password && console.log('Admin');
            password === admin.password && res.json({ message: 'Admin logged in!', admin });
            if (password === admin.password) return;

        }

        const searchedUser = await User.findOne({ email });

        if (!searchedUser) {
            return NextResponse.json({ message: "User not found!" });
        }

        const comparePassword = await bcrypt.compare(
            password,
            searchedUser.hash
        );

        if (!comparePassword) {
            return NextResponse.json({ message: "Password wrong!" });
        }

        const token = jwt.sign(
            { userId: searchedUser._id },
            process.env.JWT_SECRET,
            { expiresIn: "12h" }
        );

        searchedUser.hash = undefined;

        const cookie = serialize('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 60 * 60,
            path: '/',
            sameSite: 'Strict',
        });

        const response = new NextResponse(JSON.stringify({ message: 'You are successfully logged in!', success: 1, searchedUser }));
        response.headers.set('Set-Cookie', cookie);

        return response;

    } catch (err) {
        console.log("Error on POST /users/login", err);
        return NextResponse.json({ message: "Something went wrong!", error: 1 });
    }
};