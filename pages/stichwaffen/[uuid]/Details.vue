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
import { type IStichwaffe } from '@/lib/localORM';
import { useStichwaffen } from '@/lib/hooks/Stichwaffen';
import { toast } from 'vue-sonner';
import { useCustomRoute } from '@/lib/hooks/CustomRoute';

const router = useRouter();
const { updateStichwaffe, getStichwaffe } = useStichwaffen();
const { getTab, switchTab, route } = useCustomRoute();

const stichwaffe = ref(await getStichwaffe(route.params.uuid));

const activeTab = ref('Details');

const createDialog: Ref<Partial<IStichwaffe>> = ref({
  from: '',
  name: '',
  dnas: [],
});

function saveDetails() {
  if (!stichwaffe.value) return;

  updateStichwaffe(stichwaffe.value.id, stichwaffe.value);

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
                <a href="/stichwaffen">Hieb und Stichwaffen Analysen</a>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {{ stichwaffe?.akz }} </BreadcrumbPage>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage> {{ activeTab }} </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main class="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Tabs
          default-value="Waffen"
          v-model="activeTab"
          @update:model-value="(a) => switchTab('' + a)"
        >
          <div class="flex items-center">
            <TabsList>
              <TabsTrigger value="Waffen"> Waffen </TabsTrigger>
              <TabsTrigger value="Details"> Details </TabsTrigger>
            </TabsList>
            <div class="ml-auto flex items-center gap-2"></div>
          </div>
          <TabsContent value="Details">
            <div class="grid gap-4 py-4" v-if="stichwaffe">
              <div class="grid grid-cols-12 items-center gap-4">
                <Label for="aktenzeichen" class=""> Aktenzeichen </Label>
                <Input id="aktenzeichen" class="col-span-11" type="text" v-model="stichwaffe.akz" />
              </div>
              <div class="grid grid-cols-12 items-center gap-4">
                <Label for="gutachter" class=""> Gutachter </Label>
                <Input
                  id="gutachter"
                  class="col-span-11"
                  type="text"
                  v-model="stichwaffe.gutachter"
                />
              </div>

              <div class="flex gap-2 justify-start">
                <Button @click="saveDetails"> Änderungen speichern </Button>
                <Button @click="stichwaffe.copyToClipboard()"> Gutachten kopieren </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  </div>
</template>
