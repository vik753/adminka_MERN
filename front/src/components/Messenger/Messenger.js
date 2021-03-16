import React from "react";
import styles from "./messenger.module.scss";

export const Messenger = React.forwardRef((props, ref) => {
  const { id, index, text, deleteMessage } = props.params;

  const deleteHandler = (e) => {
    e.preventDefault();
    deleteMessage(id);
  };

  return (
    <div
      ref={ref}
      className={styles.message}
      style={{ top: `${10 + index * 60}px` }}
    >
      <p>{text}</p>
      <span onClick={deleteHandler}>x</span>
    </div>
  );
});
