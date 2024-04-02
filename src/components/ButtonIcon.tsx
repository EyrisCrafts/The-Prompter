interface ButtonIconProps {
  icon: React.ReactNode;
  onClick: () => void;
}

export default function ButtonIcon({ icon, onClick }: ButtonIconProps) {
  return (
    <div>
      <button
        onClick={onClick}
        className={`w-6 h-6 cursor-pointer `}
      >
        {icon}
      </button>
    </div>
  );
}
