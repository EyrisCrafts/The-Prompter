"use client";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import React, { useState, useRef } from "react";
import TextField from "./TextField";

export default function DialogSettings() {
  const {
    isDialogOpen,
    setDialogOpen,
    openaiKey,
    groqKey,
    setOpenaiKey,
    setGroqKey,
  } = useSettingsStore();

  const [textValue, setTextValue] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null); // Create a ref for the dialog

  const closeDialog = () => setDialogOpen(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Submitted value:", textValue);
    closeDialog();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextValue(event.target.value);
  };

  const handleOverlayClick = (event: React.MouseEvent) => {
    // Close the dialog if the click occurred outside the dialog
    if (
      dialogRef.current &&
      !dialogRef.current.contains(event.target as Node)
    ) {
      closeDialog();
    }
  };

  const onEnter = () => { 
    console.log("Enter pressed");
    closeDialog();
  }

  return (
    <div>
      {isDialogOpen && (
        <div
          className="fixed inset-0 bg-black/20 bg-opacity-50 flex justify-center items-center"
          onClick={handleOverlayClick} // Add click handler to the overlay
        >
          <div
            ref={dialogRef}
            className="flex w-96 flex-col space-y-3 bg-gray-1 p-5 rounded-lg animate-[slideUp_0.5s_ease-out]"
            onClick={(e) => e.stopPropagation()}
          >
            <TextField
              hint={"OpenAI Key"}
              isLabelVisible={true}
              value={openaiKey}
              onEnter={onEnter}
              onChange={(newValue) => {
                setOpenaiKey(newValue);
              }}
            />
            <TextField
              hint={"Groq Key"}
              isLabelVisible={true}
              value={groqKey}
              onEnter={onEnter}
              onChange={(newValue) => {
                setGroqKey(newValue);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
