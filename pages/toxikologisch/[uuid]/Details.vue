<script setup lang="ts">
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToxi } from '@/lib/hooks/Toxikologisch';
import { toast } from 'vue-sonner';
import { useCustomRoute } from '@/lib/hooks/CustomRoute';

const { switchTab, route } = useCustomRoute();
const { get: getToxi, update: updateToxi, addDrug, removeDrug } = useToxi();
const analyse = await getToxi(route.params.uuid);

const activeTab = ref('Details');

function saveDetails() {
  if (!analyse.value) return;

  updateToxi(analyse.value.id, analyse.value);

  toast('Details gespeichert', {
    description: 'Die Details wurden erfolgreich gespeichert.',
  });
}
</script>

<template>
  <div class="flex min-h-screen w-full flex-col">
    <div class="flex flex-col sm:gap-4 sm:py-4">
      <header
        class="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"
      >
        <Breadcrumb class="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink as-child>
                <a href="/toxikologisch">Toxikologische Analysen</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {{ analyse?.akz }} </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {{ activeTab }} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs default-value="Details" @update:model-value="(a) => switchTab('' + a)">
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="Drogen"> Drogen </TabsTrigger>
              <TabsTrigger value="Details"> Details </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2"></div>
          </div>
          <TabsContent value="Details">
            <div class="grid gap-4 py-4" v-if="analyse">
              <div class="grid grid-cols-12 items-center gap-4">
                <Label for="aktenzeichen" class=""> Aktenzeichen </Label>
                <Input id="aktenzeichen" class="col-span-11" type="text" v-model="analyse.akz" />
              </div>
              <div class="grid grid-cols-12 items-center gap-4">
                <Label for="gutachter" class=""> Gutachter </Label>
                <Input id="gutachter" class="col-span-11" type="text" v-model="analyse.gutachter" />
              </div>
              <div class="grid grid-cols-12 items-center gap-4">
                <Label for="gutachter" class=""> Im Auftrag von </Label>
                <Input id="gutachter" class="col-span-11" type="text" v-model="analyse.forName" />
              </div>

              <div class="flex gap-2 justify-start">
                <Button @click="saveDetails"> Änderungen speichern </Button>
                <Button @click="analyse.copyToClipboard()"> Gutachten kopieren </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
