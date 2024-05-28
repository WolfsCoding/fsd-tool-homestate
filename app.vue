<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>

  <div class="absolute left-[50%] translate-x-[-50%] top-0">
    <Alert
      class="w-screen-1/3 m-4"
      v-for="alert in alerts?.filter((x) => !readAlerts.includes(x.id))"
      :key="alert.id"
    >
      <div class="flex">
        <AlertTitle class="text-epa font-bold">{{ alert.title }}</AlertTitle>
        <i
          class="fa-solid fa-xmark ml-auto hover:text-epa cursor-pointer"
          @click="readAlert(alert.id)"
        ></i>
      </div>

      <AlertDescription> {{ alert.description }} </AlertDescription>
    </Alert>
  </div>
</template>

<script setup lang="ts">
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { SingleLocalStorage } from './lib/localORM';
import type { RealtimeChannel } from '@supabase/supabase-js';

const client = useSupabaseClient();
let realtimeChannel: RealtimeChannel;

interface AlertData {
  id: string;
  title: string;
  description: string;
}

const { data: alerts, refresh: refreshAlerts } = await useAsyncData<AlertData[]>(
  'alerts',
  async () => {
    const { data } = await client
      .from('alerts')
      .select('*')
      .order('created_at', { ascending: false });

    return data as AlertData[];
  }
);

onMounted(() => {
  realtimeChannel = client
    .channel('public:alerts')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'alerts' }, () =>
      refreshAlerts()
    );

  realtimeChannel.subscribe();
});

onUnmounted(() => {
  client.removeChannel(realtimeChannel);
});

const readAlerts = ref((await new SingleLocalStorage<string[]>('readAlerts').get()) ?? []);

function readAlert(id: string) {
  readAlerts.value.push(id);
  new SingleLocalStorage('readAlerts').set(readAlerts.value);
}
</script>
