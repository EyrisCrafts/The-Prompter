import { ChatProvider, Sender } from "./enums";

export class Conversation {
  constructor(
    public id: string,
    public messages: Message[],
    public chatProvider: ChatProvider,
    public prompt: string,
    public maxTokens: number,
    public temperature: number,
    public topP: number,
    public intro: string,
    public userName: string,
    public characterName: string,
  ) {
    this.id = id;
    this.messages = messages;
    this.chatProvider = chatProvider;
    this.prompt = prompt;
    this.maxTokens = maxTokens;
    this.temperature = temperature;
    this.topP = topP;
    this.intro = intro;
    this.userName = userName;
    this.characterName = characterName;
  }
}

export class Message {
  constructor(
    public sender: Sender,
    public content: string,
    public timestamp: Date,
  ) {
    this.content = content;
    this.timestamp = timestamp;
    this.sender = sender;
  }
}
