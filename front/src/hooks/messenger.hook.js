import { useEffect, useState, useCallback } from "react";
import { nanoid } from "nanoid";

export const useMessages = (ms) => {
  const [messages, setMessage] = useState([]);

  const deleteMessage = (id) => {
    setMessage((state) => state.filter((obj) => obj.id !== id));
  }

  const showMessage = useCallback(
    (messageText) => {
      if (!messageText) {
        return;
      }
      const messageId = nanoid();
      setMessage((state) => [
        ...state,
        {
          id: messageId,
          text: messageText,
        },
      ]);
      setTimeout(() => {
        console.log(messages);
        deleteMessage(messageId)
      }, ms);
    },
    [messages]
  );

  return [messages, showMessage, deleteMessage];
};
