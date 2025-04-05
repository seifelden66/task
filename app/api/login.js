// pages/api/login.js
// Import the same in-memory users array. In a real application, you would query your database.
import users from "./register"; // For a learning project, you could alternatively export and import the shared users array.

export default function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;
    const user = users.find((user) => user.email === email && user.password === password);
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    // In a real app, generate a session token or JWT here.
    return res.status(200).json({ message: "Logged in successfully", user: { email: user.email } });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
