"use client";

import { RiRobot2Fill } from "react-icons/ri";
import { IoIosSettings } from "react-icons/io";
import GrayButton from "./GrayButton";
import { Conversation, Message } from "@/utils/classes";
import { IoMdTrash } from "react-icons/io";
import { ChatProvider, Sender } from "@/utils/enums";
import useConversationsStore from "@/hooks/useConversationsStore";
import { generateId } from "@/utils/utils";
import MyComponent from "./DialogSettings";
import { useSettingsStore } from "@/hooks/useSettingsStore";

export default function SectionConversations() {
  const { conversations, addConversation, setCurrentConversation } =
    useConversationsStore();
    const {isDialogOpen, setDialogOpen} = useSettingsStore();

  const handleNewConversation = () => {
    const newConversation = new Conversation(
      generateId(),
      [],
      ChatProvider.OpenAI,
      "",
      100,
      0.5,
      0.3,
      "",
      "",
      ""
    );
    addConversation(newConversation);
    setCurrentConversation(newConversation);
  };

  const handleSettings = () => {
    setDialogOpen(true);
  }

  return (
    <div className="flex flex-col h-full w-full px-4 py-8 space-y-3">
      {/* Title and Settings */}
      <div className="flex flex-row items-center ">
        {/* Logo */}
        <RiRobot2Fill color="#767676" className="flex-shrink-0" size={26} />
        {/* Title */}
        <div className="text-gray-5 text-md ml-3">Conversations</div>
        {/* Spacer */}
        <div className="flex-grow"></div>
        {/* Settings */}
        <IoIosSettings onClick={handleSettings} color="#767676" className="cursor-pointer flex-shrink-0" size={26} />
      </div>

      {/* Start Conversations */}
      <GrayButton text="New conversation" onClick={handleNewConversation} />

      {/* List of Conversations */}
      <ListConversations conversations={conversations} />
      <MyComponent/>
    </div>
  );
}

interface ListConversationsProps {
  conversations: Conversation[];
}

function ListConversations({ conversations }: ListConversationsProps) {
  const { currentConversation } = useConversationsStore();
  return (
    <div className="flex flex-col w-full space-y-3">
      {conversations.map((conversation) => (
        <ConversationBox
          key={conversation.id}
          conversation={conversation}
          isSelected={
            currentConversation !== null &&
            currentConversation.id === conversation.id
          }
        />
      ))}
    </div>
  );
}

interface ConversationBoxProps {
  conversation: Conversation;
  isSelected?: boolean;
}

function ConversationBox({
  conversation,
  isSelected = false,
}: ConversationBoxProps) {
  const { setCurrentConversation, removeConversation } = useConversationsStore();

  const handleOnClick = () => {
    setCurrentConversation(conversation);
  };
  const handleDeleteConversation = (event: React.MouseEvent) => {
    removeConversation(conversation)
    event.stopPropagation();
  };

  return (
    <div
      onClick={handleOnClick}
      className={`group h-12 px-3 space-x-2 flex flex-row items-center ${
        !isSelected ? "hover:bg-gray-4" : ""
      } rounded-lg cursor-pointer ${isSelected ? "bg-gray-3" : ""}`}
    >
      {/* Trash */}
      <IoMdTrash
        onClick={handleDeleteConversation}
        color="#767676"
        className="flex-shrink-0 invisible group-hover:visible"
        size={20}
      />
      {/* Name */}
      <div className="text-gray-5 text-sm">{conversation.id}</div>
      
    </div>
  );
}
