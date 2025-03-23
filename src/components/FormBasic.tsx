import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner"; // For toast notifications
import { Loader2 } from "lucide-react"; // Loading spinner from Lucide
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { FormProps } from "@/lib/types";

const FormBasic = ({ user, isEdit, onDone, onCancel }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [salutation, setSalutation] = useState(user?.salutation || "");
  const [email, setEmail] = useState(user?.email || "");

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      firstName,
      lastName,
      salutation,
      email,
    };
    try {
      setIsLoading(true);
      const response = await fetch("/api/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) throw new Error("Update failed");
      toast.success("Update success");
      onDone();
    } catch (error) {
      toast.error((error as Error).message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setFirstName(user?.firstName || "");
    setLastName(user?.lastName || "");
    setSalutation(user?.salutation || "");
    setEmail(user?.email || "");
  }, [user]);

  if (!isEdit) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm font-medium">Salutation</p>
          <p className="text-sm text-muted-foreground">
            {user?.salutation || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">First name</p>
          <p className="text-sm text-muted-foreground">
            {user?.firstName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Last name</p>
          <p className="text-sm text-muted-foreground">
            {user?.lastName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium">Email</p>
          <p className="text-sm text-muted-foreground">{user?.email || "-"}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-col gap-8">
      <div>
        <Label className="text-sm font-medium">Salutation</Label>
        <Select
          value={salutation}
          onValueChange={(value) => setSalutation(value)}
          required
        >
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Select salutation" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["Mr.", "Mrs."].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium">First name</Label>
        <Input
          id="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          autoCapitalize="none"
          autoComplete="firstName"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div>
        <Label className="text-sm font-medium">Last name</Label>
        <Input
          id="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          autoCapitalize="none"
          autoComplete="lastName"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div>
        <Label className="text-sm font-medium">Email</Label>
        <Input
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          type="email"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div className="flex justify-end gap-4">
        <Button
          variant="link"
          onClick={(e) => {
            e.preventDefault();
            onCancel();
          }}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={!email || !firstName || !lastName || !salutation}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormBasic;
