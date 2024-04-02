"use client";
import useConversationsStore from "@/hooks/useConversationsStore";
import ButtonSwitch from "./ButtonSwitch";
import TextField from "./TextField";
import { ChatProvider } from "@/utils/enums";
import { showErrorToast } from "@/utils/utils";

export default function SectionConfigurations() {
  const { currentConversation, updateCurrentConversation } =
    useConversationsStore();
  const userName = currentConversation?.userName ?? "";
  const characterName = currentConversation?.characterName ?? "";
  const intro = currentConversation?.intro ?? "";
  const prompt = currentConversation?.prompt ?? "";
  const maxTokens = currentConversation?.maxTokens ?? "";
  const temperature = currentConversation?.temperature ?? "";
  const topP = currentConversation?.topP ?? "";
  const chatProvider = currentConversation?.chatProvider ?? ChatProvider.OpenAI;

  return (
    <div className="px-11 pt-14 space-y-3 h-full ">
      <TextField
        hint={"User name"}
        isHintVisible={true}
        value={userName}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation && (currentConversation.userName = newValue);
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <TextField
        hint={"Character name"}
        isHintVisible={true}
        value={characterName}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation && (currentConversation.characterName = newValue);
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <TextField
        hint={"Intro"}
        isHintVisible={true}
        value={intro}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation && (currentConversation.intro = newValue);
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <TextField
        hint={"Prompt"}
        isHintVisible={true}
        isTextArea={true}
        value={prompt}
        height="h-28"
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation && (currentConversation.prompt = newValue);
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <ButtonSwitch
        selected={chatProvider}
        onChange={(selected: ChatProvider) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation && (currentConversation.chatProvider = selected);
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />

      <div className="p-1"></div>

      <TextField
        hint={"Max Tokens"}
        isLabelVisible={true}
        value={maxTokens.toString()}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation &&
            (currentConversation.maxTokens = parseInt(newValue));
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <TextField
        hint={"Temperature"}
        isLabelVisible={true}
        value={temperature.toString()}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation &&
            (currentConversation.temperature = parseFloat(newValue));
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
      <TextField
        hint={"Top P"}
        isLabelVisible={true}
        value={topP.toString()}
        onChange={(newValue) => {
          if (currentConversation == null) {
            showErrorToast("Conversation not set");
          }
          currentConversation &&
            (currentConversation.topP = parseFloat(newValue));
          currentConversation && updateCurrentConversation(currentConversation);
        }}
      />
    </div>
  );
}
