import { ChangeEvent, FC, useState } from 'react';

interface Props {
  onSubmit: (text: string) => void;
}

const ChatInput: FC<Props> = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = inputValue.trim();
    if (message) {
      const requestBody = { message };
      fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      })
        .then(() => {
          onSubmit(message);
          setInputValue('');
        })
        .catch((error) => console.error('Error:', error));
    }
  };

  return (
    <form className='chat-input' onSubmit={handleFormSubmit}>
      <input
        type='text'
        value={inputValue}
        onChange={handleChange}
        placeholder='Ваше питання...'
      />
      <button type='submit'>Відправити</button>
    </form>
  );
};

export default ChatInput;
