<script setup>
import { ref, computed, onMounted } from 'vue';
import { getNotifyList } from '@/data/data.js'; // adjust the path if necessary
import { guessIcon } from '@/data/iconizer';

const notifications = ref([]);

// Load notifications on mount
onMounted(() => {
  notifications.value = getNotifyList();
});

// Sort notifications by date (descending)
const sortedNotifications = computed(() => {
  return [...notifications.value].sort((a, b) => new Date(b.date) - new Date(a.date));
});

// Format date nicely
function formatDate(dateStr) {
  const date = new Date(dateStr);
  if (isNaN(date)) return dateStr; // fallback
  return date.toLocaleDateString('hu-HU', { year: 'numeric', month: '2-digit', day: '2-digit' });
}
</script>
<template>
  <div class="notifications">
    <h2 class="title">Notifications</h2>
    <div v-if="notifications.length === 0">No notifications found.</div>
    <ul v-else class="notification-list">
      <li v-for="(item, index) in sortedNotifications" :key="index" class="notification-item">
        {{ guessIcon(item.class) }}
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



<style scoped>
.notifications {
  max-width: 600px;
  margin: auto;
  font-family: sans-serif;
}

.title {
  text-align: center;
  margin-bottom: 16px;
}

.notification-list {
  list-style: none;
  padding: 0;
}

.notification-item {
  background: #f3f3f3;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 12px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.notification-header {
  font-size: 0.9em;
  color: #555;
  margin-bottom: 4px;
}

.notification-title {
  font-weight: bold;
  margin-bottom: 4px;
}

.notification-details {
  font-size: 0.85em;
  color: #333;
}
</style>
