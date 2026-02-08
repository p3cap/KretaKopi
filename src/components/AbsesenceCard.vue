<script setup>
import { translateKey as t } from '@/data/translate';
const props = defineProps({
  omission: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(["viewed"]);

function markAsViewed() {
  if (props.omission.viewed === false) {
    emit("viewed", props.omission);
  }
}
</script>

<template>
    <!-- next steps: viewed - json összekotes, animatet pop up with more data, design, reverse the order-->
  <div
    class="omission-card"
    :class="{
      justified: omission.is_justified,
      unjustified: !omission.is_justified,
      unread: omission.viewed === false
    }"
    @click="markAsViewed"
  >
    <div class="header">
      <span class="class">{{ omission.class_id }}</span>
      <span class="date">{{ omission.date }}</span>
    </div>

    <div class="body">
      <p>
        <strong>
          {{ omission.is_justified ?  t('justified')  :  t('unjustified')  }}
        </strong>
      </p>

      <p v-if="omission.justification_type">
        {{ t('reason') }}: {{ omission.justification_type }}
      </p>

      <span v-if="omission.viewed === false" class="badge">
        {{ t('new') }}
      </span>
    </div>
  </div>
</template>


<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
.omission-card {
  padding: 14px 16px;
  border-radius: 16px;
  background: var(--Bright-Snow);
  border-left: 5px solid #999;
  cursor: pointer;
  margin: 20px;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;
}



.omission-card.justified {
  border-color: lightgreen;
  background: var(--Bright-Snow);
}

.omission-card.unjustified {
  border-color: red;
  background: var(--Bright-Snow);
}

.omission-card.unread {
  outline: 2px solid #3498db;
}

.header {
  display: flex;
  justify-content: space-between;
  font-weight: 600;
  margin-bottom: 6px;
}

.date {
  color: #666;
  font-size: 0.9em;
}

.badge {
  display: inline-block;
  margin-top: 6px;
  padding: 2px 6px;
  font-size: 0.75em;
  background: #3498db;
  color: white;
  border-radius: 6px;
}
</style>
