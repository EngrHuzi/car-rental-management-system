'use client';

import { motion } from 'framer-motion';

interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  source?: 'ai' | 'fallback' | 'cache';
  timestamp?: Date;
}

export function ChatMessage({ role, content, source, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-3 ${
          isUser
            ? 'bg-blue-600 text-white'
            : 'bg-gray-100 text-gray-900'
        }`}
      >
        {/* Message Content */}
        <div className="whitespace-pre-wrap break-words">{content}</div>

        {/* Message Metadata */}
        <div
          className={`flex items-center gap-2 mt-2 text-xs ${
            isUser
              ? 'text-blue-100'
              : 'text-gray-500'
          }`}
        >
          {timestamp && (
            <span>
              {timestamp.toLocaleTimeString('en-US', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          )}
          {!isUser && source && (
            <>
              <span>•</span>
              <span className="flex items-center gap-1">
                {source === 'cache' && '💾 Cached'}
                {source === 'ai' && '🤖 AI'}
                {source === 'fallback' && '📚 Knowledge Base'}
              </span>
            </>
          )}
        </div>
      </div>
    </motion.div>
  );
}
