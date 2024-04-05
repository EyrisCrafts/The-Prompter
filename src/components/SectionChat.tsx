"use client";
import ButtonIcon from "./ButtonIcon";
import { IoIosRefresh } from "react-icons/io";
import { Message } from "@/utils/classes";
import { ChatProvider, Sender } from "@/utils/enums";
import { RiRobot2Fill } from "react-icons/ri";
import { PiUserCircle } from "react-icons/pi";
import useConversationsStore from "@/hooks/useConversationsStore";
import { useEffect, useRef, useState } from "react";
import PulseLoader from "react-spinners/PulseLoader";
import { useSettingsStore } from "@/hooks/useSettingsStore";
import DialogSettings from "./DialogSettings";
import { showErrorToast } from "@/utils/utils";
import { apiCall } from "@/utils/api";

export default function SectionChat() {
  const { currentConversation, updateCurrentConversation, setResponseLoading } =
    useConversationsStore();
  const { openaiKey, groqKey, setDialogOpen } = useSettingsStore();
  const inputRef = useRef<HTMLInputElement>(null); // To give focus to the textfield
  const messages = currentConversation?.messages ?? [];

  const [message, updateMessage] = useState("");

  const handleRefresh = () => {
    if (currentConversation) {
      currentConversation.messages = []; // Add intro message
      if (currentConversation.intro !== "") {
        currentConversation.messages.push(
          new Message(
            Sender.Assistant,
            currentConversation.characterName +
              ": " +
              currentConversation.intro,
            new Date()
          )
        );
      }
      console.log("Refreshing conversation", currentConversation);
      updateCurrentConversation(currentConversation);
    }
  };

  const handleMessageSending = async () => {
    if (
      currentConversation?.chatProvider === ChatProvider.OpenAI &&
      openaiKey === ""
    ) {
      console.log("OpenAI key not set");
      setDialogOpen(true);
      return;
    } else if (
      currentConversation?.chatProvider === ChatProvider.Groq &&
      groqKey === ""
    ) {
      console.log("OpenAI key not set");
      setDialogOpen(true);
      return;
    }
    if (currentConversation == null) {
      showErrorToast("Conversation not set");
      return;
    }
    // check if prompt and other stuff is set
    if (currentConversation?.prompt === "") {
      showErrorToast("Prompt is not set");
      return;
    }
    if (currentConversation?.system === "") {
      showErrorToast("System prompt is not set");
      return;
    }
    if (currentConversation?.userName === "") {
      showErrorToast("User name is not set");
      return;
    }
    if (currentConversation?.characterName === "") {
      showErrorToast("Character name is not set");
      return;
    }

    if (currentConversation?.maxTokens === null) {
      showErrorToast("Max tokens is not set");
      return;
    }
    if (currentConversation?.temperature === null) {
      showErrorToast("Temperature is not set");
      return;
    }
    if (currentConversation) {
      if (
        currentConversation?.messages.length === 0 &&
        currentConversation?.intro !== ""
      ) {
        currentConversation.messages.push(
          new Message(
            Sender.Assistant,
            currentConversation.characterName +
              ": " +
              currentConversation?.intro,
            new Date()
          )
        );
      }

      currentConversation.messages.unshift(
        new Message(
          Sender.User,
          currentConversation.userName + ": " + message,
          new Date()
        )
      );
      updateCurrentConversation(currentConversation);
      updateMessage("");

      // Set to Loading
      setResponseLoading(true);

      const apiKey =
        currentConversation?.chatProvider === ChatProvider.OpenAI
          ? openaiKey
          : groqKey;

      try {
        const response = await apiCall(
          apiKey,
          currentConversation?.chatProvider,
          currentConversation
        );
        setResponseLoading(false);

        if (currentConversation) {
          currentConversation.messages.unshift(
            new Message(Sender.Assistant, response, new Date())
          );
          updateCurrentConversation(currentConversation);
        }
        inputRef.current?.focus();
      } catch (error) {
        setResponseLoading(false);
        showErrorToast("Error in fetching response");
        return;
      }
    }
  };

  return (
    <div className="h-full flex flex-col-reverse px-10 py-5 max-h-screen">
      <DialogSettings />

      {/* Text Field for user */}
      <InputMessageBox
        onChange={(value) => {
          updateMessage(value);
        }}
        onEnter={handleMessageSending}
        value={message}
        onRefresh={handleRefresh}
      />

      <div className="flex-grow overflow-y-auto flex flex-col-reverse justify-start">
            {/* Chat messages */}
            {messages.map((message) => {
            return (
                <MessageBox
                key={message.timestamp
                    .toString()
                    .concat(message.content)
                    .concat(message.sender.toString())}
                message={message}
                />
            );
            })}

        </div>
    </div>
  );
}

// Message Box
interface MessageBoxProps {
  message: Message;
}

function MessageBox({ message }: MessageBoxProps) {
  const sender = message.sender;
  const content = message.content;
  const timestamp = message.timestamp;
  const icon =
    sender === Sender.User ? (
      <PiUserCircle color="#767676" className="flex-shrink-0 mt-1" />
    ) : (
      <RiRobot2Fill color="#767676" className="flex-shrink-0 mt-1" />
    );
  const align = sender === Sender.User ? "justify-end" : "justify-start";
  const containerAlign = sender === Sender.User ? "items-end" : "items-start";

  return (
    <div className={`w-full flex flex-row ${containerAlign} ${align} my-1`}>
      <div className="inline-flex min-h-10 rounded-lg bg-gray-3  flex-row items-start py-3 px-3">
        {/* Prefix */}
        {sender === Sender.User ? null : icon}

        {/* Message content */}

        <div className="text-gray-300 text-sm px-2">{content}</div>

        {/* Suffix icon */}
        {sender === Sender.User ? icon : null}
      </div>
    </div>
  );
}

// Input Message Box

interface InputMessageBoxProps {
  onChange: (value: string) => void;
  onEnter: () => void;
  value: string;
  onRefresh: () => void;
}

function InputMessageBox({
  onChange,
  onEnter,
  value,
  onRefresh,
    
}: InputMessageBoxProps) {
  const { isResponseLoading } = useConversationsStore();
  const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (!isResponseLoading && inputRef.current !== null) {
            inputRef.current?.focus();
        }
    }, [isResponseLoading]);
  return (
    <div className="w-full h-10 rounded-lg bg-gray-3 flex flex-row items-center space-x-2 mt-1 flex-shrink-0">
      {isResponseLoading ? (
        <div className="w-full flex flex-row justify-center">
          <PulseLoader color="#767676" className="" size={8} />
        </div>
      ) : (
        <input
          ref={inputRef}
          placeholder="Say something"
          className="w-full h-full bg-gray-3 text-white rounded-lg text-sm px-4 outline-none"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onEnter()}
        />
      )}

      <ButtonIcon icon={<IoIosRefresh color="#767676" />} onClick={onRefresh} />
    </div>
  );
}
