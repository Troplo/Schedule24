<template>
  <component
    :is="inited ? Transition : 'div'"
    name="dialog-transition"
    mode="out-in"
  >
    <div v-if="hasProgressed && !editing">
      <div class="flex justify-end mt-4 gap-2 mb-4">
        <tpu-button @click="editing = true">Edit</tpu-button>
        <tpu-button
          :disabled="mode === Mode.WEEK_A"
          @click="mode = Mode.WEEK_A"
        >
          Week A (2023)
        </tpu-button>
        <tpu-button
          :disabled="mode === Mode.WEEK_B"
          @click="mode = Mode.WEEK_B"
        >
          Week B (2023)
        </tpu-button>
        <tpu-button
          :disabled="mode === Mode.UNIFIED"
          @click="mode = Mode.UNIFIED"
        >
          Unified Week (2024)
        </tpu-button>
        <tpu-button :disabled="mode === Mode.ALL" @click="mode = Mode.ALL">
          All
        </tpu-button>
      </div>
      <transition name="slide-x-transition" mode="out-in">
        <schedule-component
          :key="mode"
          :periods="periods"
          :mode="mode"
          v-if="mode !== Mode.ALL"
        />
        <div :key="'ALL'" v-else>
          <template v-for="mode in 3">
            <p class="text-xl mt-4 mb-2">{{ Mode[mode - 1] }}</p>

            <schedule-component :periods="periods" :mode="mode - 1" />
          </template>
        </div>
      </transition>
      <small>
        Please report discrepancies. Unified week is subject to change.
      </small>
      <div class="mt-4">
        <p class="text-xl mt-4 mb-2">Legend</p>
        <div
          v-for="period in Object.entries(Definition).filter(
            (key) => typeof key[1] === 'number'
          )"
          :key="period[0]"
          class="flex flex-col gap-1"
        >
          <div
            :style="{
              backgroundColor: getPeriodMetadata(period[1]).color + '20',
              color: [
                Definition.WHITE,
                Definition.YELLOW,
                Definition.BLUE,
                Definition.RED,
                Definition.GREEN
              ].includes(period[1])
                ? getPeriodMetadata(period[1]).color
                : 'white'
            }"
            class="flex justify-between items-center"
          >
            <div class="flex flex-col gap-1">
              <div>
                {{ (period[1] as number) + 1 }} &bullet;
                {{ getPeriodMetadata(period[1]).name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="flex flex-col gap-2">
      <p class="text-xl">
        Please enter your respective period data for Tuesday Week A or B
      </p>
      <text-field
        type="text"
        v-model="periods[Definition.GREEN]"
        label="Period 1 (Green)"
      />
      <text-field
        type="text"
        v-model="periods[Definition.YELLOW]"
        label="Period 2 (Yellow)"
      />
      <text-field
        type="text"
        v-model="periods[Definition.BLACK]"
        label="Period 3 (Black)"
      />
      <text-field
        type="text"
        v-model="periods[Definition.BLUE]"
        label="Period 4 (Blue)"
      />
      <text-field
        type="text"
        v-model="periods[Definition.WHITE]"
        label="Period 5 (White)"
      />
      <text-field
        type="text"
        v-model="periods[Definition.RED]"
        label="Period 6 (Red)"
      />
      <small>
        You must enter data into all fields, you may specify "Free" if you don't
        have a class.
      </small>
      <div class="flex justify-end mt-4">
        <tpu-button @click="save">Submit</tpu-button>
      </div>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, onMounted, provide, ref, Transition, watch } from "vue";
import TextField from "@/components/Framework/Input/TextField.vue";
import TpuButton from "@/components/Framework/Button/TpuButton.vue";
import ScheduleComponent from "@/components/ScheduleComponent.vue";
import { currentPeriods, Definition, Mode } from "@/data";

const mode = ref<Mode>(Mode.UNIFIED);
const inited = ref(false);

function save() {
  localStorage.setItem("periods", JSON.stringify(periods.value));
  editing.value = false;
}

const periods = ref({
  [Definition.GREEN]: "",
  [Definition.YELLOW]: "",
  [Definition.BLACK]: "",
  [Definition.BLUE]: "",
  [Definition.WHITE]: "",
  [Definition.RED]: ""
});

onMounted(() => {
  const savedPeriods = localStorage.getItem("periods");
  if (savedPeriods) {
    periods.value = JSON.parse(savedPeriods);

    if (Object.values(periods.value).every((period) => period)) {
      editing.value = false;
    }
  }

  const savedMode = localStorage.getItem("mode");
  if (savedMode) {
    mode.value = parseInt(savedMode);
  }
  inited.value = true;
});

watch(
  () => mode.value,
  () => {
    localStorage.setItem("mode", mode.value.toString());
  }
);

const hasProgressed = computed(() => {
  return Object.values(periods.value).every((period) => period);
});

const editing = ref(true);

function getPeriodMetadata(period: Definition | string) {
  switch (period) {
    case Definition.BLUE:
      return {
        color: "#0190ea",
        name: periods.value[Definition.BLUE]
      };
    case Definition.YELLOW:
      return {
        color: "#f9d71c",
        name: periods.value[Definition.YELLOW]
      };
    case Definition.BLACK:
      return {
        color: "#000000",
        name: periods.value[Definition.BLACK]
      };
    case Definition.WHITE:
      return {
        color: "#ffffff",
        name: periods.value[Definition.WHITE]
      };
    case Definition.RED:
      return {
        color: "#ff0044",
        name: periods.value[Definition.RED]
      };
    case Definition.GREEN:
      return {
        color: "#1ea97c",
        name: periods.value[Definition.GREEN]
      };
    default:
      return {
        color: "#ff0000",
        name: "Free"
      };
  }
}

provide("getPeriodMetadata", getPeriodMetadata);
</script>

<style scoped></style>
