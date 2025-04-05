// pages/api/register.js
let users = []; // This will act as our temporary "database"

export default function handler(req, res) {

    if (req.method === "POST") {
        console.log(users);
        const { email, password } = req.body;

        // Check if user already exists
        const userExists = users.find((user) => user.email === email);
        if (userExists) {
            return res.status(400).json({ error: "User already exists" });
        }

        // WARNING: Storing plain text passwords is insecure. For learning purposes only.
        users.push({ email, password });
        return res.status(200).json({ message: "User registered successfully" });
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}
