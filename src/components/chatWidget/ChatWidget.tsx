import { useEffect, useState } from 'react';
import data from '../../mockApi.json';
import { Message } from '../../types/message';
import { Option } from '../../types/option';
import ChatBubble from '../chatBubble/ChatBubble';
import ChatInput from '../ChatInput/ChatInput';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages([
          { text: data.greeting, type: 'received' },
          { text: data.question, type: 'received' },
        ]);
      }, 1500);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setShowOptions(true);
    if (!isOpen) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
      }, 1500);
    }
  };

  const handleOptionClick = (selectedOption: Option) => {
    setIsTyping(true);
    setShowOptions(false);

    setTimeout(() => {
      setIsTyping(false);

      if (selectedOption === 'custom') {
        setShowInput(true);
      } else {
        const response = getResponse(selectedOption);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: response, type: 'received' },
        ]);
      }
    }, 1500);
  };

  const getResponse = (option: Option) => {
    switch (option) {
      case 'day':
        return data.responses.day;
      case 'time':
        return data.responses.time;
      case 'newYear':
        return data.responses.newYear;
      default:
        return 'Не відомий варіант.';
    }
  };

  const handleInputSubmit = (text: string) => {
    setMessages([...messages, { text, type: 'sent' }]);
    setShowInput(false);
    setMessages(() => [{ text: data.thanks, type: 'received' }]);
  };

  return (
    <div className='chat-widget'>
      <div className={`chat-content ${isOpen ? 'open' : 'closed'}`}>
        <button className='close' onClick={toggleChat}>
          ❌
        </button>
        {isTyping && <ChatBubble text='Typing...' type='received' />}
        {!isTyping &&
          messages.map((msg, index) => (
            <ChatBubble key={index} text={msg.text} type={msg.type} />
          ))}
        {!showInput && !isTyping && showOptions && messages.length > 1 && (
          <div className='options'>
            {data.options.map((option) => (
              <ChatBubble
                key={option.id}
                text={option.text}
                type='button'
                onClick={() => handleOptionClick(option.id as Option)}
              />
            ))}
          </div>
        )}

        {showInput && <ChatInput onSubmit={handleInputSubmit} />}
      </div>

      <button className='chat-toggle' onClick={toggleChat}>
        {isOpen ? 'Close' : 'Open'}
      </button>
    </div>
  );
};

export default ChatWidget;
