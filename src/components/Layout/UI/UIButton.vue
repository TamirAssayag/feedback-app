<template>
  <v-btn
    :ripple="false"
    :elevation="elevation || elevation === 0 ? elevation : 1"
    :icon="icon"
    :small="small"
    :disabled="disabled"
    class="ui-button"
    :class="[`ui-button__${color}`]"
    @click="$emit('click')"
    :rounded="rounded"
  >
    <slot />
  </v-btn>
</template>

<script>
export default {
  name: "Button",
  props: {
    color: {
      type: String,
      default: "primary",
    },
    elevation: Number,
    rounded: Boolean,
    disabled: Boolean,
    icon: Boolean,
    small: Boolean,
  },
};
</script>

<style lang="scss">
@import "@/styles/colors.scss";
@import "@/styles/mixins.scss";
.ui-button {
  transition: all ease 0.2s !important;
  @include colorStates;
  min-width: 48px !important;
  height: 30px !important;
  margin: 0.3rem;
  text-transform: capitalize !important;
  border-radius: 10px !important;
  padding: 0 10px !important;
  font-weight: 500 !important;
  letter-spacing: normal !important;

  &:not(.v-btn--icon) {
    border-radius: 0.625rem;
  }
  &:active {
    transform: scale(0.9);
  }
  &[disabled] {
    box-shadow: unset;
  }
  &:hover::before {
    opacity: 0 !important;
  }
}
</style>
