import { NextResponse } from "next/server";
import { APP_URL } from "../../../lib/constants";

export async function GET() {
  const farcasterConfig = {
    accountAssociation: {
      header:
        "eyJmaWQiOjEwMjU0MzcsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHgwMEE2ZkJjOTIwODg0MUIyNzJEYkE0OUE0ODdkM0E2YkVkMDVmQ2JjIn0",
      payload: "eyJkb21haW4iOiJ2aXN1YWxpei1ib2FyZC52ZXJjZWwuYXBwIn0",
      signature:
        "MHgyN2U2MmQ5MTgzNmUwZmM0YzkxYmVjYmM0NGJhOWFkNjkxMzZlNGZlYWJmNjhjMmQ1ODcxMjM5NDFmYTg5YjgyNDU2MzY0YWVlNDI5MjBlZjNiYjEzYzIzMDg4YzdkMjVkNTBmZGQzY2I1OTgyYzkxNDdmMzE3ZWNhODJmYTM1ZTFj",
    },
    frame: {
      version: "1",
      name: "Visualize Dashboard",
      iconUrl: `${APP_URL}/images/icon.png`,
      homeUrl: `${APP_URL}`,
      imageUrl: `${APP_URL}/images/feed.png`,
      screenshotUrls: [],
      tags: ["monad", "farcaster", "miniapp", "template"],
      primaryCategory: "developer-tools",
      buttonTitle: "Launch Game",
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#ffffff",
      webhookUrl: `${APP_URL}/api/webhook`,
    },
  };

  return NextResponse.json(farcasterConfig);
}
