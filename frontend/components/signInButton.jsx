import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";

const CustomSignInButton = () => {
  return (
    <div>
      <SignedOut>
        <SignInButton>
          <button className="p-4 text-black border-blue-400 rounded border">
            Sign In
          </button>
        </SignInButton>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </SignedOut>
    </div>
  );
};

export default CustomSignInButton;
