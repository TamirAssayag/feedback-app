<template>
  <div class="card roadmap__drawer">
    <header class="roadmap__drawer__card-header">
      <h3>Roadmap</h3>
      <span class="view_link" @click="$router.push('/roadmap')">View</span>
    </header>

    <div class="roadmap__drawer__card__content">
      <ul class="roadmap__list">
        <li
          class="roadmap__list__item"
          v-for="(roadmap, index) in roadmaps"
          :key="roadmap + index"
        >
          <div class="roadmap__indicator"></div>
          <span class="roadmap__name">
            {{ roadmap }}
          </span>
          <span class="roadmap__amount">{{
            displayStatusAmount(roadmap)
          }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import "./Roadmap.scss";
export default {
  data: () => ({
    roadmaps: ["Planned", "In-Progress", "Live"],
  }),

  computed: {},
};
</script>

<style></style>
