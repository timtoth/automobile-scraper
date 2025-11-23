import jwt from "jsonwebtoken";

// Fake, in-memory user store
const users = [
  {
    id: "1",
    email: "tim.toth13@gmail.com",
    password: "test_123_exceptional", // plain text only for demo
    name: "Tim Toth"
  }
];

// Simulate a login
export function authenticateUser(email: string, password: string) {
  const user = users.find(u => u.email === email && u.password === password);
  return user || null;
}

// Create JWT
export function generateToken(user: { id: string; email: string }) {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET!,
    { expiresIn: "1h" }
  );
}
