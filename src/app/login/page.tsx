"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Eye, EyeClosed, LoaderIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Particles } from "@/components/magicui/particles";
import { toast } from "sonner";
import { Checkbox } from "@/components/ui/checkbox";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [typeInput, setTypeInput] = useState("password");
  const [isLoading, setIsLoading] = useState(false);
  const [keepMeLoggedIn, setKeepMeLoggedIn] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, keepMeLoggedIn }),
      });

      if (response.ok) {
        router.push("/dashboard");
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
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to login
          </p>
        </div>
        <div className="grid gap-6 p-4">
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
                <div className="relative">
                  <Input
                    id="password"
                    placeholder="Password"
                    type={typeInput}
                    auto-capitalize="none"
                    auto-correct="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white"
                  />
                  <span
                    onClick={() =>
                      setTypeInput(
                        typeInput === "password" ? "text" : "password"
                      )
                    }
                    className="absolute end-0 inset-y-0 flex items-center justify-center px-2"
                  >
                    {typeInput === "text" ? (
                      <Eye className="size-5 text-muted-foreground" />
                    ) : (
                      <EyeClosed className="size-6 text-muted-foreground" />
                    )}
                  </span>
                </div>
              </div>
              <div className="items-top flex gap-x-2">
                <Checkbox
                  checked={keepMeLoggedIn}
                  onClick={() => setKeepMeLoggedIn(!keepMeLoggedIn)}
                  id="terms1"
                />
                <div className="grid gap-1.5 leading-none">
                  <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Keep me logged in
                  </label>
                </div>
              </div>
              <Button type="submit" className="mt-4">
                {isLoading && (
                  <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                )}
                Sign In
              </Button>
            </div>
          </form>
        </div>
        <div className="px-8 text-center text-sm text-muted-foreground z-10">
          <p>
            Don`t have an account?
            <Link href="/register" className="underline ml-1">
              Register
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
        staticity={10}
      />
    </>
  );
}
