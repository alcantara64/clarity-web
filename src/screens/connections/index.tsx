import React, { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Provider from "../../components/Provider";
import { useStores } from "../../models";
import { observer } from "mobx-react-lite";

import "./index.less";
import OauthStep1 from "../../components/OauthStep1";
import OauthStep2 from "../../components/OauthStep2";

const ConnectionsPage = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [oauthStep, setOauthStep] = useState(-1);

  const [selectedProvider, setSelectedProvider]: any = useState({});

  const { payerStore } = useStores();

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      await payerStore.getPayer().catch((ex) => {});

      setIsLoading(false);
    })();
  }, []);

  const performOauth = async () => {
    if (!selectedProvider) return;

    window.open(selectedProvider?.oauth_url, "_self", "width=500,height=500");

    setIsLoading(true);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div id="connections-page">
      {oauthStep == -1 &&
        payerStore?.payers?.map((item) => (
          <Provider
            name={item.name}
            isConnected={item.is_connected}
            onClick={() => {
              if (item.is_connected) return;

              setOauthStep(1);
              setSelectedProvider(item);
            }}
          />
        ))}

      {oauthStep == 1 && (
        <div className="oauth-step2-container">
          <OauthStep2
            onBackClick={() => {
              setOauthStep(-1);
            }}
            onContinueClick={() => {
              performOauth();
            }}
          />
        </div>
      )}
    </div>
  );
});

export default ConnectionsPage;
