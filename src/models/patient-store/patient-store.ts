import { FhirServerQueryParams, PatientService } from "./../../services/patient/patientService";

import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";
import { withRootStore } from "../extensions/with-root-store";

export const PatientStoreModel = types
  .model("PatientStore")
  .props({
    selectedResource: types.optional(types.string, "ExplanationOfBenefit"),
  })

  .extend(withEnvironment)
  .extend(withRootStore)
  .actions((self) => ({
    setSelectedResource: (value: any) => {
      self.selectedResource = value;
    },
    clear: () => {},
  }))
  .actions((self) => ({
    getFhirData: flow(function* (resource, payerID,params:FhirServerQueryParams| null) {
      const { authStore } = self.rootStore;

      const payerService: PatientService = new PatientService();

      const result = yield payerService.getFhirData(
        authStore.token,
        resource,
        payerID,
        params,
      );

      if (result && result.kind === "ok") {
        if (result.data) {
          // self.setPatients(result.data);
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

type PatientStoreType = Instance<typeof PatientStoreModel>;
export interface PatientStore extends PatientStoreType {}
type PatientStoreSnapshotType = SnapshotOut<typeof PatientStoreModel>;
export interface PatientStoreSnapshot extends PatientStoreSnapshotType {}
