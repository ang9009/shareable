import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAdditionalUserInfo,
  getAuth,
} from "firebase/auth";
import {
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  onSnapshot,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getBlob,
  getDownloadURL,
  getStorage,
  listAll,
  ref,
} from "firebase/storage";

// TODO: hide api key
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();
const storage = getStorage();

async function onSubmitListing(data, listingId, userId) {
  var nowDate = new Date();
  var date =
    nowDate.getDate() +
    "-" +
    (nowDate.getMonth() + 1) +
    "-" +
    nowDate.getFullYear();

  const listing = {
    name: data.name,
    id: listingId,
    condition: data.condition.value,
    category: data.category.value,
    price: data.price,
    description: data.description,
    meetUpLocations: data.meetUpLocations.map((location) => location.value),
    sellerId: userId,
    postedDate: date,
    imagesNum: data.photos.length,
    status: "available",
  };

  await setDoc(doc(db, "listings", listingId), listing);
}

async function createUser(user) {
  const newUser = {
    name: user.displayName,
    email: user.email,
    photoUrl: user.photoURL,
  };

  await setDoc(doc(db, "users", user.uid), newUser);
  await setDoc(doc(db, "userChats", user.uid), {});
}

function getEditListingData(listingId, reset, setIsFetchingListing) {
  const listingRef = doc(db, "listings", listingId);
  getDoc(listingRef).then((res) => {
    const listingData = res.data();
    const imagePromises = [];

    for (let i = 0; i < listingData.imagesNum; i++) {
      const pathRef = ref(storage, `listingImages/${listingId}/${i + 1}`);
      imagePromises.push(getBlob(pathRef));
    }

    Promise.all(imagePromises).then(async (photos) => {
      reset({
        ...listingData,
        condition: {
          value: listingData.condition,
          label: listingData.condition,
        },
        category: {
          value: listingData.category,
          label: listingData.category,
        },
        meetUpLocations: listingData.meetUpLocations.map((location) => {
          return { value: location, label: location };
        }),
        photos: photos.map((blob, i) => {
          return { file: blob, url: URL.createObjectURL(blob) };
        }),
      });

      setIsFetchingListing(false);
    });
  });
}

async function createChat(user, sellerId, listingId) {
  try {
    const res = await getDoc(doc(db, "chats", listingId));

    // Creates a new chat between two users holding the messages in that chat
    if (!res.exists()) {
      await setDoc(doc(db, "chats", listingId), { messages: [] });
    }

    // userChats stores the list of chats for each user
    // Updates user chat for seller
    await updateDoc(doc(db, "userChats", sellerId), {
      [listingId + ".userInfo"]: {
        id: user.uid,
        name: user.displayName,
        photoUrl: user.photoURL,
      },
      [listingId + ".listingId"]: listingId,
      [listingId + ".type"]: "selling",
      [listingId + ".date"]: serverTimestamp(),
    });

    // Updates user chat for user
    const sellerRes = await getDoc(doc(db, "users", sellerId));
    const seller = sellerRes.data();

    await updateDoc(doc(db, "userChats", user.uid), {
      [listingId + ".userInfo"]: {
        id: sellerId,
        name: seller.name,
        photoUrl: seller.photoUrl,
      },
      [listingId + ".listingId"]: listingId,
      [listingId + ".type"]: "buying",
      [listingId + ".date"]: serverTimestamp(),
    });
  } catch (err) {
    console.log(err);
  }
}

async function getChatListings(userChats) {
  // Fetching listings
  const listingPromises = [];
  const listingImgPromises = [];

  userChats.forEach((chat) => {
    const listingRef = doc(db, "listings", chat[1].listingId);
    const listingPromise = getDoc(listingRef);
    listingPromises.push(listingPromise);
  });

  const listingSnapshots = await Promise.all(listingPromises);
  const listings = listingSnapshots.map((listing) => listing.data());

  listings.forEach((listing) => {
    if (listing !== null) {
      const imgRef = ref(storage, `listingImages/${listing.id}/1`);
      const listingImgPromise = getDownloadURL(imgRef);
      listingImgPromises.push(listingImgPromise);
    } else {
      listingImgPromises.push(null);
    }
  });

  const listingImgs = await Promise.all(listingImgPromises);
  const listingsAndImgs = listings.map((listing, i) => {
    return { ...listing, photoUrl: listingImgs[i] };
  });

  return listingsAndImgs;
}

export {
  auth,
  createChat,
  createUser,
  db,
  deleteDoc,
  deleteObject,
  doc,
  getAdditionalUserInfo,
  getChatListings,
  getDoc,
  getDocs,
  getDownloadURL,
  getEditListingData,
  listAll,
  onSnapshot,
  onSubmitListing,
  provider,
  ref,
  serverTimestamp,
  setDoc,
  storage,
  updateDoc,
};
