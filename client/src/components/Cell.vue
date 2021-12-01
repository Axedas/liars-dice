<template>
    <div 
    className={isActive ? "cell active" : "cell"} v-show="cell"
    @click= "this.clickFunction">
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: 'cell',
    props: {
        color: String
        isActive: {
            type: Boolean
            default: false
        }
        clickFunction: Function
    },
    methods: {
        setPlayerColor(event) {
            this.$store.dispatch('setPlayerColor', this.color)
        },
    }
})
</script>

<style scoped>

</style>
