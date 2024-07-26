import { FC } from 'react';

interface Props {
  text: string;
  type: 'received' | 'sent' | 'button';
  onClick?: () => void;
}
const ChatBubble: FC<Props> = ({ text, type, onClick }) => {
  if (type === 'button') {
    return (
      <button className='chat-bubble button' onClick={onClick}>
        {text}
      </button>
    );
  }

  return <div className={`chat-bubble ${type}`}>{text}</div>;
};

export default ChatBubble;
