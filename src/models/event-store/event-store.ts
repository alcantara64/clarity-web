
import { withEnvironment } from "./../extensions/with-environment";
import { Instance, SnapshotOut, types, flow } from "mobx-state-tree";

export const EventVideo = types.model("EventVideo").props({
  link: types.maybe(types.string),
  video_info: types.maybe(
    types.model({
      title: types.maybe(types.string),
      about: types.maybe(types.string),
      location: types.maybe(types.string),
      upvotes: types.maybe(types.number),
      downvotes: types.maybe(types.number),
      views: types.maybe(types.number),
    })
  ),
  video_id: types.maybe(types.string),
});

export const EventStoreModel = types
  .model("EventStore")
  .props({
    publicVideos: types.maybe(types.array(EventVideo)),
  })

  .extend(withEnvironment)
  .actions((self) => ({
    setPublicVideos: (value: any) => {
      self.publicVideos = value;
    },
    clear: () => {},
  }))
  .actions((self) => ({
    updateVideoStat: flow(function* (videoId, payload = null) {
      //const rootStore:any = getRoot(self);
      //  const {userStore} = rootStore;
      //const userProfile = userStore.userProfile;
      // const result: any = yield self.environment.api.updateVideoStat(
      //   videoId,
      //   payload
      // );
      // if (result && result.kind == "ok") {
      //   if (result.data) {
      //     console.log(result.data);
      //   } else {
      //     console.log(result);
      //   }
      // } else {
      //   NotificationService.show(result.data || result.data.message, "error");
      // }
      // return result;
    }),
  }));

type EventStoreType = Instance<typeof EventStoreModel>;
export interface EventStore extends EventStoreType {}
type EventStoreSnapshotType = SnapshotOut<typeof EventStoreModel>;
export interface EventStoreSnapshot extends EventStoreSnapshotType {}
