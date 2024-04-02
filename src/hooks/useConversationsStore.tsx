import { Conversation } from "@/utils/classes";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ConversationStoreProps {
  conversations: Conversation[];
  currentConversation: Conversation | null;
  isResponseLoading: boolean;

  addConversation: (conversation: Conversation) => void;
  removeConversation: (conversation: Conversation) => void;
  updateConversation: (conversation: Conversation) => void;
  setCurrentConversation: (conversation: Conversation) => void;
  updateCurrentConversation: (conversation: Conversation) => void;
  setResponseLoading: (isLoading: boolean) => void;
}

const useConversationsStore = create<ConversationStoreProps>()(
  persist(
    (set) => ({
      conversations: [],
      currentConversation: null,
      addConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: [...state.conversations, conversation],
        })),
      removeConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: state.conversations.filter(
            (c) => c.id !== conversation.id
          ),
        })),
      updateConversation: (conversation: Conversation) =>
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === conversation.id ? conversation : c
          ),
        })),

      // Update the current conversation
      setCurrentConversation: (conversation: Conversation) =>
        set({ currentConversation: conversation }),
      updateCurrentConversation: (conversation: Conversation) =>
        set((state) => ({
          currentConversation: state.currentConversation
            ? conversation.id === state.currentConversation.id
              ? conversation
              : state.currentConversation
            : state.currentConversation,
        })),
      isResponseLoading: false,
      setResponseLoading: (isLoading: boolean) =>
        set(() => ({ isResponseLoading: isLoading })),
    }),
    {
      name: "conversation-storage", // name of the item in the storage (must be unique)
    }
  )
);

export default useConversationsStore;
