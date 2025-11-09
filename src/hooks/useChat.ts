import { useCallback, useState } from 'react';
import { askQuestion } from '../services/ask';
import type { ChatMessage } from '../types/chat';

const createId = () =>
  (typeof crypto !== 'undefined' && crypto.randomUUID
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(16).slice(2)}`);

/**
 * 管理對話訊息與 GraphQL 請求的自定義 hook。
 */
export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendQuestion = useCallback(
    async (rawQuestion: string) => {
      const question = rawQuestion.trim();
      if (!question || isLoading) {
        return;
      }

      const historyPayload = messages.map(({ role, content }) => ({
        role,
        content,
      }));

      const userMessage: ChatMessage = {
        id: createId(),
        role: 'user',
        content: question,
        createdAt: Date.now(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const reply = await askQuestion(question, historyPayload);

        setMessages((prev) => [
          ...prev,
          {
            id: createId(),
            role: 'assistant',
            content: reply,
            createdAt: Date.now(),
          },
        ]);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Unexpected network error',
        );
      } finally {
        setIsLoading(false);
      }
    },
    [isLoading, messages],
  );

  const resetChat = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendQuestion,
    resetChat,
  };
}
