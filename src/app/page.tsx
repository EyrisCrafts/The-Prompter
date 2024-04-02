import DialogSettings from "@/components/DialogSettings";
import SectionChat from "@/components/SectionChat";
import SectionConfigurations from "@/components/SectionConfigurations";
import SectionConversations from "@/components/SectionConversations";
import TextField from "@/components/TextField";
import Image from "next/image";
import { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <>
    <Toaster />
      <main className="container grid grid-cols-12 max-w-screen-2xl min-h-screen divide-x divide-gray-7">
        {/* Conversations side bar */}
        <div className="col-span-3 bg-gray-2">
          <SectionConversations />
        </div>

        {/* Chat section */}
        <div className="col-span-6">
          <SectionChat />
        </div>

        {/* Configurations section */}
        <div className="col-span-3">
          <SectionConfigurations />
        </div>
      </main>
    </>
  );
}
