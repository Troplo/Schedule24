<template>
  <table>
    <thead>
      <tr>
        <th>period</th>
        <th v-for="day in Object.keys(currentPeriods[mode])" :key="day">
          {{ day }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(period, index) in periods" :key="index">
        <td>{{ parseInt(index as unknown as string) + 1 }}</td>
        <td
          style="min-width: 200px; max-width: 200px"
          class="text-ellipsis whitespace-nowrap overflow-hidden"
          v-for="day in Object.keys(currentPeriods[mode])"
          :key="day"
          :style="{
            backgroundColor:
              getPeriodMetadata(currentPeriods[mode]![day][index]).color + '20',
            color: [
              Definition.WHITE,
              Definition.YELLOW,
              Definition.BLUE,
              Definition.RED,
              Definition.GREEN
            ].includes(currentPeriods[mode][day][index])
              ? getPeriodMetadata(currentPeriods[mode]![day][index]).color
              : 'white'
          }"
        >
          <div>
            {{ getPeriodMetadata(currentPeriods[mode][day][index]).name }}
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { currentPeriods, Definition, Mode } from "@/data";
import { inject } from "vue";

const props = defineProps({
  mode: {
    type: Number as PropType<Mode>,
    required: true
  },
  periods: {
    type: Object as PropType<Record<Definition, string>>,
    required: true
  }
});

const getPeriodMetadata = inject("getPeriodMetadata") as (
  period: Definition
) => { name: string; color: string };
</script>

<style scoped></style>
