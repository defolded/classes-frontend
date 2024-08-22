"use client";

import { faMailReply } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCallback, useState } from "react";
import { ChatInterface } from "../components/ChatInterface";
import { MessageRole } from "../enums/MessageRole";
import { Conversations } from "../types";

const BACKEND_URL = "http://127.0.0.1:8000"; // update with api url

export default function Home() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  const [conversations, setConversations] = useState<Conversations>([
    {
      id: "1",
      role: MessageRole.ASSISTANT,
      message: "Hello! How can I assist you today?",
    },
  ]);

  const handleSubmit = useCallback(async (value: string, file: File | null) => {
    setIsQuerying(true);

    // Add user message to conversations
    setConversations((prev) => [
      ...prev,
      {
        id: (prev.length + 1).toString(),
        role: MessageRole.USER,
        message: value,
      },
    ]);

    try {
      const formData = new FormData();
      formData.append("prompt", value);
      if (file) {
        formData.append("file", file);
      }

      const response = await fetch(`${BACKEND_URL}/generate`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch response");
      }

      const data = await response.json();
      const backendResponse = data.response; // Extract the response object

      let formattedMessage;
      if (backendResponse.course_id) {
        formattedMessage = `Course: ${backendResponse.course_name}\nPrerequisites:\n${
          Array.isArray(backendResponse.prerequisites)
            ? backendResponse.prerequisites.join("\n")
            : backendResponse.prerequisites
        }`;
      } else if (backendResponse.error) {
        formattedMessage = backendResponse.error;
      } else {
        formattedMessage = backendResponse;
      }

      // Add AI response to conversations
      setConversations((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          role: MessageRole.ASSISTANT,
          message: formattedMessage,
        },
      ]);

      return formattedMessage;
    } catch (error) {
      console.error("Error fetching response:", error);

      // Add error message to conversations
      setConversations((prev) => [
        ...prev,
        {
          id: (prev.length + 1).toString(),
          role: MessageRole.ASSISTANT,
          message: "Sorry, I couldn't process your request. Please try again.",
        },
      ]);

      return "Sorry, I couldn't process your request. Please try again.";
    } finally {
      setIsQuerying(false);
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col">
      <ChatInterface
        isQuerying={isQuerying}
        onSubmit={handleSubmit}
        placeholder="Type your message here..."
        disabled={isQuerying}
        conversations={conversations}
        customSubmitIcon={<FontAwesomeIcon icon={faMailReply} />}
      />
    </main>
  );
}
