import React, { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner"; // For toast notifications
import { Loader2 } from "lucide-react"; // Loading spinner from Lucide
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FormProps } from "@/lib/types";

const FormPersonal = ({ user, isEdit, onDone, onCancel }: FormProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [favoriteSport, setFavoriteSport] = useState(user?.favoriteSport || "");
  const [preferredMovie, setPreferredMovie] = useState(
    user?.preferredMovie || ""
  );
  const [hobbiesInterests, setHobbiesInterests] = useState(
    user?.hobbiesInterests || ""
  );
  const [preferredMusic, setPreferredMusic] = useState(
    user?.preferredMusic || ""
  );

  useEffect(() => {
    setFavoriteSport(user?.favoriteSport || "");
    setPreferredMovie(user?.preferredMovie || "");
    setHobbiesInterests(user?.hobbiesInterests || "");
    setPreferredMusic(user?.preferredMusic || "");
  }, [user]);

  const handleUpdateUser = async (e: FormEvent) => {
    e.preventDefault();
    const body = {
      favoriteSport,
      preferredMovie,
      hobbiesInterests,
      preferredMusic,
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
          <p className="text-sm font-medium ">Hobbies and interest</p>
          <p className="text-sm text-muted-foreground">
            {user?.hobbiesInterests || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Favorite sport</p>
          <p className="text-sm text-muted-foreground">
            {user?.favoriteSport || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Preferred movie</p>
          <p className="text-sm text-muted-foreground">
            {user?.preferredMovie || "-"}
          </p>
        </div>
        <div>
          <p className="text-sm font-medium ">Preferred music</p>
          <p className="text-sm text-muted-foreground">
            {user?.preferredMusic || "-"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleUpdateUser} className="flex flex-col gap-8">
      <div>
        <Label className="text-sm font-medium ">Hobbies and interest</Label>
        <Textarea
          value={hobbiesInterests}
          onChange={(e) => setHobbiesInterests(e.target.value)}
          placeholder="Hobbies and interest.."
          required
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Favorite sport</Label>
        <Textarea
          value={favoriteSport}
          onChange={(e) => setFavoriteSport(e.target.value)}
          placeholder="Favorite sport.."
          required
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Preferred movie</Label>
        <Textarea
          value={preferredMovie}
          onChange={(e) => setPreferredMovie(e.target.value)}
          placeholder="Preferred movie.."
          required
        />
      </div>
      <div>
        <Label className="text-sm font-medium ">Preferred music</Label>
        <Textarea
          value={preferredMusic}
          onChange={(e) => setPreferredMusic(e.target.value)}
          placeholder="Preferred music.."
          required
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
          disabled={
            !hobbiesInterests ||
            !preferredMovie ||
            !preferredMusic ||
            !favoriteSport
          }
        >
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormPersonal;
