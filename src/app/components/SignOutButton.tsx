"use client";

import { ButtonHTMLAttributes, FC, useState } from "react";
import { signOut } from "next-auth/react";
import { toast } from "react-hot-toast";
import { Loader2, LogOut } from "lucide-react";

import Button from "@/lib/uiElements/button/Button";

interface SignOutButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const SignOutButton: FC<SignOutButtonProps> = ({ ...props }) => {
  const [isSignInOut, setIsSignInOut] = useState(false);

  return (
    <Button
      {...props}
      variant="ghost"
      onClick={async () => {
        setIsSignInOut(true);
        try {
          await signOut();
        } catch (e) {
          toast.error("There was a problem signing out");
        } finally {
          setIsSignInOut(false);
        }
      }}
    >
      {isSignInOut ? (
        <Loader2 className="animate-spin h-4 w-4" />
      ) : (
        <LogOut className="w-4 h-4" />
      )}
    </Button>
  );
};

export default SignOutButton;
