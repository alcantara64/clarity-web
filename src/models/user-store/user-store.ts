import { UserService } from "./../../services/user/userService";
import { withRootStore } from "./../extensions/with-root-store";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import NotificationService from "../../services/NotificationService";
import { DATA_SOURCE } from "./../../enums/dataSource";

const UserProfile = types.model("UserProfile").props({
  _id: types.maybe(types.string),
  activeDevice: types.maybe(types.string),
  emailVerified: types.maybe(types.boolean),
  // androidNotificationToken: types.maybeNull(types.string),
  email: types.maybe(types.string),
  dob: types.maybe(types.string),
  notificationOptOut: types.maybe(types.array(types.string)),
  firstName: types.maybe(types.string),
  lastName: types.maybe(types.string),
  primaryCarePhysician: types.maybe(types.array(types.string)),
  emergencyContact: types.maybe(types.array(types.string)),
  shared: types.maybe(types.array(types.string)),
  roles: types.maybe(types.array(types.string)),
});

export const UserStoreModel = types
  .model("UserStore")
  .props({
    userProfile: types.maybe(UserProfile),
  })
  //   .extend(withRootStore)
  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    setUser: (value: any) => {
      self.userProfile = value;
    },
  }))

  .actions((self) => ({
    userSignUp: flow(function* (payload: any) {
      const userService: UserService = new UserService();

      const result = yield userService.signUp(payload);

      if (result && result.kind === "ok") {
        if (result.data) {
          const { token } = result.data;

          const { authStore } = self.rootStore;

          authStore.setAuthToken(token);
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

    fetchProfile: flow(function* () {
      const { authStore } = self.rootStore;

      const userService: UserService = new UserService();

      const result = yield userService.getProfile(authStore.token);

      if (result && result.kind === "ok") {
        if (result.data) {
          self.setUser(result.data);
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
    disconnectFromDataSource: flow(function* (dataSourceId:string, type:DATA_SOURCE) {
      const { authStore } = self.rootStore;

      const userService: UserService = new UserService();
      const result = yield userService.disconnectFromDataSource(authStore.token, dataSourceId, type);

      if (result && result.kind === "ok") {
        if (result.data) {
          NotificationService.show(
            result?.data?.message || result?.data,
            "success"
          );
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
    forgotPassword: flow(function* (email:string) {
      const { authStore } = self.rootStore;

      const userService: UserService = new UserService();

      const result = yield userService.forgotPassword(authStore.token, email);

      if (result && result.kind === "ok") {
        if (result.data) {
          NotificationService.show(
            result?.data?.message || result?.data,
            "success"
          );
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
    resetPassword: flow(function* (payload: {token:string, code:string, newPassword:string, verifyPassword:string }) {
     
      const { authStore } = self.rootStore;

      const userService: UserService = new UserService();

      const result = yield userService.resetPassword(authStore.token, payload);

      if (result && result.kind === "ok") {
        if (result.data) {
          NotificationService.show(
            result?.data?.message || result?.data,
            "success"
          );
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
    verifyResetCode: flow(function* (payload: {token:string, code:string, device_id:string }) {
      const { authStore } = self.rootStore;

      const userService: UserService = new UserService();

      const result = yield userService.verifyResetCode(authStore.token, payload);

      if (result && result.kind === "ok") {
        if (result.data) {
          NotificationService.show(
            result?.data?.message || result?.data,
            "success"
          );
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

type UserStoreType = Instance<typeof UserStoreModel>;
export interface UserStore extends UserStoreType {}
type UserStoreSnapshotType = SnapshotOut<typeof UserStoreModel>;
export interface UserStoreSnapshot extends UserStoreSnapshotType {}
