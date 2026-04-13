import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: true,

  // Fix: tell Turbopack this project is the workspace root so it doesn't
  // walk up to /Users/arpanpandita/package-lock.json by mistake.
  turbopack: {
    root: path.resolve(__dirname),
  },

  // Fix: allow the local network IP to reach Next.js dev resources
  // (HMR websocket, fonts, etc.) so mobile/device previews work.
  allowedDevOrigins: ["192.168.1.104"],
};

export default nextConfig;
