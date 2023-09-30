import Skeleton from "react-loading-skeleton";
import ChatsListItemCSS from "./ChatsListItem.module.css";

function ChatsListItem({
  chat,
  onClick,
  selectedChat,
  listingData: { listing, isFetchingListings },
}) {
  return (
    <div
      className={ChatsListItemCSS["component-container"]}
      style={{
        background: chat[0] === selectedChat[0] && "var(--hover-gray)",
      }}
      onClick={onClick}
    >
      {!isFetchingListings ? (
        <>
          <div className={ChatsListItemCSS["user-info-container"]}>
            <p className={ChatsListItemCSS.username}>{chat[1].userInfo.name}</p>
            <p className={ChatsListItemCSS["last-msg-time"]}>1 minute ago</p>
          </div>
          <div className={ChatsListItemCSS["listing-info-container"]}>
            <div>
              <p
                className={ChatsListItemCSS["listing-title"]}
                style={{ color: listing ? "black" : "red" }}
              >
                {listing ? listing.name : "Listing removed"}
              </p>
              <p className={ChatsListItemCSS["last-msg"]}>
                {chat[1].userInfo.lastMessage
                  ? chat[1].userInfo.lastMessage.text
                  : "No messages found"}
              </p>
            </div>
            <img
              src={
                listing
                  ? listing.photoUrl
                  : require("../../../../assets/placeholder_img.jpg")
              }
              alt=""
              className={ChatsListItemCSS["listing-img"]}
            />
          </div>
        </>
      ) : (
        <>
          <Skeleton height={"30px"} />
          <Skeleton height={"30px"} style={{ marginTop: "30px" }} />
        </>
      )}
    </div>
  );
}

export default ChatsListItem;
