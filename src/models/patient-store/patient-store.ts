import { PatientService } from "./../../services/patient/patientService";
import { AuthService } from "./../../services/authentication/authService";
import { RootStoreModel } from "./../root-store/root-store";

import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow, getRoot } from "mobx-state-tree";
import NotificationService from "../../services/NotificationService";
import { withRootStore } from "../extensions/with-root-store";

const PatientModel = types.model("PatientModel").props({
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

export const PatientStoreModel = types
  .model("PatientStore")
  .props({
    payers: types.optional(types.array(PatientModel), []),
  })

  .extend(withEnvironment)
  .extend(withRootStore)
  .views((self) => ({
    defaultPatient: () => self.payers.find((x) => x.is_default),
  }))
  .actions((self) => ({
    setPatients: (value: any) => {
      self.payers.replace(value);
    },
    clear: () => {},
  }))
  .actions((self) => ({
    getFhirData: flow(function* (resource, payerID) {
      const { authStore } = self.rootStore;

      const payerService: PatientService = new PatientService();

      const result = yield payerService.getFhirData(
        authStore.token,
        resource,
        payerID
      );

      if (result && result.kind == "ok") {
        if (result.data) {
          // self.setPatients(result.data);
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

type PatientStoreType = Instance<typeof PatientStoreModel>;
export interface PatientStore extends PatientStoreType {}
type PatientStoreSnapshotType = SnapshotOut<typeof PatientStoreModel>;
export interface PatientStoreSnapshot extends PatientStoreSnapshotType {}
