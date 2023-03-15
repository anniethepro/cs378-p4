import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import React, { useEffect, useState } from "react";
import { getDatabase, ref, child, get , update} from "firebase/database";



const AuthDetails = () => {
  const [authUser, setAuthUser] = useState(null);
  const [imageLink, setImageLink] = useState("");


  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAuthUser(user);
      } else {
        setAuthUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const userSignOut = () => {
    signOut(auth)
      .then(() => {
        console.log("sign out successful");
      })
      .catch((error) => console.log(error));
  };

  function displayImage(src) {
    var img = document.createElement("img");
    img.classList.add("resize");
    document.getElementById("pfp").src = src
   }


   const getImage = (email) => {
    const email_substring = email.substring(0, email.indexOf("@"));
    const dbRef = ref(getDatabase());
    get(child(dbRef, 'users/' + email_substring)).then((snapshot) => {
        if (snapshot.exists()) {
            const imageUrl = snapshot.val().profile_picture;
            displayImage(imageUrl)

        } else {
            console.log("No data available");
        }
        }).catch((error) => {
        console.error(error);
        });
    }

    const updateImage = (email) => {
        const db = getDatabase();
        const email_substring = email.substring(0, email.indexOf("@"));
        update(ref(db, 'users/' + email_substring), {
            profile_picture : imageLink
          });
        // console.log(imageLink)
        getImage(email);
    }

  return (
    <div>
      {authUser ? (
        <>
          <p>{`Signed In as ${authUser.email}`}</p>
          <button onClick={userSignOut}>Sign Out</button>
          <div>
          <button onClick={getImage(authUser.email)}>Display User Profile Picture</button>
          </div>
          <div>
            <input
            placeholder="Enter image address"
            value={imageLink}
            onChange={(e) => setImageLink(e.target.value)}
            ></input>
            <button onClick= {updateImage(authUser.email)} >Update Profile Image</button>
          </div>

          <h2>User Profile picture: </h2>
          <div>
            <img id = "pfp"
            src= ""
            alt="User Profile Picture"/>
          </div>
        </>
      ) : (
        <p>Signed Out</p>
      )}
    </div>
  );
};

export default AuthDetails;