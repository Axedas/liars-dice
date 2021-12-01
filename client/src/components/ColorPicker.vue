<template>
    <div class="color-picker" v-show="color-picker">
            <Cell
            class="active"
            @click="colorsMap">
            </Cell>
        <div v-if="" >
        </div>
        <div v-else>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const COLORS = [
    'red',
    'orange',
    'yellow',
    'blue',
    'white',
    'black', 
    'green', 
    'pink',
    'purple'
]

export default defineComponent({
    name: 'colorPicker',
    props: {

    },
    methods: {
        colorsMap(event) {
            COLORS.map((color, index) => {
                return <Cell
                color= {color}
                key= {index}
                />
            })
        }
    }
})
</script>

<style scoped>

</style>