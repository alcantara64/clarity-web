import { withRootStore } from "./../extensions/with-root-store";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { withEnvironment } from "../extensions/with-environment";
import { SettingService } from "../../services/setting-service/setting-service";
import { IMPLEMENTATION_GUIDE } from "../../constants/constants";

const Setting = types.model("Setting").props({
    _id: types.maybe(types.string),
    type: types.maybe(types.string),
    value: types.maybe(types.string),
});

export const SettingStoreModel = types
    .model("SettingStore")
    .props({
        settings: types.maybe(types.array(Setting)),
        implementationGuid: types.maybe(Setting)
    })
    //   .extend(withRootStore)
    .extend(withEnvironment)
    .extend(withRootStore)
    .actions((self) => ({
        set: (value: any) => {
            self.implementationGuid = value || null;
        },
    }))

    .actions((self) => ({
        fetSettings: flow(function* () {
            const settingService = new SettingService()
            const { authStore } = self.rootStore;
            const { token } = authStore;
            debugger;
            const result = yield settingService.getSettings(token);

            if (result && result.kind === "ok") {
                if (result.data) {
                    const settings = result.data;
                    self.settings = settings;
                    const igs = settings.find((item: any) => item.type === IMPLEMENTATION_GUIDE)
                    self.set(igs)

                } else {
                    console.log(result);
                }
            } else {
                console.log(result);
            }
            return result;
        })
    }));

type SettingStoreType = Instance<typeof SettingStoreModel>;
export interface SettingStore extends SettingStoreType { }
type SettingStoreSnapshotType = SnapshotOut<typeof SettingStoreModel>;
export interface SettingStoreSnapshot extends SettingStoreSnapshotType { }
