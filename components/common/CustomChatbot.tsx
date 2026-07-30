"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, X, Send, Minimize2, Maximize2 } from "lucide-react";
import { getChatResponse, ChatMessage } from "@/lib/chatbot";

export default function CustomChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      text: "Hello! 👋 I'm your trading assistant. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const response = getChatResponse(inputValue);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.text,
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 800);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 z-50 bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
          aria-label="Open chat"
        >
          <MessageSquare className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 left-6 z-50 w-80 max-w-[calc(100vw-3rem)] bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-primary-200 dark:border-primary-800 overflow-hidden transition-all duration-300">
          {/* Header */}
          <div className="bg-primary-600 text-white p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Trading Assistant</h3>
                  <p className="text-xs text-white/80">Online • Ready to help</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label={isMinimized ? "Maximize" : "Minimize"}
                >
                  {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close chat"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

              {/* Messages */}
              {!isMinimized && (
                <>
                  <div className="h-80 overflow-y-auto p-4 space-y-4 bg-slate-50/80 dark:bg-slate-800/50 backdrop-blur-sm">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl ${
                        message.sender === "user"
                          ? "bg-primary-600 text-white rounded-br-sm"
                          : "bg-white dark:bg-slate-700 text-slate-900 dark:text-white rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                      {message.sender === "bot" && (
                        <div className="mt-2 space-y-1">
                          {getChatResponse(message.text).links?.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              className="inline-block text-xs text-primary-600 dark:text-primary-400 hover:underline"
                            >
                              {link.label} →
                            </a>
                          ))}
                        </div>
                      )}
                      <p className="text-xs mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-slate-700 p-3 rounded-2xl rounded-bl-sm shadow-sm">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input */}
              <div className="p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-sm border-t border-primary-200 dark:border-primary-800">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask about trading tools, brokers..."
                    className="flex-1 px-4 py-2 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-900 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="px-4 py-2 bg-primary-600 hover:bg-primary-700 disabled:bg-slate-300 dark:disabled:bg-slate-700 text-white rounded-xl transition-colors flex items-center justify-center"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 text-center">
                  Powered by Brokr • 275+ Trading Tools
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
