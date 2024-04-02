'use client';
interface GrayButtonProps {
    text: string;
    onClick: () => void;
}

export default function GrayButton({text, onClick}: GrayButtonProps) {
    return (
        <button onClick={onClick} className="w-full h-11 rounded-lg bg-gray-3 hover:bg-gray-4 text-gray-5 text-sm">
            {text}
        </button>
    );

}