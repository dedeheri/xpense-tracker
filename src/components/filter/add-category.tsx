"use client";

import { useAddCategory } from "@/hooks/use-category";
import { CategoryFormData } from "@/types/category.types";

import { AlertCircleIcon, ChevronLeft, LoaderCircle, Plus } from "lucide-react";
import { useCallback, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Alert, AlertTitle } from "../ui/alert";

import { Theme, EmojiStyle } from "emoji-picker-react";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import Tooltips from "../tooltips";

const Emoji = dynamic(
  () => {
    return import("emoji-picker-react");
  },
  { ssr: false }
);

interface AddCategoryProps {
  handleToggleAddingMode: () => void;
}

const AddCatergory = ({ handleToggleAddingMode }: AddCategoryProps) => {
  const { theme } = useTheme();

  const {
    addCategoryTrigger,
    addCategoryMutation,
    addCategoryData,
    addCategoryError,
  } = useAddCategory();

  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState<boolean>(false);

  // add category form state
  const [formData, setFormData] = useState<CategoryFormData>({
    title: "",
    icon: "🍔",
  });

  //   toggle emoji picker
  const toggleEmojiPicker = useCallback(() => {
    setIsEmojiPickerOpen((prev) => !prev);
  }, []);

  //   handle emoji select
  const handleEmoji = useCallback((emojiObject: { emoji: string }) => {
    setFormData((prev) => ({ ...prev, icon: emojiObject.emoji }));
    setIsEmojiPickerOpen(false);
  }, []);

  //   onchange handler
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //   handle submit
  const handleAddCategory = async () => {
    const newCategorys = {
      title: formData.title,
      icon: formData.icon,
    };

    await addCategoryTrigger("POST", newCategorys);
  };

  return (
    <section>
      <div className="border-b py-1.5 px-4 flex  space-x-2 items-center">
        <Tooltips label="Back">
          <Button
            onClick={handleToggleAddingMode}
            variant="secondary"
            size="icon"
            className="rounded-full size-7 cursor-pointer"
          >
            <ChevronLeft className="size-5" />
          </Button>
        </Tooltips>
      </div>

      <div className="px-4 py-2 space-y-2">
        {addCategoryError && (
          <Alert className="py-2.5">
            <AlertCircleIcon />
            <AlertTitle>{addCategoryData?.message}</AlertTitle>
          </Alert>
        )}

        <div className=" flex space-x-1">
          <div className="relative rounded-md h-9 w-14 border flex items-center justify-center">
            <Tooltips label="Emoji">
              <Button
                variant="secondary"
                className="cursor-pointer p-2"
                onClick={toggleEmojiPicker}
              >
                <p className="text-lg">{formData.icon}</p>
              </Button>
            </Tooltips>

            <div className="absolute top-11 left-0">
              <Emoji
                height={400}
                width={350}
                theme={theme === "light" ? Theme.LIGHT : Theme.DARK}
                emojiStyle={EmojiStyle.APPLE}
                open={isEmojiPickerOpen}
                onEmojiClick={handleEmoji}
              />
            </div>
          </div>

          <Input
            name="title"
            placeholder="Category"
            onChange={onChangeHandler}
          />
        </div>

        <div className="flex justify-end">
          <Tooltips label="Add">
            <Button
              disabled={addCategoryMutation}
              onClick={handleAddCategory}
              className="rounded-full h-8 cursor-pointer"
            >
              {addCategoryMutation ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                <Plus />
              )}
              Add
            </Button>
          </Tooltips>
        </div>
      </div>
    </section>
  );
};

export default AddCatergory;
