<template></template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import axios from "@/plugins/axios";
import { onMounted } from "vue";

const route = useRoute();
const router = useRouter();

async function login() {
  localStorage.setItem("token", route.query.code as string);

  try {
    const { data } = await axios.get("/oauth/user");

    if (data?.save) {
      localStorage.setItem("periods", JSON.stringify(data.save));
    }

    await router.push("/?login=true");
  } catch (e) {
    console.error(e);
    await router.push("/?login=false");
  }
}

onMounted(() => {
  login();
});
</script>

<style scoped></style>
