import * as React from "react";
import SecondaryButton from "../SecondaryButton";

import padLock from "../../images/padlock.svg";

import "./index.less";
import Button from "../Button";

const OauthStep2 = ({ onBackClick = () => {}, onContinueClick = () => {} }) => {
  const APP_NAMe = process.env.REACT_APP_NAME;
 return ( <div id="oauth-step-2">
      <SecondaryButton
        label="Back"
        className="back-button"
        onClick={() => {
          onBackClick();
        }}
      />
      <div className="header-container ">
        <img src={padLock} />
        <div className="d-inline-block header-right-container">
          <h5 className="header-title">You are now leaving the {APP_NAMe} app</h5>
          <p className="header-title-sub">
            You’ll return back to the app after connection
          </p>
        </div>
      </div>
      <div className="description">
        <p>1. Click Confirm below to connect to health plans/ provider.</p>

        <p>
          2. Securely import claims or clinical data from your health
          plans/caregivers
        </p>

        <p>
          NOTE: You must have an account with the health plans/ provider member
          portal you intend to connect to
        </p>

        <p>3. Allow your health plans to share information with {APP_NAMe}.</p>

        <p>
          4. Sign in to the {APP_NAMe} app again with your {APP_NAMe} account email
          and password.
        </p>

        <p>
          5. You may need to reauthorize your payer or provider when you sign in
          again. It’s another way we’re committed to keeping your data safe.
        </p>
      </div>

      <Button
        label="Continue"
        className="continue-button"
        onClick={() => {
          onContinueClick();
        }}
      />
    </div>
  );
};

export default OauthStep2;
