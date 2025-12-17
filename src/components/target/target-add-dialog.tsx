import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import Tooltips from "../tooltips";
import { AlertCircleIcon, LoaderCircle, PlusCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { ITarget } from "@/types/target.typs";

import { Input } from "../ui/input";
import { useTheme } from "next-themes";
import dynamic from "next/dynamic";
import { Theme, EmojiStyle } from "emoji-picker-react";
import numberFormatter from "@/lib/number-formatter";
import { useAddTarget } from "@/hooks/use-target";
import { toast } from "sonner";
import { Alert, AlertTitle } from "../ui/alert";

const Emoji = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

export function TargetAddDialog() {
  const { theme } = useTheme();

  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(true);
  const [isForm, setIsForm] = useState<ITarget>({
    goals: 0,
    title: "",
    icon: "✈️",
  });

  const { addTargetTrigger, addTargetIsSError, addTargetMassage } =
    useAddTarget();
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  const handleEmoji = useCallback((emojiObject: { emoji: string }) => {
    setIsForm((prev) => ({ ...prev, icon: emojiObject.emoji }));
    setIsEmojiPickerOpen(false);
  }, []);

  const toggleEmojiPicker = useCallback(() => {
    setIsEmojiPickerOpen((prev) => !prev);
  }, []);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsForm((prevForm) => ({
      ...prevForm,
      [e.target.name]: e.target.value,
    }));
  };

  const handleAddCategory = async () => {
    const newFormData = {
      icon: isForm.icon,
      title: isForm.title,
      goals: isForm.goals,
    };
    try {
      const response = await addTargetTrigger("POST", newFormData);

      toast(response?.result?.message, {
        style: {
          borderRadius: "30px",
          height: "40px",
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AlertDialog>
      <Tooltips label="Target">
        <AlertDialogTrigger asChild>
          <Button className="rounded-full cursor-pointer h-9 w-9 md:w-auto">
            <PlusCircle />
            <p className="hidden md:block">Target</p>
          </Button>
        </AlertDialogTrigger>
      </Tooltips>
      <AlertDialogContent className="md:w-[25rem] rounded-3xl">
        <AlertDialogHeader>
          <AlertDialogTitle>Add Target</AlertDialogTitle>
          <AlertDialogDescription></AlertDialogDescription>
        </AlertDialogHeader>

        <section className="space-y-3">
          {addTargetIsSError && (
            <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>{addTargetMassage}</AlertTitle>
            </Alert>
          )}

          <div className="flex gap-2">
            <div className="relative rounded-md h-9  border flex items-center justify-center">
              <Tooltips label="Emoji">
                <Button
                  variant="secondary"
                  className="cursor-pointer p-2"
                  onClick={toggleEmojiPicker}
                >
                  <p className="text-lg">{isForm.icon}</p>
                </Button>
              </Tooltips>

              <div className="absolute lg:top-10 lg:-left-5 bottom-24 -right-48 z-50">
                <Emoji
                  height={350}
                  width={260}
                  theme={theme === "light" ? Theme.LIGHT : Theme.DARK}
                  emojiStyle={EmojiStyle.FACEBOOK}
                  open={isEmojiPickerOpen}
                  onEmojiClick={handleEmoji}
                />
              </div>
            </div>

            <Input
              onChange={onChangeHandler}
              type="text"
              name="title"
              placeholder="Title"
            />
          </div>

          <Input
            onChange={onChangeHandler}
            type="number"
            name="goals"
            placeholder="Target"
          />
        </section>

        <div className="flex justify-end mt-5">
          <Button
            onClick={handleAddCategory}
            variant="default"
            size="sm"
            className={`rounded-full cursor-pointer h-8 md:h-9`}
          >
            {/* <LoaderCircle className="animate-spin" /> */}
            Submit
          </Button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
