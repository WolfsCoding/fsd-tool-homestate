const route = useRoute();

function switchTab(tabName: string) {
  const currentRoute = route.path.substring(0, route.path.lastIndexOf('/') + 1);

  useRouter().push(currentRoute + tabName);
}

function getTab() {
  const tab = ref();

  watchEffect(() => {
    tab.value = route.path.substring(route.path.lastIndexOf('/') + 1);
  });

  return tab;
}

export function useCustomRoute() {
  return {
    switchTab,
    route: useRoute(),
    getTab,
  };
}
