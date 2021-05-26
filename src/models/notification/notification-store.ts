
import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { withRootStore } from "../extensions/with-root-store";
import {NotificationService} from "../../services/notification/notificationService";

const DataModel = types.model('DataModel').props({
  body:types.maybe(types.string),
  title:types.maybe(types.string),
  name:types.maybe(types.string),
})
const  NotificationModel = types.model('NotificationModel').props({
    _id: types.string,
    name:types.maybe(types.string),
    payer:types.maybe(types.string),
    data:DataModel,
    notificationType:types.maybe(types.string),
    hasRefreshToken:false,
})
export const NotificationStoreModel = types
  .model("NotificationStore")
  .props({
    notifications:types.array(NotificationModel)
  })

  .extend(withEnvironment)
  .extend(withRootStore)
  // .views((self) => ({
  //   defaultPayer: () => self.not.find((x) => x.is_default),
  // }))
  .actions((self) => ({
    setNotifications: (value: any) => {
      self.notifications.replace(value);
    },
    clear: () => {},
  }))
  .actions((self) => ({
    getNotifications: flow(function* () {
      const { authStore } = self.rootStore;
      const notificationService = new NotificationService();

      const result = yield notificationService.getNotifications(authStore.token);
      if (result && result.kind == "ok") {
        if (result.data) {
          self.setNotifications(result.data);
        } else {
          console.log(result);
        }
      } else {
        console.log(result);
        // NotificationService.show(
        //   result?.data?.message || result?.data,
        //   "error"
        // );
      }
      return result;
    }),
  }));

type NotificationStoreType = Instance<typeof NotificationStoreModel>;
export interface NotificationStore extends NotificationStoreType {}
type NotificationStoreSnapshotType = SnapshotOut<typeof NotificationStoreModel>;
export interface PatientStoreSnapshot extends NotificationStoreSnapshotType {}
