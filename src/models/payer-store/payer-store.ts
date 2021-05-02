import { PayerService } from "./../../services/payer/payerService";
import { AuthService } from "./../../services/authentication/authService";
import { RootStoreModel } from "./../root-store/root-store";

import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow, getRoot } from "mobx-state-tree";
import NotificationService from "../../services/NotificationService";
import { withRootStore } from "../extensions/with-root-store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

const PayerModel = types.model("PayerModel").props({
  is_connected: types.maybe(types.boolean),
  _id: types.maybe(types.string),
  name: types.maybe(types.string),
  is_default: types.maybe(types.boolean),
  desc: types.maybe(types.string),
  grantType: types.maybe(types.string),
  registration_url: types.maybe(types.string),
  client_id: types.maybe(types.string),
  client_secret: types.maybe(types.string),
  redirect_url: types.maybe(types.string),
  api_endpoint: types.maybe(types.string),
  token_endpoint: types.maybe(types.string),
  organization: types.maybe(types.string),
  oauth_url: types.maybe(types.string),
  code_verifier: types.maybe(types.string),
});

export const PayerStoreModel = types
  .model("PayerStore")
  .props({
    payers: types.optional(types.array(PayerModel), []),
  })

  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({
    defaultPayer: () => self.payers.find((x) => x.is_default),
  }))
  .actions((self) => ({
    setPayers: (value: any) => {
      self.payers.replace(value);
    },
    clear: () => {},
  }))
  .actions((self) => ({
    getPayer: flow(function* () {
      const { authStore } = self.rootStore;

      const payerService: PayerService = new PayerService();

      const result = yield payerService.getPayer(authStore.token);

      if (result && result.kind == "ok") {
        if (result.data) {
          self.setPayers(result.data);
        } else {
          console.log(result);
        }
      } else {
        console.log(result);
        NotificationService.show(
          result?.data?.message || result?.data,
          "error"
        );
      }
      return result;
    }),
    connectPayer: flow(function* (payload: any) {
      const { authStore } = self.rootStore;

      const payerService: PayerService = new PayerService();

      const result = yield payerService.connectPayer(authStore.token, payload);

      if (result && result.kind == "ok") {
        if (result.data) {
          // self.setPayers(result.data);
        } else {
          console.log(result);
        }
      } else {
        console.log(result);
        NotificationService.show(
          result?.data?.message || result?.data,
          "error"
        );
      }
      return result;
    }),
  }));

type PayerStoreType = Instance<typeof PayerStoreModel>;
export interface PayerStore extends PayerStoreType {}
type PayerStoreSnapshotType = SnapshotOut<typeof PayerStoreModel>;
export interface PayerStoreSnapshot extends PayerStoreSnapshotType {}
