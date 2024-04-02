'use client';

import { ChatProvider } from "@/utils/enums";


interface ButtonSwitchProps {
    // Selected option
    selected: ChatProvider;
    // Callback when option changes
    onChange: (selected: ChatProvider) => void;
}

export default function ButtonSwitch({selected, onChange}: ButtonSwitchProps) {
    return (
        <div className="flex flex-row flex-wrap space-x-3 w-full justify-center">
            <Button text="OpenAI" isSelected={selected === ChatProvider.OpenAI} onClick={() => onChange(ChatProvider.OpenAI)} />
            <Button text="Groq" isSelected={selected === ChatProvider.Groq} onClick={() => onChange(ChatProvider.Groq)} />
        </div>
    );
}

interface ButtonProps {
    text: string;
    isSelected: boolean;
    onClick: () => void;
}

export function Button({text, isSelected, onClick}: ButtonProps) {
    return (
        <button onClick={onClick} className={`w-20 h-10 rounded-lg ${isSelected ? "bg-gray-3" : "bg-gray-1"} ${!isSelected ? "hover:bg-gray-4" : ""} text-gray-5 text-sm`}>
            {text}
        </button>
    );

}