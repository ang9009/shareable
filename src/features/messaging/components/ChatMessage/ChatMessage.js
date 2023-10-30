import { useContext, useLayoutEffect, useRef } from "react";
import { useUser } from "../../../../context/UserContext";
import { ChatContext } from "../../context/ChatContext";
import ChatMessageCSS from "./ChatMessage.module.css";

function ChatMessage({ message }) {
  const { user } = useUser();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useLayoutEffect(() => {
    ref.current?.scrollIntoView();
  }, [message]);

  return (
    <div
      className={`${ChatMessageCSS["message"]} ${
        message.senderId === user.id
          ? ChatMessageCSS["curr-user"]
          : ChatMessageCSS["other-user"]
      }`}
      ref={ref}
    >
      <div className={ChatMessageCSS["message-info"]}>
        <img
          src={
            data.user.photoUrl === ""
              ? require("../../../../assets/profile_placeholder.png")
              : user?.photoUrl
          }
          alt=""
        />
      </div>
      <div className={ChatMessageCSS["message-content"]}>
        <div className={ChatMessageCSS["message-text-container"]}>
          {message.img ? (
            <img
              src={message.img}
              alt=""
              className={ChatMessageCSS["message-img"]}
            />
          ) : (
            <p className={ChatMessageCSS["message-text"]}>{message?.text}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ChatMessage;
