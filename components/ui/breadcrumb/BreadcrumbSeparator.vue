<script lang="ts" setup>
import type { HTMLAttributes } from "vue";
import { ChevronRight } from "lucide-vue-next";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
}>();
</script>

<template>
    <li role="presentation" aria-hidden="true" :class="cn('[&>svg]:size-5', props.class)">
        <slot>
            <i class="fa-regular fa-chevron-right"></i>
        </slot>
    </li>
</template>
