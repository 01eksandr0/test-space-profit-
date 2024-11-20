<template>
  <div class="px-[10px]">
    <button class="block h-[60px]" @click="isOpen = !isOpen">
      <svg
        :style="{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }"
        height="24"
        width="24"
        class="duration-300"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <rect width="18" height="18" x="3" y="3" rx="2"></rect>
        <path d="M15 3v18"></path>
        <path d="m8 9 3 3-3 3"></path>
      </svg>
    </button>
    <transition name="slide-fade">
      <div v-if="isOpen" class="w-[480px] p-[10px] relative">
        <p v-if="error" class="text-red-500 absolute top-[-12px] left-[18px]">
          {{ error }}
        </p>
        <VsForm :scheme ref="form" v-model="formValues" />
        <button
          @click="createNewTask"
          class="w-full h-[40px] text-blue-500 border-blue-500 border rounded-lg hover:bg-gray-50"
        >
          Create
        </button>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useTasks } from "../../stores/tasks";

const tasks = useTasks();

const scheme = {
  title: {
    type: "text",
    placeholder: "Title",
    label: "Title",
  },
  description: {
    type: "text",
    placeholder: "Description",
    label: "Description",
  },
  status: {
    type: "select",
    label: "Status",
    placeholder: "Status",
    items: [
      { id: "todo", text: "TODO" },
      { id: "inprogres", text: "INPROGRES" },
      { id: "done", text: "DONE" },
    ],
  },
};

const formValues = ref({});
const form = ref("form");
const error = ref("");
const isOpen = ref(true);

const createNewTask = () => {
  error.value = "";
  if (
    !formValues.value?.status || //simple validation
    !formValues.value?.title ||
    !formValues.value?.description
  ) {
    error.value = "Fill in the required fields";
    return;
  }
  tasks.createTask(formValues.value);
  formValues.value = {};
  form.value.formValues = {};
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s linear;
}

.slide-fade-leave-active {
  transition: all 0.3s linear;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
