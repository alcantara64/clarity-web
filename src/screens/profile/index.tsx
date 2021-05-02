import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { getNameAlias } from "../../factories/utils";
import { useStores } from "../../models";

import "./index.less";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { userStore } = useStores();
  const { userProfile } = userStore;

  const [name, setName] = useState("");

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const resp = await userStore.fetchProfile().catch((ex) => {});
      setName((userProfile?.firstName || "") + (userProfile?.lastName || ""));
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  const ProfileCard = () => {
    return (
      <div className="profile-card">
        <div className="name-container">
          <div className="alias-container">{getNameAlias(name)}</div>
        </div>
        <div className="details">
          <p>
            <span className="label">First name:</span>{" "}
            <span className="label-item">{userProfile?.firstName}</span>
          </p>
          <p>
            <span className="label">Last name:</span>{" "}
            <span className="label-item">{userProfile?.lastName}</span>
          </p>
          <p>
            <span className="label">Email:</span>{" "}
            <span className="label-item">{userProfile?.email}</span>
          </p>
          <p>
            <span className="label">Gender:</span>{" "}
            <span className="label-item"></span>
          </p>
          <p>
            <span className="label">Primary Physician:</span>{" "}
            <span className="label-item">
              {userProfile?.primaryCarePhysician &&
                userProfile?.primaryCarePhysician[0]}
            </span>
          </p>
          <p>
            <span className="label">Emergency contact:</span>{" "}
            <span className="label-item">
              {userProfile?.emergencyContact &&
                userProfile?.emergencyContact[0]}
            </span>
          </p>
        </div>
      </div>
    );
  };

  return (
    <div id="profile-page">
      <ProfileCard />
    </div>
  );
};

export default ProfilePage;
