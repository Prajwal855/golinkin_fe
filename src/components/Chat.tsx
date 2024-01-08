import React, { useState, useEffect, useRef } from 'react';
import PubNub from 'pubnub';

interface Message {
  text: string;
  sender: string;
}

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const pubnub = useRef<PubNub | null>(null);

  useEffect(() => {
    pubnub.current = new PubNub({
      publishKey: 'pub-c-d5a8fb1b-00ca-4714-8969-abdd2e9aa211',
      subscribeKey: 'sub-c-de703ab0-2531-45cf-996e-d4f58464fa42',
      userId: 'user123',
    });

    const currentUserID = 'user123'; 
const otherUserID = 'user456'; 

const channel = `private-chat-${currentUserID}-${otherUserID}`;
    pubnub.current.subscribe({
      channels: [channel],
    });

    pubnub.current.addListener({
      message: (event:any) => {
        const newMessages = [...messages, event.message];
        setMessages(newMessages);
      },
    });

    return () => {
      if (pubnub.current) {
        pubnub.current.unsubscribeAll();
        pubnub.current.stop();
      }
    };
  }, [messages]);

  const sendMessage = () => {
    if (pubnub.current) {
      const message: Message = {
        text: inputMessage,
        sender: 'user123', 
      };

      pubnub.current.publish({
        channel: 'your-chat-channel',
        message,
      });

      setInputMessage('');
    }
  };

  return (
    <div>
      <div>
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.sender}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
