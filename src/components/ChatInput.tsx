import { faMagicWandSparkles, faPaperclip } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Button, Textarea } from "react-daisyui";
import { IChatInputProps } from "../types";

export const ChatInput: React.FC<IChatInputProps> = ({
  disabled,
  onSubmit,
  placeholder,
  customSubmitIcon,
}) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [textAreaHeight, setTextAreaHeight] = useState(48); // Starting height
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleSubmit = useCallback(
    (e: React.SyntheticEvent) => {
      e.preventDefault();
      const textArea = textAreaRef?.current;
      // @ts-ignore
      if (onSubmit && (textArea?.value.trim().length > 0 || selectedFile)) {
        onSubmit(textArea?.value || "", selectedFile);
        textArea && (textArea.value = "");
        setTextAreaHeight(48); // Reset height after submission
        setSelectedFile(null); // Reset file input
      }
    },
    [onSubmit, selectedFile]
  );

  const handleEnterKey = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        handleSubmit(e);
      }
    },
    [handleSubmit]
  );

  const handleInput = useCallback(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = "auto";
      const newHeight = Math.min(400, Math.max(48, textArea.scrollHeight));
      setTextAreaHeight(newHeight);
    }
  }, []);

  useEffect(() => {
    const textArea = textAreaRef.current;
    if (textArea) {
      textArea.style.height = `${textAreaHeight}px`;
    }
  }, [textAreaHeight]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setSelectedFile(file);
  };

  return (
    <div className="flex justify-center items-center relative max-w-4xl mx-auto w-full focus">
      <Textarea
        ref={textAreaRef}
        bordered
        className="resize-none w-full overflow-y-auto transition-all duration-200 ease-in-out pr-12"
        style={{
          height: `${textAreaHeight}px`,
          maxHeight: "400px",
          width: "100%",
        }}
        onKeyUp={handleEnterKey}
        onInput={handleInput}
        placeholder={placeholder ? placeholder : "Type here to chat"}
        disabled={disabled}
      ></Textarea>

      {/* Styled paperclip icon to trigger file input */}
      <label htmlFor="file-upload" className="cursor-pointer absolute bottom-2 right-12">
        <FontAwesomeIcon className="absolute bottom-2 right-2" icon={faPaperclip} size="lg" />
      </label>
      <input
        id="file-upload"
        type="file"
        accept="*"
        onChange={handleFileChange}
        disabled={disabled}
        className="hidden"
      />

      {/* Display selected file name */}
      {selectedFile && (
        <span className="absolute bottom-2 left-12 text-sm text-gray-600">{selectedFile.name}</span>
      )}

      <Button
        shape="square"
        size="sm"
        className="absolute bottom-2 right-2"
        disabled={disabled}
        onClick={handleSubmit}
      >
        {customSubmitIcon ? customSubmitIcon : <FontAwesomeIcon icon={faMagicWandSparkles} />}
      </Button>
    </div>
  );
};
