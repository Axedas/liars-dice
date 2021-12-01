<template>
  <div class="color-picker" v-show="color - picker">
    <Cell clickFunction=() => { this.toggleColorPicker } />
    <div v-if="colorPickerOpen">
      <Cell v-for="color of COLORS" clickFunction= () =>
      {this.setPlayerColor(color) } />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { COLORS } from "../constants.ts";

export default defineComponent({
  name: "colorPicker",
  props: {},
  methods: {
    toggleColorPicker() {
      if (this.$store.state.colorPickerOpen) {
        this.$store.dispatch("hideColorPicker");
      } else {
        this.$store.dispatch("showColorPicker");
      }
    },
    setPlayerColor(color) {
      this.$store.dispatch("setPlayerColor", color);
    },
  },
  data() {
    return {
      colorPickerOpen: this.$store.state.colorPickerOpen,
    };
  },
});
</script>

<style lang='scss' scoped>

</style>
