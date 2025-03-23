import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner"; // Assuming you're using `sonner` for toast notifications
import { Loader2 } from "lucide-react"; // shadcn/ui uses Lucide icons
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

const FormSpouse = ({ user, isEdit = false, onDone, onCancel }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [spouseFirstName, setSpouseFirstName] = useState(
    user?.spouseFirstName || ""
  );
  const [spouseLastName, setSpouseLastName] = useState(
    user?.spouseLastName || ""
  );
  const [spouseSalutation, setSpouseSalutation] = useState(
    user?.spouseSalutation || ""
  );

  useEffect(() => {
    setSpouseFirstName(user?.spouseFirstName || "");
    setSpouseLastName(user?.spouseLastName || "");
    setSpouseSalutation(user?.spouseSalutation || "");
  }, [user]);

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      spouseFirstName,
      spouseLastName,
      spouseSalutation,
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
          <p className="text-sm font-medium ">Spouse salutation</p>
          <p className="text-sm text-muted-foreground">
            {user?.spouseSalutation || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Spouse first name</p>
          <p className="text-sm text-muted-foreground">
            {user?.spouseFirstName || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Spouse last name</p>
          <p className="text-sm text-muted-foreground">
            {user?.spouseLastName || "-"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-col gap-8">
      <div>
        <Label className="text-sm font-medium ">Spouse salutation</Label>
        <Select
          value={spouseSalutation}
          onValueChange={(value) => setSpouseSalutation(value)}
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
        <Label className="text-sm font-medium ">Spouse first name</Label>
        <Input
          id="spouseFirstName"
          value={spouseFirstName}
          onChange={(e) => setSpouseFirstName(e.target.value)}
          placeholder="First name"
          type="text"
          autoCapitalize="none"
          autoComplete="spouseFirstName"
          autoCorrect="off"
          required
          className="bg-white"
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Spouse last name</Label>
        <Input
          id="spouseLastName"
          value={spouseLastName}
          onChange={(e) => setSpouseLastName(e.target.value)}
          placeholder="Last name"
          type="text"
          autoCapitalize="none"
          autoComplete="spouseLastName"
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
          disabled={!spouseLastName || !spouseFirstName || !spouseSalutation}
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormSpouse;
