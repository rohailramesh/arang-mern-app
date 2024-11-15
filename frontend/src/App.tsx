import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import AuthCallbackPage from "./pages/auth-callback/AuthCallbackPage";
import { AuthenticateWithRedirectCallback } from "@clerk/clerk-react";
export default function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route //this is the route for the auth callback so once the user signs in, it will redirect to this route
          path="/sso-callback"
          element={
            <AuthenticateWithRedirectCallback
              signInForceRedirectUrl={"/auth-callback"}
            />
          }
        />
        <Route path="/auth-callback" element={<AuthCallbackPage />} />
      </Routes>
    </>
  );
}
