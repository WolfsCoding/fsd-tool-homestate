<template>
  <div class="dialog" v-if="dialog">
    <!-- <div class="absolute inset-0 bg-black bg-opacity-50" @click="dialog.close()"></div> -->
    <Dialog :defaultOpen="true" @update:open="onClose">
      <DialogContent>
        <DialogHeader>
          <DialogTitle v-if="dialog.title">{{ dialog.title }}</DialogTitle>
          <DialogDescription v-if="dialog.subtitle">
            {{ dialog.subtitle }}
          </DialogDescription>
        </DialogHeader>
        <div class="grid gap-4 py-4">
          <div class="grid grid-cols-6 items-center gap-4" v-for="dialogField in dialog.fields">
            <Label for="name" class="col-span-2"> {{ dialogField.label }} </Label>
            <Input
              v-if="dialogField.type == 'text'"
              id="name"
              v-model="dialogField.value"
              class="col-span-4"
            />
            <Select v-if="dialogField.type == 'select'" v-model="dialogField.value">
              <SelectTrigger class="col-span-4">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <template v-for="dialogFieldOption in dialogField.options">
                  <SelectGroup v-if="dialogFieldOption.type == 'group'">
                    <SelectLabel>{{ dialogFieldOption.label }}</SelectLabel>
                    <SelectItem v-for="item in dialogFieldOption.options" :value="item.value">
                      {{ item.label }}
                    </SelectItem>
                  </SelectGroup>
                  <SelectItem v-else :value="dialogFieldOption.label">
                    {{ dialogFieldOption.label }}
                  </SelectItem>
                </template>
              </SelectContent>
            </Select>
            <TagsInput v-if="dialogField.type == 'tag'" v-model="dialogField.value">
              <TagsInputItem v-for="item in dialogField.value" :key="item" :value="item">
                <TagsInputItemText />
                <TagsInputItemDelete />
              </TagsInputItem>

              <TagsInputInput />
            </TagsInput>
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" @click="dialog.submit()"> Bestätigen </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  </div>
</template>

<script lang="ts" setup>
import { useDialog } from './useDialog';

const { dialog } = useDialog();

const onClose = () => {
  dialog.value.close();
};
</script>
