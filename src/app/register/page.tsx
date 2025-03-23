"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { toast } from "sonner";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast("Password and confirm password does not match");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (response.ok) {
        router.push("/dashboard");
        toast("Register successful, you`re now logged in");
      } else {
        const data = await response.json();
        throw Error(data.message);
      }
    } catch (e) {
      toast((e as Error).message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px] mt-[10%] relative z-20 bg-white">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Register</h1>
          <p className="text-sm text-muted-foreground">
            Enter your details to create your account
          </p>
        </div>
        <div className="grid gap-6 z-10 p-4 bg-white">
          <form onSubmit={handleSubmit}>
            <div className="grid gap-2">
              <div className="grid gap-1">
                <Label className="sr-only"> Email </Label>
                <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  type="email"
                  auto-capitalize="none"
                  auto-complete="email"
                  auto-correct="off"
                  required
                  className="bg-white"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only"> Password </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  auto-capitalize="none"
                  auto-correct="off"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only"> Confirm password </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Confirm password"
                  auto-capitalize="none"
                  auto-correct="off"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <Button type="submit" className="mt-4">
                {isLoading && (
                  <LoaderIcon className="ml-1 h-4 w-4 animate-spin" />
                )}
                Register
              </Button>
            </div>
          </form>
        </div>
        <div className="px-8 text-center text-sm text-muted-foreground z-10">
          <p>
            Already have an account?
            <Link href="/login" className="underline ml-1">
              Login
            </Link>
          </p>
        </div>
      </div>
      <Particles
        className="absolute inset-0 z-10"
        quantity={100}
        ease={100}
        color="#000000"
        refresh
      />
    </>
  );
}
