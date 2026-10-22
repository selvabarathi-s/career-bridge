import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../api/client';
import { AIMessage } from '../../../shared/types';
import { MarkdownRenderer } from '../components/common/MarkdownRenderer';
import {
  Sparkles,
  Send,
  Bot,
  User,
  Lightbulb,
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Compass
} from 'lucide-react';

export const AIMentorPage: React.FC = () => {
  const { profile, targetCareer, skillGaps } = useAuth();
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      id: 'welcome-msg',
      sender: 'assistant',
      content: profile
        ? `Hello ${profile.fullName || 'there'}! I am your personal CareerBridge AI Advisor.

I can help you use your academic performance, target career, and skill gaps to plan your next steps. How can I guide you today?`
        : `Hello there! I am your CareerBridge AI Advisor.

I can help with career exploration, skill development, resumes, projects, and interview preparation. This account does not have a linked student profile, so I will provide general career guidance. What would you like to work on?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestedActions: [
        'How do I bridge my highest priority skill deficit?',
        'Suggest an impactful project for my resume',
        'Help me prepare for technical interviews',
        'Which companies are hiring for this role?',
        'Explain the career scope and industry trajectory'
      ]
    }
  ]);

  const [inputText, setInputText] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const topGap = skillGaps && skillGaps.length > 0 ? skillGaps[0] : null;

  const handleSendMessage = async (textToSend?: string) => {
    const query = textToSend || inputText;
    if (!query.trim() || sending) return;

    const userMsg: AIMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInputText('');
    setSending(true);

    try {
      const res = await api.sendAIMessage(profile?.id || 'demo-stu', query.trim());
      if (res.message) {
        setMessages(prev => [...prev, res.message]);
      }
    } catch (err) {
      const detail = err instanceof Error ? err.message : 'An unexpected error occurred.';
      const errorReply: AIMessage = {
        id: `err-${Date.now()}`,
        sender: 'assistant',
        content: detail.includes('Unable to connect to the CareerBridge API')
          ? 'I cannot reach the CareerBridge backend right now. In a second terminal, start the backend with `cd server` and `npm run dev`, then try your message again.'
          : `I could not generate a response. ${detail}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorReply]);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-6.5rem)] space-y-4 pb-4">
      {/* Context Snapshot Banner */}
      <div className="rounded-2xl border border-cyan-200 dark:border-cyan-900/60 bg-gradient-to-r from-cyan-50/80 via-white to-slate-50 dark:from-cyan-950/40 dark:via-slate-900 dark:to-slate-900 p-4 shadow-sm flex flex-wrap items-center justify-between gap-3 shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Context-Aware AI Career Mentor</h2>
              <span className="rounded bg-cyan-100 dark:bg-cyan-950 px-2 py-0.5 text-[10px] font-bold text-cyan-800 dark:text-cyan-300 border border-cyan-200 dark:border-cyan-800">
                {profile ? 'Profile connected' : 'General guidance'}
              </span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-400 font-medium">
              Assisting <strong>{profile?.fullName || 'you'}</strong> • Goal: <strong>{targetCareer?.title || 'Explore career options'}</strong>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono">
          <div className="text-right">
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Current Readiness</div>
            <div className="font-bold text-emerald-600 dark:text-emerald-400">
              {profile?.readinessScore
                ? `${profile.readinessScore.overallPercentage}% (${profile.readinessScore.status})`
                : 'Not available'}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] text-slate-500 dark:text-slate-400">Top Deficit Focus</div>
            <div className="font-bold text-rose-600 dark:text-rose-400">{topGap?.skillName || 'Core Foundation'}</div>
          </div>
        </div>
      </div>

      {/* Chat Messages Window */}
      <div className="flex-1 overflow-y-auto rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/70 p-4 sm:p-6 space-y-4 shadow-inner">
        {messages.map(msg => {
          const isUser = msg.sender === 'user';

          return (
            <div
              key={msg.id}
              className={`flex gap-3 max-w-2xl ${isUser ? 'ml-auto flex-row-reverse' : 'mr-auto'}`}
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                isUser ? 'bg-blue-600 text-white shadow-sm' : 'bg-cyan-600/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30'
              }`}>
                {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
              </div>

              <div className="space-y-2">
                <div className={`rounded-2xl p-4 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm'
                }`}>
                  {isUser ? (
                    <p className="whitespace-pre-line">{msg.content}</p>
                  ) : (
                    <MarkdownRenderer content={msg.content} />
                  )}
                </div>

                {/* Suggested Action Chips */}
                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {msg.suggestedActions.map((action, i) => (
                      <button
                        key={i}
                        onClick={() => handleSendMessage(action)}
                        className="rounded-lg bg-white dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 px-2.5 py-1 text-[11px] font-semibold text-cyan-700 dark:text-cyan-300 transition-colors shadow-sm cursor-pointer"
                      >
                        {action} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
        {sending && (
          <div className="flex gap-3 mr-auto max-w-2xl">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-cyan-600/15 text-cyan-600 dark:text-cyan-400 border border-cyan-500/30">
              <Bot className="h-4 w-4 animate-spin" />
            </div>
            <div className="rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-4 text-xs text-slate-500 dark:text-slate-400 animate-pulse">
              Synthesizing personalized advice with student profile...
            </div>
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input Box */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        className="flex gap-2 shrink-0"
      >
        <input
          type="text"
          placeholder="Ask anything (e.g. 'Why is this career recommended for me?', 'Suggest a portfolio project')..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="flex-1 rounded-xl border border-slate-300 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-3 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder-slate-400 focus:border-cyan-500 focus:outline-none shadow-sm"
        />
        <button
          type="submit"
          disabled={!inputText.trim() || sending}
          className="rounded-xl bg-cyan-600 hover:bg-cyan-700 disabled:opacity-50 px-5 py-3 text-xs sm:text-sm font-bold text-white shadow-md shadow-cyan-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <span>Send</span>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
};
