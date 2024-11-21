<template>
  <div class="flex-grow flex" style="height: calc(100vh - 60px)">
    <div
      v-for="group in taskGroups"
      :key="group"
      class="border-transparent border-solid border-r-gray-200"
      style="width: calc(100% / 3)"
    >
      <div class="h-[40px] uppercase text-center py-[6px] bg-gray-100">
        {{ group }}
      </div>
      <div
        class="overflow-y-auto p-[10px] flex flex-col gap-[10px]"
        style="height: calc(100vh - 100px)"
      >
        <TaskItem
          v-for="task in taskList?.filter((i) => i?.status === group)"
          :key="task?.id"
          :item="task"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TaskItem from "./task.vue";
import { computed } from "vue";
import { useTasks } from "../../stores/tasks.ts";
import { Task } from "../../types/tasks";
const taskGroups = ["todo", "inprogres", "done"];

const tasks = useTasks();

const taskList = computed<Task[]>(() => tasks.tasks);
</script>

<style scoped></style>
