<template>
  <div>
    <div class="videoCall ">
      <div id="remoteTrack"></div>
    </div>
    <div class="spacing"></div>
    <div class="videoCall">
      <div id="localTrack"></div>
    </div>
    <div>
      <button class="btn btn-success" @click="leaveRoomIfJoined()">out</button>
    </div>
  </div>
</template>

<script>
import Twilio, { createLocalVideoTrack } from "twilio-video";
import { mapGetters } from "vuex";
// import { fb } from "../../../apis/firebase/config";
export default {
  data() {
    return {
      activeRoom: null,
      localTrack: false,
    };
  },
  methods: {
    detachParticipantTracks(participant) {
      let tracks = Array.from(participant.tracks.values());
      this.detachTracks(tracks);
    },
    detachTracks(tracks) {
      tracks.forEach((track) => {
        track.detach().forEach((detachedElement) => {
          detachedElement.remove();
        });
      });
    },
    attachTracks(tracks, container) {
      tracks.forEach(function(track) {
        container.appendChild(track.attach());
      });
    },
    attachParticipantTracks(participant, container) {
      let tracks = Array.from(participant.tracks.values());
      this.attachTracks(tracks, container);
    },
    leaveRoomIfJoined() {
      if (this.activeRoom != null) {
        this.activeRoom.disconnect();
        const video = document.querySelector("video");
        const mediaStream = video.srcObject;
        const tracks = mediaStream.getTracks();

        tracks[0].stop();
        tracks.forEach((track) => track.stop());
        document.getElementById("localTrack").innerHTML = "";
        this.activeRoom = null;
        this.$emit("changeCallGear", false);
      }
    },
  },
  computed: {
    ...mapGetters("SOCIAL", ["getTokenCall", "getCallRoom", "getCallTarget"]),
    ...mapGetters("AUTH", ["getEmail"]),
  },
  watch: {
    getTokenCall(vl) {
      //   const checking = await fb
      //     .collection("user")
      //     .doc(this.getEmail)
      //     .get();
      //   let emailCalled = "";
      //   if (
      //     checking.exists &&
      //     checking.data().videocall != null &&
      //     checking.data().videocall != ""
      //   ) {
      //     emailCalled = checking.data().videocall;
      //     console.log(checking.data());
      //   }

      let connectOptions = {
        name: "123456",
        audio: true,
        video: { width: 180 },
      };
      if (this.activeRoom != null) {
        this.leaveRoomIfJoined();
      }

      Twilio.connect(vl, connectOptions).then((room) => {
        this.activeRoom = room;

        room.participants.forEach((participant) => {
          let previewContainer = document.getElementById("remoteTrack");
          this.attachParticipantTracks(participant, previewContainer);
        });
        room.on("participantConnected", (participant) => {
          console.log(participant.identity);
        });

        room.on("trackAdded", (track, participant) => {
          console.log(participant.identity + " added track: " + track.kind);
          let previewContainer = document.getElementById("remoteTrack");
          this.attachTracks([track], previewContainer);
        });

        room.on("trackRemoved", (track, participant) => {
          console.log(participant.identity + " removed track: " + track.kind);
          this.detachTracks([track]);
        });
        room.on("participantDisconnected", (participant) => {
          console.log(
            "Participant '" + participant.identity + "' left the room"
          );
          this.detachParticipantTracks(participant);
        });

        if (!this.localTrack) {
          createLocalVideoTrack().then((track) => {
            let localMediaContainer = document.getElementById("localTrack");
            localMediaContainer.appendChild(track.attach());
            this.localTrack = true;
          });
        }
      });
    },
  },
};
</script>

<style scoped>
.videoCall {
  position: relative;
  right: 20px;
}
</style>
