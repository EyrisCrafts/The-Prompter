import { Conversation } from "./classes";
import Groq from "groq-sdk";
import { ChatProvider, Sender } from "./enums";
import OpenAI from "openai";
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";

interface ApiMessage {
  role: string;
  content: string;
}

export async function apiCall(
  apiKey: string,
  chatProvider: ChatProvider,
  conversation: Conversation
): Promise<string> {
  const openaiClient = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });
  const groqClient = new Groq({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true,
  });

  // Messages
  let messages: Array<ApiMessage> = [
    {
      role: "system",
      content: conversation.prompt,
    },
  ];

  // Append the conversation messages
  messages = messages.concat(
    conversation.messages.map((message) => {
      return {
        role: message.sender === Sender.User ? "user" : "assistant",
        content: message.content,
      };
    })
  );

  if (chatProvider === ChatProvider.OpenAI) {
    const messagesOpenai: Array<ChatCompletionMessageParam> =
      conversation.messages.map((message) => {
        return {
          role: message.sender === Sender.User ? "user" : "assistant",
          content: message.content,
        };
      });

    messagesOpenai.reverse();

    messagesOpenai.unshift({
      role: "system",
      content: conversation.prompt,
    });

    messagesOpenai.unshift({
      role: "system",
      content:
        conversation.system,
    });

    console.log("messagesOpenai", messagesOpenai);

    const params: OpenAI.Chat.ChatCompletionCreateParams = {
      messages: messagesOpenai,
      model: "gpt-3.5-turbo",
    };
    const response = await openaiClient.chat.completions.create(params);
    console.log("response", response);
    return response.choices[0]?.message?.content || "";
  } else {
    const response = await groqClient.chat.completions.create({
      messages: messages,
      model: "llama2-70b-4096",
    });

    return response.choices[0]?.message?.content || "";
  }
}
