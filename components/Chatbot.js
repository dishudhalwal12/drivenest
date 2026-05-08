'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, User } from 'lucide-react';

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'model', content: "Hi! I'm your DriveNest Assistant. What kind of car are you looking for today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async (e) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    
    // Add user message to UI
    const newMessages = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: messages // Send previous context
        }),
      });

      const data = await response.json();

      if (data.success) {
        setMessages([...newMessages, { role: 'model', content: data.text }]);
      } else {
        setMessages([...newMessages, { role: 'model', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages([...newMessages, { role: 'model', content: "Sorry, an error occurred." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleChat = () => setIsOpen(!isOpen);

  // Simple function to format basic markdown (bold text)
  const formatText = (text) => {
    // Replace **text** with <strong>text</strong>
    const formatted = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    // Replace newlines with <br/>
    return formatted.replace(/\n/g, '<br/>');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={`fixed bottom-6 right-6 p-4 rounded-buttons bg-interactive-blue text-cloud-white shadow-lg hover:bg-vivid-blue hover:scale-105 transition-all duration-300 z-50 flex items-center justify-center ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
        aria-label="Open chat"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-6 right-6 w-80 sm:w-96 bg-space-gray rounded-cards border border-deep-graphite shadow-2xl flex flex-col z-50 transition-all duration-300 transform origin-bottom-right ${
          isOpen ? 'scale-100 opacity-100 pointer-events-auto' : 'scale-95 opacity-0 pointer-events-none'
        }`}
        style={{ height: '500px', maxHeight: 'calc(100vh - 48px)' }}
      >
        {/* Header */}
        <div className="bg-pitch-black p-4 rounded-t-cards border-b border-deep-graphite flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-interactive-blue flex items-center justify-center">
              <Bot className="w-5 h-5 text-cloud-white" />
            </div>
            <div>
              <h3 className="font-semibold text-cloud-white text-[17px]">DriveNest AI</h3>
              <p className="text-[12px] text-cool-gray">Powered by Gemini</p>
            </div>
          </div>
          <button 
            onClick={toggleChat}
            className="text-cool-gray hover:text-cloud-white transition p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-space-gray">
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex flex-col max-w-[85%] ${msg.role === 'user' ? 'ml-auto items-end' : 'mr-auto items-start'}`}
            >
              <div 
                className={`p-3 text-[14px] leading-body-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-interactive-blue text-cloud-white rounded-2xl rounded-tr-sm' 
                    : 'bg-pitch-black text-ghost-white rounded-2xl rounded-tl-sm border border-deep-graphite'
                }`}
                dangerouslySetInnerHTML={{ __html: formatText(msg.content) }}
              />
            </div>
          ))}
          
          {isLoading && (
            <div className="flex flex-col max-w-[85%] mr-auto items-start">
              <div className="p-3 bg-pitch-black text-ghost-white rounded-2xl rounded-tl-sm border border-deep-graphite">
                <div className="flex gap-1">
                  <span className="w-2 h-2 bg-cool-gray rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-cool-gray rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-cool-gray rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSend} className="p-4 bg-pitch-black rounded-b-cards border-t border-deep-graphite flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about our cars..."
            className="flex-1 bg-space-gray text-cloud-white placeholder-cool-gray text-[14px] rounded-inputs px-4 py-2 border border-deep-graphite focus:outline-none focus:border-interactive-blue transition"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="bg-interactive-blue text-cloud-white p-2.5 rounded-buttons hover:bg-vivid-blue transition disabled:opacity-50 disabled:cursor-not-allowed flex-shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </>
  );
}
