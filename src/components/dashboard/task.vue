<template>
  <div class="rounded-lg border border-solid p-[6px] border-gray-200">
    <div class="flex justify-between">
      <h3>{{ item?.title }}</h3>
      <VsPopover placement="bottom-left">
        <template #reference>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="icon icon-tabler icons-tabler-outline icon-tabler-dots-vertical text-gray-800"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
            <path d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
          </svg>
        </template>

        <p>Change status</p>
        <div class="my-[6px]">
          <VsFormRadio :options v-model="statusValue" />
        </div>
        <button
          @click="deleteTask"
          class="p-[4px] border block w-full rounded border-red-500 text-red-500 hover:bg-gray-50"
        >
          DELETE
        </button>
      </VsPopover>
    </div>
    <p class="text-sm mt-[6px] border-t pt-[6px]">{{ item?.description }}</p>
  </div>
</template>

<script setup lang="ts">
import { useTasks } from "../../stores/tasks";
import { ref, watch } from "vue";

const props = defineProps({ item: Object });
const tasks = useTasks();

const options = [
  { id: "todo", text: "TODO" },
  { id: "inprogres", text: "INPROGRES" },
  { id: "done", text: "DONE" },
];

const statusValue = ref(props.item.status);
// @ts-ignore
watch(statusValue, (n) => tasks.changeTaskStatus(props.item.id, n));
// @ts-ignore
const deleteTask = () => tasks.deleteTask(props.item.id);
</script>

<style scoped></style>
