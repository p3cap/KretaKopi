<script setup>
import { ref, computed, onMounted } from 'vue';
import { getNotifyList } from '@/data/data.js';
import { formatDate } from '@/data/functions.js'
import { guessIcon } from '@/data/iconizer';

const notifications = ref([]);

onMounted(() => {
  notifications.value = getNotifyList({
    sort: (a, b) => new Date(b.date) - new Date(a.date) // will be changed to types instead of arrowfunction
  });
});
</script>

<template>
  <h2 class="title">Notifications</h2>
  <div class="notifications">
    <div v-if="notifications.length === 0">No notifications found.</div>
    <ul v-else class="notification-list">
      <li v-for="(item, index) in notifications" :key="index" class="notification-item">

        <component :is="guessIcon(item.class)"/> <!-- Example usage -->

        <div class="notification-header">
          <strong>{{ item.class }}</strong> — {{ formatDate(item.date) }}
        </div>
        <div class="notification-title">{{ item.title }}</div>
        <div class="notification-details">
          <template v-if="item.ref.grade !== undefined">
            Grade: {{ item.ref.grade }} | Weight: {{ item.ref.weight }}
          </template>
          <template v-else-if="item.ref.deadline">
            Homework deadline: {{ formatDate(item.ref.deadline) }}
          </template>
          <template v-else-if="item.ref.is_justified !== undefined">
            Omission: {{ item.ref.is_justified ? 'Justified' : 'Unjustified' }}
          </template>
        </div>
      </li>
    </ul>
  </div>
</template>

<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
.notifications {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 1rem;
}

.notification-list {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 0 .5rem;
}

.notification-item {
  background: var(--Bright-Snow);
  border-radius: 1rem;
  padding: 1rem;
  /* box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); */
  box-shadow: var(--Main-Shadow);
}

.notification-header {
  font-size: 0.9em;
  color: var(--Iron-Grey);
  margin-bottom: 4px;
}

.notification-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.notification-details {
  font-size: 0.85em;
  color: var(--Gunmetal);
}
</style>
