import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SuperTokens, { SuperTokensWrapper } from "supertokens-auth-react";
import EmailPassword from "supertokens-auth-react/recipe/emailpassword";
import { EmailPasswordPreBuiltUI } from "supertokens-auth-react/recipe/emailpassword/prebuiltui";
import Session from "supertokens-auth-react/recipe/session";
import { getSuperTokensRoutesForReactRouterDom } from "supertokens-auth-react/ui";
import * as reactRouterDom from "react-router-dom";
import App from "./App";

SuperTokens.init({
    appInfo: {
        appName: "Pongal-IISERK",
        apiDomain: "http://localhost:5000",
        websiteDomain: "http://localhost:3000",
        apiBasePath: "/auth",
        websiteBasePath: "/auth",
    },
    recipeList: [EmailPassword.init(), Session.init()],
});

function Root() {
    return (
        <SuperTokensWrapper>
            <BrowserRouter>
                <Routes>
                    {getSuperTokensRoutesForReactRouterDom(
                        reactRouterDom,
                        [EmailPasswordPreBuiltUI]
                    )}
                    <Route path="/" element={<App />} />
                </Routes>
            </BrowserRouter>
        </SuperTokensWrapper>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Root />);
