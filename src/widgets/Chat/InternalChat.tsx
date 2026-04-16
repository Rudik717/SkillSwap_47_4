import { Button } from '@/ui-kit/Button/Button'
import { Icon } from '@/ui-kit/Icon/Icon'
import { Text } from '@/ui-kit/Text/Text'
import React, { useEffect, useRef, useState } from 'react'

import './InternalChat.css'

type Message = {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: number
}

const STORAGE_KEY = 'chat_messages'
export const InternalChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isChatOpen, setIsChatOpen] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) setMessages(JSON.parse(stored))
  }, [])
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages))
  }, [messages])
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: Date.now().toString(),
          text: 'Привет',
          sender: 'bot',
          timestamp: Date.now(),
        },
      ])
    }
  }, [])
  const sendMessage = () => {
    if (!inputValue.trim()) return
    const userMessage = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      sender: 'user' as const,
      timestamp: Date.now(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue('')
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString() + '-' + Math.random(),
          text: 'Секунду',
          sender: 'bot' as const,
          timestamp: Date.now(),
        },
      ])
    }, 1000)
  }

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }
  return (
    <div className="chat-container">
      {!isChatOpen && (
        <button className="chat-open-button" onClick={() => setIsChatOpen(true)}>
          <Icon name="message" size={24} color="#fff" />
        </button>
      )}
      {isChatOpen && (
        <div className="internal-chat">
          <div className="internal-chat__header">
            <div className="internal-chat__header-info">
              <Icon name="message" size={24} color="#fff" />
              <Text variant="H2" style={{ color: '#fff', margin: 0 }}>
                Чат
              </Text>
            </div>
            <button className="chat-close-button" onClick={() => setIsChatOpen(false)}>
              <Icon name="cross" size={24} color="#fff" />
            </button>
          </div>

          <div className="internal-chat__messages">
            {messages.map((msg) => (
              <div key={msg.id} className={`message message--${msg.sender}`}>
                <div className="message__sender">{msg.sender === 'user' ? 'Вы' : 'Бот'}</div>
                <div className="message__text">{msg.text}</div>
                <div className="message__time">{formatTime(msg.timestamp)}</div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="internal-chat__input-area">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Введите сообщение..."
              className="chat-input"
            />
            <Button variant="primary" onClick={sendMessage}>
              Отправить
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
export default InternalChat
