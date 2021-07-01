import "./index.less";
import { useStores } from "../../models";
import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import OauthStep1 from "../../components/OauthStep1";
import OauthStep2 from "../../components/OauthStep2";
import OauthLoading from "../../components/OauthLoading";
import { useHistory, useLocation } from "react-router";
import { ROUTES } from "../../constants/routes";
import queryString from "query-string";
import NotificationService from "../../services/NotificationService";

const OauthPage = () => {
  const { payerStore, notificationStore } = useStores();

  const [gettingPayer, setGettingPayer] = useState(true);

  const [oauthStep, setOauthStep] = useState(0);

  const [isLoading, setIsLoading] = useState(false);

  const history = useHistory();

  const location = useLocation();

  useEffect(() =>{
    ( async ()=>{
     await notificationStore.getNotifications().catch((error) => {console.log('notification error', error)})
     console.log('user notifications', notificationStore.notifications)
    })()
    }, [])

  useEffect(() => {
    (async () => {
      setGettingPayer(true);
      await payerStore.getPayer().catch((ex) => {});

      const defaultPayer = payerStore.defaultPayer();

      console.log('default payer',!defaultPayer);

      if (defaultPayer) {
        const { is_connected } = defaultPayer;

        if (is_connected) {
          setGettingPayer(false);
          history?.push(`${ROUTES.timeLine}`);
        } else {
          if (location?.search) {
            const query = queryString.parse(location.search);
            const { code, error } = query;
            debugger
           if(!code || code === 'undefined'){

             NotificationService.show(error?.toString() || 'IDP sent and invalid response', 'error')
            setGettingPayer(false);
             return
           }

            delete query.code;

            const payload = {
              payerId: defaultPayer._id,
              code: code,
              codeVerifier: defaultPayer.code_verifier,
              query: query,
            };

            const resp = await payerStore
              .connectPayer(payload)
              .catch((ex) => {});

            if (resp.kind === "ok") {
              setGettingPayer(false);
              history?.push(`${ROUTES.timeLine}`);
            }else{
              setGettingPayer(false);
            }
          } else {
            setGettingPayer(false);
          }
        }
      } else {
        setGettingPayer(false);
      }
    })();
  }, []);

  const performOauth = async () => {
    const defaultPayer = payerStore.defaultPayer();

    window.open(defaultPayer?.oauth_url, "_self", "width=500,height=500");

    setIsLoading(true);
  };

  if (gettingPayer) {
    return <Loading />;
  }

  return (
    <div id="oauth-page">
      {!isLoading && oauthStep === 0 && (
        <div className="oauth-step1-container">
          <OauthStep1
            noDefaultPayer={!payerStore.defaultPayer()}
            onConnect={() => {
              setOauthStep(1);
            }}
          />
        </div>
      )}
      {!isLoading && oauthStep === 1 && (
        <div className="oauth-step2-container">
          <OauthStep2
            onBackClick={() => {
              setOauthStep(0);
            }}
            onContinueClick={() => {
              performOauth();
            }}
          />
        </div>
      )}
      {isLoading && (
        <div className="oauth-loading-container">
          <OauthLoading />
        </div>
      )}
    </div>
  );
};

export default OauthPage;
