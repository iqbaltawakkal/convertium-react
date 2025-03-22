"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoaderIcon } from "lucide-react";
import { Particles } from "@/components/magicui/particles";
import { toast } from "sonner";

export default function Register() {
  const [salutation, setSalutation] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          salutation,
          firstName,
          lastName,
          email,
          password,
        }),
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
                <Label className="sr-only"> First name </Label>
                <Input
                  id="first-name"
                  type="text"
                  placeholder="First name"
                  auto-capitalize="none"
                  auto-correct="off"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only"> Last name </Label>
                <Input
                  id="last-name"
                  type="text"
                  placeholder="Last name"
                  auto-capitalize="none"
                  auto-correct="off"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-white"
                />
              </div>
              <div className="grid gap-1">
                <Label className="sr-only"> Salutation </Label>
                <Select
                  value={salutation}
                  onValueChange={(e) => setSalutation(e)}
                  required
                >
                  <SelectTrigger className="bg-white w-full">
                    <SelectValue placeholder="Select salutation" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Mr.">Mr.</SelectItem>
                      <SelectItem value="Mrs.">Mrs.</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
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
