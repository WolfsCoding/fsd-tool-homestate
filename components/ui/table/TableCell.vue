<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <td :class="cn('align-middle [&:has([role=checkbox])]:pr-0 p-[--table-padding]', props.class)">
        <slot />
    </td>
</template>
