<template>
  <div class="player-box" v-show="player">
    {{ player.name }}
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    player: Object
  }
});
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.player-box {
  border: 2px black;
}
</style>
