
import React, { useState, useRef, useEffect } from 'react';
import { geminiService } from '../services/gemini';
import { Product } from '../types';

interface AIShopperProps {
  products: Product[];
}

const AIShopper: React.FC<AIShopperProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<{role: 'user' | 'ai', text: string}[]>([
    { role: 'ai', text: 'Hi! I am Lumina, your personal shopping assistant. Looking for something specific?' }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const aiResponse = await geminiService.getShoppingAdvice(userMsg, products);
    
    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'ai', text: aiResponse }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[80] flex flex-col items-end">
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-white rounded-3xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 duration-300">
          <div className="bg-emerald-600 p-4 text-white flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-md">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm7-1a1 1 0 11-2 0 1 1 0 012 0zm-7.535 4a1 1 0 10-1.415 1.414A5.946 5.946 0 0010 15a5.946 5.946 0 004.415-1.586 1 1 0 10-1.415-1.414A3.946 3.946 0 0110 13a3.946 3.946 0 01-3.535-1z" clipRule="evenodd"></path></svg>
            </div>
            <div>
              <h4 className="font-bold">Lumina Assistant</h4>
              <p className="text-[10px] text-emerald-100 uppercase tracking-widest font-medium">Online Powered by AI</p>
            </div>
          </div>

          <div ref={chatRef} className="flex-grow h-80 overflow-y-auto p-4 space-y-4 scroll-hide bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-emerald-600 text-white rounded-tr-none' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white px-4 py-2.5 rounded-2xl rounded-tl-none shadow-sm border border-gray-100 flex space-x-1">
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-75"></div>
                  <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-bounce delay-150"></div>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 border-t border-gray-100 flex space-x-2 bg-white">
            <input 
              type="text" 
              placeholder="Ask anything..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              className="flex-grow bg-gray-100 border-none rounded-full px-4 py-2 text-sm focus:ring-1 focus:ring-emerald-500 outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-emerald-600 text-white p-2 rounded-full hover:bg-emerald-700 transition-colors"
            >
              <svg className="w-5 h-5 rotate-90" fill="currentColor" viewBox="0 0 20 20"><path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path></svg>
            </button>
          </div>
        </div>
      )}

      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 rounded-full shadow-2xl flex items-center justify-center text-white hover:bg-emerald-700 hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>
        )}
      </button>
    </div>
  );
};

export default AIShopper;
