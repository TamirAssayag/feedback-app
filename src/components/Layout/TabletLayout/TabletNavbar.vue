<template>
  <div class="tablet__nav" v-if="!checkRoute('roadmap')">
    <div class="tablet__nav__logo">
      <div class="tablet__nav__logo__wrapper">
        <router-link to="/">
          <h4>Frontend Mentor</h4>
          <h5>Feedback Board</h5>
        </router-link>
      </div>
    </div>
    <FilterButtons />
    <Rodamap />
  </div>
</template>

<script>
import FilterButtons from "../../Drawer/FilterButtons/FilterButtons.vue";
import Rodamap from "../../Drawer/Roadmap/Rodamap.vue";
export default {
  components: { FilterButtons, Rodamap },
};
</script>

<style lang="scss">
@import "@/styles/import.scss";
.tablet__nav {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__logo {
    display: flex;
    min-height: 178px;
    width: 223px;
    border-radius: 10px;
    background-image: url("./../../../assets/suggestions/tablet/background-header.png");
    padding: 1.5rem;

    &__wrapper {
      h4 {
        font-size: 20px;
      }

      h5 {
        font-size: 15px;
        font-weight: normal;
      }

      color: white;
      margin-top: auto;
    }
  }

  @include media(">=md") {
    width: 730px;
    margin: 1.5rem auto 0;
  }

  @include media(">=lg") {
    width: unset;
    justify-content: unset;
    flex-direction: column;
    margin: 0 1.8rem;
    gap: 1.5rem;

    .card {
      margin: 0rem !important;
    }

    &__logo {
      width: 255px;
      min-height: 137px;
      background-image: url("./../../../assets/suggestions/desktop/background-header.png");
    }
  }
}
</style>
