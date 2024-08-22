"use client";

import React, { useCallback, useRef } from "react";
import { IChatUIProps } from "../types";
import { ChatConversations } from "./ChatConversations";
import { ChatInput } from "./ChatInput";

export const ChatInterface: React.FC<IChatUIProps> = ({
  isQuerying,
  onSubmit,
  placeholder,
  disabled,
  conversations,
  customSubmitIcon,
}) => {
  const chatConversationsContainerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = useCallback(
    async (value: string, file: File | null) => {
      if (onSubmit) {
        onSubmit(value, file);
      }
    },
    [onSubmit]
  );

  return (
    <div className="flex flex-col h-screen">
      <div ref={chatConversationsContainerRef} className="flex-grow overflow-y-auto">
        <ChatConversations
          conversations={conversations}
          isQuerying={isQuerying}
          chatConversationsContainerRef={chatConversationsContainerRef}
        />
      </div>
      <div className="flex justify-center items-center">
        <div className="w-3/4 p-4">
          <ChatInput
            disabled={disabled}
            customSubmitIcon={customSubmitIcon}
            onSubmit={handleSubmit}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};
