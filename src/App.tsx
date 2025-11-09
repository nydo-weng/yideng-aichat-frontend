import type { FormEvent } from 'react';
import { useMemo, useState } from 'react';
import './App.css';
import { useChat } from './hooks/useChat';

function App() {
  const { messages, isLoading, error, sendQuestion, resetChat } = useChat();
  const [question, setQuestion] = useState('');

  const isSubmitDisabled = useMemo(
    () => !question.trim() || isLoading,
    [question, isLoading]
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim()) {
      return;
    }
    await sendQuestion(question);
    setQuestion('');
  };

  return (
    <div className="app-shell">
      <header className="hero">
        <div>
          <p className="eyebrow">Cloudflare Pages · GraphQL · React + TS</p>
          <h1>YiDeng AI Chat - nono</h1>
          <p className="subtitle">
            与部署在 Cloudflare Workers 的 AI 助手即时对话
          </p>
        </div>
      </header>

      <main className="chat-panel">
        <section className="chat-window">
          {messages.length === 0 ? (
            <div className="empty-state">
              <p>开始输入问题，AI 助手将会回复。</p>
            </div>
          ) : (
            <ul className="message-list">
              {messages.map((message) => (
                <li
                  key={message.id}
                  className={`message ${
                    message.role === 'user' ? 'user' : 'assistant'
                  }`}
                >
                  <span className="message-role">
                    {message.role === 'user' ? '你 (User)' : 'AI (Assistant)'}
                  </span>
                  <p>{message.content}</p>
                </li>
              ))}
            </ul>
          )}
        </section>

        {error && <div className="error-banner">错误：{error}</div>}

        <form className="composer" onSubmit={handleSubmit}>
          <textarea
            rows={3}
            placeholder="输入你的问题..."
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            disabled={isLoading}
          />
          <div className="composer-actions">
            <button
              type="button"
              className="ghost"
              onClick={resetChat}
              disabled={isLoading || messages.length === 0}
            >
              清除对话
            </button>
            <button type="submit" disabled={isSubmitDisabled}>
              {isLoading ? '发送中...' : '发送'}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default App;
