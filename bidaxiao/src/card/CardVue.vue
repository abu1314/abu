<template>
    <div class="card">
        <div class="num">{{ card.num }}</div>
        <div v-for="i in num"> </div>
        <div class="num">{{card.num }}</div>
    </div>
</template>
<script setup>
    defineProps({
        card:card
    })
</script>