import { onSnapshot } from "mobx-state-tree";
import { RootStoreModel } from "./root-store";
import { Environment } from "../environment";
import * as storage from "../../factories/utils/storage";

/**
 * The key we'll be saving our state as within async storage.
 */
const ROOT_STATE_STORAGE_KEY = "Traferium";

/**
 * Setup the environment that all the models will be sharing.
 *
 * The environment includes other functions that will be picked from some
 * of the models that get created later. This is how we loosly couple things
 * like events between models.
 */
export function createEnvironment() {
  const env = new Environment();
  env.setup();

  return env;
}

let data: any;

// prepare the environment that will be associated with the RootStore.
const env = createEnvironment();

let initialState = RootStoreModel.create({}, env);

data = storage.load(ROOT_STATE_STORAGE_KEY) || {};

if (data) {
  console.log("store initialization called");
  if (RootStoreModel.is(data)) {
    initialState = RootStoreModel.create(data, env);
  }
}

export const rootStore = initialState;

// track changes & save to storage
onSnapshot(rootStore, (snapshot) =>
  storage.save(ROOT_STATE_STORAGE_KEY, snapshot)
);
