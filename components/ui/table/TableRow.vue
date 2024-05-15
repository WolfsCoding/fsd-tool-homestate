<script setup lang="ts">
import type { HTMLAttributes } from "vue";
import { cn } from "@/lib/utils";

const props = defineProps<{
    class?: HTMLAttributes["class"];
    href?: string;
}>();

const lastClicked = new Date();
const handleClick = (event: MouseEvent) => {
    if (props.href) {
        event.preventDefault();

        if (new Date().getTime() - lastClicked.getTime() < 250) {
            useRouter().push(props.href);
        } else {
            lastClicked.setTime(new Date().getTime());
        }
    }
};
</script>

<template>
    <tr :class="cn('border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted', props.class)" @click="handleClick">
        <slot />
    </tr>
</template>
