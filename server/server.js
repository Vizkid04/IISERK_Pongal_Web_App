import express from "express";
import cors from "cors";
import SuperTokens from "supertokens-node";
import Session from "supertokens-node/recipe/session";
import EmailPassword from "supertokens-node/recipe/emailpassword";
import { verifySession } from "supertokens-node/recipe/session/framework/express";
import { middleware, errorHandler } from "supertokens-node/framework/express";

//Initializing SuperTokens
SuperTokens.init({
    framework: "express",
    supertokens: { connectionURI: "https://try.supertokens.com" },
    appInfo: {
        appName: "Pongal-IISERK",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

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

//Error handler
app.use(errorHandler());

//declaring and hosting on a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
