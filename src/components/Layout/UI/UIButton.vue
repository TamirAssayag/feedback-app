<template>
  <v-btn
    :ripple="false"
    :elevation="elevation || elevation === 0 ? elevation : 1"
    :icon="icon"
    :small="small"
    :disabled="disabled"
    class="ui-button"
    :class="[`ui-button__${color} ui-button__${uistyle}`]"
    @click="$emit('click')"
    @click.stop="$emit('clickStop')"
    :rounded="rounded"
    v-bind="attrs"
    v-on="on"
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
    uistyle: {
      type: String,
    },
    elevation: Number,
    rounded: Boolean,
    disabled: Boolean,
    icon: Boolean,
    small: Boolean,
    attrs: null,
    on: null,
  },
};
</script>

<style lang="scss">
@import "./UIButton.scss";
</style>
