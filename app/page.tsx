import App from "@/components/pages/app";
import { APP_URL } from "@/lib/constants";
import type { Metadata } from "next";

const frame = {
  version: "next",
  imageUrl: `${APP_URL}/images/icon.png`,
  button: {
    title: "Visualize Dashboard",
    action: {
      type: "launch_frame",
      name: "Visualize Dashboard",
      url: APP_URL,
      splashImageUrl: `${APP_URL}/images/splash.png`,
      splashBackgroundColor: "#f7f7f7",
    },
  },
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Visualize Dashboard",
    openGraph: {
      title: "Visualize Dashboard",
      description: "Visualize Dashboard",
    },
    other: {
      "fc:frame": JSON.stringify(frame),
    },
  };
}

export default function Home() {
  return <App />;
}
