import "dotenv/config";
import express from "express";
import cors from "cors";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./auth"; // Importa o arquivo que acabamos de criar

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(express.json());

// ESTA é a linha mágica que estava faltando
app.all("/api/auth/*", toNodeHandler(auth));

app.get("/", (req, res) => {
    res.json({ status: "API Online 🚀" });
});

app.listen(PORT, () => {
    console.log(`🔥 Server running on http://localhost:${PORT}`);
});