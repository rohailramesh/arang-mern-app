import { useSignIn } from "@clerk/clerk-react";
import { Button } from "./ui/button";

const SignInOAAuthButtons = () => {
  const { signIn, isLoaded } = useSignIn();

  if (!isLoaded) {
    return null;
  }
  const signInWithGoogle = async () => {
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: "/sso-callback",
      redirectUrlComplete: "/auth-callback",
    });
  };

  return <Button onClick={signInWithGoogle}>Sign in with Google</Button>;
};

export default SignInOAAuthButtons;
