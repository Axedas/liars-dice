<template>
    <div 
    className={isActive ? "cell active" : "cell"} v-show="cell"
    @click= "setPlayerColor">
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
    },
    methods: {
        setPlayerColor(event) {
            player.color = activeColor
        },
    }
})
</script>

<style scoped>

</style>
