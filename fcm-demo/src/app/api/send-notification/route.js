import { NextResponse } from "next/server";
import admin from "@/lib/firebaseAdmin";

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

export async function POST(req) {
  const { token, title, body } = await req.json();

  try {
    await admin.messaging().send({
      token,
      notification: {
        title,
        body,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}