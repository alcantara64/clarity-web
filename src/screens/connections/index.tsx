import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import Provider from "../../components/Provider";
import { useStores } from "../../models";
import { observer } from "mobx-react-lite";

import "./index.less";
import OauthStep2 from "../../components/OauthStep2";
import Modal from '../../components/Modal'
import { DATA_SOURCE } from "../../enums/dataSource";

const ConnectionsPage = observer(() => {
  const [isLoading, setIsLoading] = useState(false);
  const [oauthStep, setOauthStep] = useState(-1);
  const [showModal, setShowModal] = useState(false);

  const [selectedProvider, setSelectedProvider]: any = useState({});

  const { payerStore, userStore } = useStores();

  const getPayer = async () => {
    setIsLoading(true)
    await payerStore.getPayer().catch((ex) => {});
    setIsLoading(false);
  }

  useEffect(() => {
    (async () => {
      await getPayer();
    })();
  }, []);

 const disconnect = async () => {
  await userStore.disconnectFromDataSource(selectedProvider._id,DATA_SOURCE.payer)
   await getPayer();
  setShowModal(false)
 }

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
      {oauthStep === -1 &&
        payerStore?.payers?.map((item) => (
          <Provider
            key={item._id}
            name={item.name}
            isConnected={item.is_connected}
            onClick={() => {
              if (item.is_connected) return;

              setOauthStep(1);
              setSelectedProvider(item);
            }}
            onDisconnect={ () =>{
              setSelectedProvider(item)
              setShowModal(true)
              
            }}
          />
        ))}

      {oauthStep === 1 && (
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
      <Modal size="sm" primaryButtonText="Disconnect" rightButtonClassName="modal-button" showModal={showModal} onHide={() => setShowModal(false)}  oK={disconnect} headerText="Disconnect Payer?" centered bodyText="Are you sure you want to disconnect this provider? Payer information will be kept and can be reconnected at anytime." />
    </div>
  );
});

export default ConnectionsPage;
