import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server.js";
import connectMongo from "@/lib/connectMongo";

import User from "@/models/User.js";
import Admin from "@/models/Admin.js";

export const POST = async (req, res) => {
    try {
        connectMongo();

        const token = req?.cookies?.get('token')?.value;

        if (!token) {
            return NextResponse.redirect(new URL('/register-or-login', req.url));
        }

        const verify = jwt.verify(token, process.env.JWT_SECRET);

        console.log('verify', verify);

        if (verify.admin) {
            return NextResponse.json({
                login: true,
                admin: verify.admin,
            });
        }

        if (!verify) {
            return NextResponse.json({ message: 'Cookie verification unsuccessful!' });
        };

        const searchedUser = await User.findOne({ _id: verify.userId });

        console.log('searchedUser', searchedUser);

        if (!searchedUser) {
            return NextResponse.json({ message: 'Token: User not found!' });
        };

        searchedUser.hash = undefined;

        return NextResponse.json({
            login: true,
            searchedUser,
        });
    } catch (err) {
        console.log("Error on POST /users/login-at-start", err);
        return NextResponse.json("Something went wrong!");
    }
};