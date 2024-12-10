import fs from "node:fs";
import { decode } from "jsonwebtoken";

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = decode(token) as { exp?: number }; // Decode the token without verifying
    if (!decoded || !decoded.exp) {
      // If no expiration time is present, treat the token as expired
      return true;
    }
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return currentTime > decoded.exp; // Compare current time with token expiration
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // Treat as expired if an error occurs
  }
};

export const getToken = async () => {
  const config = await fs.promises.readFile(
    "/Users/douglasreiser/.tapeless/config.json",
    "utf-8"
  );

  if (config) {
    const token = JSON.parse(config).token;
    if (token && !isTokenExpired(token)) {
      // ensure token is not expired, ignore secret
      return token;
    }
  }

  return null;
};
