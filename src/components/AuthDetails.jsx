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
        setImageLink("")
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
        const db = ref(getDatabase());
        const email_substring = email.substring(0, email.indexOf("@"));
        get(child(db, 'users/' + email_substring)).then((snapshot) => {
        if (snapshot.exists()) {
            const imageUrl = snapshot.val().profile_picture;
            if (imageUrl.length > imageLink.length) {
                update(ref(db, 'users/' + email_substring), {
                    profile_picture : imageUrl
                  });
            } else {
                update(ref(db, 'users/' + email_substring), {
                    profile_picture : imageLink
                  });
            }
            getImage(email);
            }
        });
            
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
          <form onSubmit={updateImage(authUser.email)}>
            <input
                placeholder="Enter image address"
                type="text"
                value={imageLink}
                onChange={(e) => setImageLink(e.target.value)}
            ></input>
                <input type="submit" value="Update Profile Picture"></input>
            </form>
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