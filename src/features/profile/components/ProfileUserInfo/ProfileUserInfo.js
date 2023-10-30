import { MdVerified } from "react-icons/md";
import { Rating } from "react-simple-star-rating";
import { Tooltip } from "react-tooltip";
import ProfileUserInfoCSS from "./ProfileUserInfo.module.css";

function ProfileUserInfo({ user }) {
  function addS(reviews) {
    if (reviews !== 1) {
      return "s";
    }
  }

  return (
    <div>
      <div className={ProfileUserInfoCSS["user-info-container"]}>
        <img
          src={
            user?.photoUrl === ""
              ? require("../../../../assets/profile_placeholder.png")
              : user?.photoUrl
          }
          alt={require("../../../../assets/profile_placeholder.png")}
          className={ProfileUserInfoCSS["profile-img"]}
        />
        <div className={ProfileUserInfoCSS["user-data-container"]}>
          <div>
            <div className={ProfileUserInfoCSS["name-container"]}>
              <h1 className={ProfileUserInfoCSS["user-name"]}>{user?.name}</h1>
              {user?.isVerified && (
                <MdVerified
                  className={ProfileUserInfoCSS["verified-symbol"]}
                  size={"25px"}
                  color={"var(--verified-color)"}
                  data-tooltip-id="verified-tooltip"
                  data-tooltip-content="User has verified their student email"
                />
              )}
              <Tooltip id="verified-tooltip" />
            </div>
            <div className={ProfileUserInfoCSS["reviews-data-container"]}>
              <Rating
                initialValue={user?.avgRating}
                readonly
                size={"20px"}
                fillColor={"var(--tradeable-burgundy)"}
              />
              <p className={ProfileUserInfoCSS["reviews-count"]}>
                {user?.reviews} review{addS(user?.reviews)}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className={ProfileUserInfoCSS["about"]}>
        <h1>About</h1>
        <p>{user?.about}</p>
      </div>
    </div>
  );
}

export default ProfileUserInfo;
