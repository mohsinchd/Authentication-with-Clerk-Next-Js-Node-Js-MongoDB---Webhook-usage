import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

import React from "react";

const Header = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">Your Site</h1>
      </div>

      <div className="flex items-center space-x-4">
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </header>
  );
};

export default Header;
