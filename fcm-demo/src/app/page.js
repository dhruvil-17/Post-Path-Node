"use client";

import { useEffect, useState } from "react";
import {
  getMessaging,
  getToken,
  onMessage,
  isSupported,
} from "firebase/messaging";
import { app } from "@/lib/firebase";

export default function Home() {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const requestPermission = async () => {
      const supported = await isSupported();
      if (!supported) {
        console.log("FCM not supported in this browser");
        return;
      }

      const messaging = getMessaging(app);

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey: process.env.NEXT_PUBLIC_VAPID_KEY,
        });

        console.log("FCM Token:", token);
        setToken(token);
      }

      onMessage(messaging, (payload) => {
        console.log("Foreground message:", payload);
        alert(payload.notification.title);
      });
    };

    requestPermission();
  }, []);
  const handleBackend = async () => {
    if (!token) {
      alert("Token not ready yet");
      return;
    }
    await fetch("/api/send-notification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        token: token,
        title: "New Task Assigned",
        body: "You have received a new task",
      }),
    });
  };

  return (
    <>
      <h1>FCM Example</h1>
      <button onClick={() => handleBackend()}>click</button>
    </>
  );
}
