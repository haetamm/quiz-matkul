import { useState } from "nuxt/app";
import { computed } from "vue";

export const useTimer = () => {
  const sisaDetik = useState<number>("sisaDetik", () => 0);
  const berjalan = useState<boolean>("berjalan", () => false);
  let interval: ReturnType<typeof setInterval> | null = null;

  const mulai = (durasiMenit: number) => {
    sisaDetik.value = durasiMenit * 60;
    berjalan.value = true;
    interval = setInterval(() => {
      if (sisaDetik.value <= 0) {
        berhenti();
      } else {
        sisaDetik.value--;
      }
    }, 1000);
  };

  const berhenti = () => {
    berjalan.value = false;
    if (interval) clearInterval(interval);
  };

  const formatWaktu = computed(() => {
    const m = Math.floor(sisaDetik.value / 60)
      .toString()
      .padStart(2, "0");
    const s = (sisaDetik.value % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  });

  return { sisaDetik, berjalan, formatWaktu, mulai, berhenti };
};
