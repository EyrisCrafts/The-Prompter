"use client";

interface TextFieldProps {
  hint: string;
  value: string;
  isHintVisible?: boolean;
  isLabelVisible?: boolean;
  height?: string;
  isTextArea?: boolean;
  onEnter?: () => void;
  onChange: (value: string) => void;
}

export default function TextField({
  hint,
  value,
  isHintVisible = false,
  isLabelVisible = false,
  height = "h-10",
  isTextArea = false,
  onChange,
  onEnter,
}: TextFieldProps) {
  let commonProps = {
    className: `w-full ${height} rounded-lg bg-gray-3 placeholder-text-gray-5 text-white text-sm px-4 outline-none ${
      isTextArea ? "pt-3" : ""
    }`,
    placeholder: isHintVisible ? hint : "",
    value: value,
    onKeyDown: (e: React.KeyboardEvent) => e.key == "Enter" && onEnter && onEnter(),
    onChange: (
      e:
        | React.ChangeEvent<HTMLInputElement>
        | React.ChangeEvent<HTMLTextAreaElement>
    ) => onChange(e.target.value),
  };

  return (
    <div className="flex flex-col w-full align-start">
      {/* Label */}
      {isLabelVisible && (
        <label className="text-gray-5 text-sm mb-1">{hint}</label>
      )}
      {/* Input & suffix */}
      {isTextArea ? <textarea {...commonProps} /> : <input {...commonProps} />}
    </div>
  );
}
