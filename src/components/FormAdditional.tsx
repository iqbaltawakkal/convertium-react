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

const FormAdditional = ({ user, isEdit, onDone, onCancel }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [address, setAddress] = useState(user?.address || "");
  const [country, setCountry] = useState(user?.country || "");
  const [dateOfBirth, setDateOfBirth] = useState(user?.dateOfBirth || "");
  const [maritalStatus, setMaritalStatus] = useState(user?.maritalStatus || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [postalCode, setPostalCode] = useState(user?.postalCode || "");

  const years = Array.from({ length: 35 }, (_, i) => 1990 + i); // Generate years from 1990 to 2024

  useEffect(() => {
    setAddress(user?.address || "");
    setCountry(user?.country || "");
    setDateOfBirth(user?.dateOfBirth || "");
    setMaritalStatus(user?.maritalStatus || "");
    setGender(user?.gender || "");
    setPostalCode(user?.postalCode || "");
  }, [user]);

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();

    // Validate age (minimum 17 years old)
    const currentYear = new Date().getFullYear();
    if (currentYear - parseInt(dateOfBirth) < 17) {
      toast.error("Minimum age is 17");
      return;
    }

    const body = {
      address,
      country,
      dateOfBirth,
      maritalStatus,
      gender,
      postalCode,
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

  if (!isEdit) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <p className="text-sm font-medium ">Date of birth</p>
          <p className="text-sm text-muted-foreground">
            {user?.dateOfBirth || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Home address</p>
          <p className="text-sm text-muted-foreground">
            {user?.address || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Country</p>
          <p className="text-sm text-muted-foreground">
            {user?.country || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Marital status</p>
          <p className="text-sm text-muted-foreground">
            {user?.maritalStatus || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Gender</p>
          <p className="text-sm text-muted-foreground">{user?.gender || "-"}</p>
        </div>
        <div>
          <p className="text-sm font-medium ">Postal code</p>
          <p className="text-sm text-muted-foreground">
            {user?.postalCode || "-"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-col gap-8">
      <div>
        <Label className="text-sm font-medium ">Date of birth</Label>
        <Select
          value={dateOfBirth}
          onValueChange={(value) => setDateOfBirth(value)}
          required
        >
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Select date of birth" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {years.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium ">Home address</Label>
        <Input
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Home address"
          type="text"
          autoCapitalize="none"
          autoComplete="address"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Country</Label>
        <Input
          id="country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Country"
          type="text"
          autoCapitalize="none"
          autoComplete="country"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Marital status</Label>
        <Select
          value={maritalStatus}
          onValueChange={(value) => setMaritalStatus(value)}
          required
        >
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Select marital status" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["married", "single"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium ">Gender</Label>
        <Select
          value={gender}
          onValueChange={(value) => setGender(value)}
          required
        >
          <SelectTrigger className="bg-white w-full">
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {["male", "female"].map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-sm font-medium ">Postal code</Label>
        <Input
          id="postalCode"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          placeholder="Postal code"
          type="text"
          autoCapitalize="none"
          autoComplete="postalCode"
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
          disabled={!maritalStatus || !country || !address || !dateOfBirth}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormAdditional;
