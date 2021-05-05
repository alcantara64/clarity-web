import { AuthService } from "./../../services/authentication/authService";
import { RootStoreModel } from "./../root-store/root-store";

import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow, getRoot } from "mobx-state-tree";
import NotificationService from "../../services/NotificationService";
import { withRootStore } from "../extensions/with-root-store";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export const AuthStoreModel = types
  .model("AuthStore")
  .props({
    token: types.maybe(types.string),
  })

  .extend(withEnvironment)
  .actions((self) => ({
    setAuthToken: (value: any) => {
      self.token = value;
    },
    clear: () => {},
  }))
  .actions((self) => ({
    userLogin: flow(function* (payload) {
      const authService: AuthService = new AuthService();

      const result = yield authService.userLogin(payload);

      if (result && result.kind == "ok") {
        if (result.data) {
          self.token = result.data.token;
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

type AuthStoreType = Instance<typeof AuthStoreModel>;
export interface AuthStore extends AuthStoreType {}
type AuthStoreSnapshotType = SnapshotOut<typeof AuthStoreModel>;
export interface AuthStoreSnapshot extends AuthStoreSnapshotType {}
