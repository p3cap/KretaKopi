<script setup>

import { computed, ref } from "vue";
import { getData } from "@/data/data";
import { translateKey as t } from "@/data/translate";

const omissions = ref(getData("omissions") ?? []);

const justifiedCount = computed(() =>
  omissions.value.filter(o => o.is_justified).length
);

const unjustifiedCount = computed(() =>
  omissions.value.filter(o => !o.is_justified).length
);

</script>

<template>
  <div class="stats">
    <div class="stat justified">
      <span class="number">{{ justifiedCount }}</span>
      <span class="label">{{ t("justified") }}</span>
    </div>

    <div class="stat unjustified">
      <span class="number">{{ unjustifiedCount }}</span>
      <span class="label">{{ t("unjustified") }}</span>
    </div>
  </div>
</template>




<!-- 


Guys, legyen központi css rendszer >:(


-->

<style scoped>
.stats {
  display: flex;
  gap: 16px;
  margin-top: 1rem;
}

.stat {
  flex: 1;
  padding: 14px;
  border-radius: 12px;
  text-align: center;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 10px;

}

.number {
  display: block;
  font-size: 1.8rem;
}

.label {
  font-size: 0.9rem;
  opacity: 0.8;
}

.justified {
  background: var(--Bright-Snow);
  color: green;
}

.unjustified {
  background: var(--Bright-Snow);
  color: var(--Bright-red);
}
</style>
