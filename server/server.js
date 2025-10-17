import express from "express";
import cors from "cors";
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler } from "supertokens-node/framework/express";
import { Pool } from "pg";

//Initializing SuperTokens
SuperTokens.init({
    framework: "express",
    supertokens: {
        connectionURI: "http://localhost:3567",
        apiKey: "someKey"
    },
    appInfo: {
        appName: "Pongal-IISERK",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

// PostgreSQL connection pool for app database
const pool = new Pool({
	connectionString: "postgresql://pongal_user:20P0ng@l25@127.0.0.1:5432/pongal_db",
});

pool.connect()
	.then(() => console.log("✅ App database connected"))
	.catch((err) => console.error("❌ Error connecting to app database", err));

//cors must be before middleware
const app = express();
app.use(
    cors({
        origin: "http://localhost:3000",
        allowedHeaders: ["content-type", ...SuperTokens.getAllCORSHeaders()],
        credentials: true,
    })
);

//middleware must be before my routes
app.use(middleware());

//My routes
app.use(express.json());
app.get("/api/hello", (req, res) => {
    res.json({ message: "Hello from Express + Rsbuild!" });
});

//Protected route
app.post("/like-comment", verifySession(), (req, res) => {
    const userId = req.session.getUserId();
    res.json({ message: `User ${userId} liked a comment!` });
});

//Route to create a post in app schema
app.post("/create-post", async (req, res) => {
	const { title, content } = req.body;
	try {
		const result = await pool.query(
			"INSERT INTO app.posts(title, content) VALUES($1, $2) RETURNING *",
			[title, content]
		);
		res.json({ post: result.rows[0] });
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Database error" });
	}
});

//Error handler
app.use(errorHandler());

//declaring and hosting on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
