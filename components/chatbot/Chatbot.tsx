'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Sparkles, Bot, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const starterPrompts = [
  {
    text: 'How many vehicles are available?',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    text: 'Show my active rentals',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    text: 'What is the total revenue?',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    text: 'How many customers do we have?',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    text: 'Show latest feedback',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    text: 'What can you help me with?',
    gradient: 'from-red-500 to-pink-500',
  },
];

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi there! I\'m your RentalPro assistant. I can help you with vehicle availability, rentals, customers, revenue analytics, and feedback. Choose a starter prompt below or type your question!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isAutoFilled, setIsAutoFilled] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate bot response
    setTimeout(() => {
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(text),
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userText: string): string => {
    const lowerText = userText.toLowerCase();

    if (lowerText.includes('how many vehicles') || lowerText.includes('available')) {
      return 'You can view all available vehicles on the Vehicles page. Navigate there to see the current fleet status, availability, and details of each vehicle.';
    }
    if (lowerText.includes('active rentals') || lowerText.includes('my rentals')) {
      return 'Your active rentals can be found on the Rentals page. You can see all ongoing, completed, and cancelled rentals with full details.';
    }
    if (lowerText.includes('total revenue') || lowerText.includes('revenue')) {
      return 'Check the Analytics page for detailed revenue reports. You\'ll find total revenue, trends, and comprehensive business insights there.';
    }
    if (lowerText.includes('how many customers') || lowerText.includes('customer')) {
      return 'Visit the Customers page to see the total number of customers, active accounts, and detailed customer information with rental history.';
    }
    if (lowerText.includes('latest feedback') || lowerText.includes('feedback')) {
      return 'The Feedback page shows all customer feedback, ratings, and satisfaction metrics. You can view the latest reviews and overall satisfaction rates.';
    }
    if (lowerText.includes('what can you') || lowerText.includes('help me')) {
      return 'I can help you with:\n• Vehicle availability and fleet information\n• Rental status and management\n• Customer data and statistics\n• Revenue and analytics reports\n• Customer feedback and ratings\n\nWhat would you like to know?';
    }

    return 'I understand you\'re asking: "' + userText + '". I can help you navigate the platform and provide information about vehicles, rentals, customers, revenue, and feedback. Feel free to select a starter prompt or ask me directly!';
  };

  const handleStarterPrompt = (promptText: string) => {
    setInputValue(promptText);
    setIsAutoFilled(true);
    // Focus on input after setting value
    setTimeout(() => {
      inputRef.current?.focus();
      // Remove auto-filled state after a moment
      setTimeout(() => setIsAutoFilled(false), 2000);
    }, 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-16 h-16 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full shadow-2xl flex items-center justify-center group"
          >
            <MessageCircle className="w-8 h-8 text-white" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></span>

            {/* Glow Effect */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity"></div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-6 right-6 z-50 w-[420px] h-[600px] bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl blur-lg opacity-30"></div>

            {/* Header */}
            <div className="relative z-10 bg-gradient-to-r from-indigo-600 to-purple-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center"
                >
                  <Bot className="w-6 h-6 text-indigo-600" />
                </motion.div>
                <div>
                  <h3 className="text-white font-bold text-lg">RentalPro AI</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-xs text-white/90">Online</span>
                  </div>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>
            </div>

            {/* Messages Area */}
            <div className="relative flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-gray-50 to-white">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-start gap-2 max-w-[80%] ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                    {/* Avatar */}
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-br from-blue-500 to-cyan-500'
                        : 'bg-gradient-to-br from-indigo-500 to-purple-500'
                    }`}>
                      {message.sender === 'user' ? (
                        <User className="w-5 h-5 text-white" />
                      ) : (
                        <Sparkles className="w-5 h-5 text-white" />
                      )}
                    </div>

                    {/* Message Bubble */}
                    <div className={`px-4 py-2 rounded-2xl ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white'
                        : 'bg-white border-2 border-gray-200 text-gray-800'
                    }`}>
                      <p className="text-sm font-medium whitespace-pre-line">{message.text}</p>
                      <span className={`text-xs mt-1 block ${
                        message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                      }`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div className="px-4 py-3 bg-white border-2 border-gray-200 rounded-2xl">
                    <div className="flex gap-1">
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                        className="w-2 h-2 bg-indigo-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                        className="w-2 h-2 bg-purple-500 rounded-full"
                      />
                      <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                        className="w-2 h-2 bg-pink-500 rounded-full"
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Starter Prompts */}
            {messages.length === 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="pb-4"
              >
                <div
                  className="overflow-x-auto px-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                >
                  <div className="flex gap-2 pb-2">
                    {starterPrompts.map((prompt, index) => (
                      <motion.button
                        key={index}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        whileHover={{ y: -2, scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleStarterPrompt(prompt.text)}
                        className={`px-3 py-2 rounded-lg bg-gradient-to-r ${prompt.gradient} text-white shadow-md hover:shadow-lg transition-all group relative overflow-hidden flex-shrink-0`}
                      >
                        {/* Shine effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>

                        <div className="relative flex items-center gap-1.5">
                          <Send className="w-3 h-3 opacity-80 flex-shrink-0" />
                          <p className="text-xs font-semibold whitespace-nowrap">{prompt.text}</p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Input Area */}
            <div className="relative p-4 bg-white border-t-2 border-gray-200">
              <AnimatePresence>
                {isAutoFilled && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute -top-8 left-4 right-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-lg flex items-center gap-2"
                  >
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    Prompt filled! Edit or press send
                  </motion.div>
                )}
              </AnimatePresence>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage(inputValue);
                }}
                className="flex gap-2"
              >
                <motion.div
                  className="flex-1"
                  animate={isAutoFilled ? { scale: [1, 1.02, 1] } : {}}
                  transition={{ duration: 0.3 }}
                >
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      setIsAutoFilled(false);
                    }}
                    placeholder="Type your message..."
                    className={`w-full h-11 border-2 rounded-xl font-medium transition-all ${
                      isAutoFilled
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                        : 'border-gray-300 focus:border-indigo-500'
                    }`}
                  />
                </motion.div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={!inputValue.trim()}
                  className="w-11 h-11 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-xl flex items-center justify-center shadow-lg transition-all"
                >
                  <Send className="w-5 h-5 text-white" />
                </motion.button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
