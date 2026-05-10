<template>
  <div
    class="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all"
    @click="$emit('click')"
  >
    <div class="text-4xl mb-3">{{ matkul.icon }}</div>
    <h2 class="text-lg font-semibold text-gray-800">{{ matkul.nama }}</h2>
    <p class="text-sm text-gray-500 mt-1">{{ matkul.deskripsi }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Matakuliah } from "~/types";
defineProps<{ matkul: Matakuliah }>();
defineEmits(["click"]);
</script>
