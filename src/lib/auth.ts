import { SignJWT, jwtVerify } from "jose";

export const SESSION_COOKIE = "leelansh_admin";

function secret() {
  return new TextEncoder().encode(
    process.env.ADMIN_SESSION_SECRET || "dev-insecure-secret-change-me"
  );
}

export async function createSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secret());
}

export async function verifySession(token?: string): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, secret());
    return payload.role === "admin";
  } catch {
    return false;
  }
}
