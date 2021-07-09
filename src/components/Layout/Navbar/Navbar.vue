<template>
  <nav
    class="navbar--spacer"
    :class="[
      color ? `navbar__bg--${color}` : null,
      {
        'navbar--elevated': elevated,
        'navbar--border': border,
        'navbar--absolute': absolute,
        'navbar--not-sticky': notSticky,
        'navbar--dense': dense || !!hasMaxHeight,
        'navbar--custom-height': !!hasMaxHeight,
      },
    ]"
    :style="[
      hasZIndex && { '--z-index': zIndex },
      hasMaxHeight && { '--nav-height': maxHeightProp },
      stickyTopDistance && { '--sticky-height': -stickyTopDistance + 'px' },
    ]"
  >
    <div class="navbar__navigation" ref="wrapper">
      <!-- Back action -->
      <template v-if="!hasBackSlot">
        <button
          v-if="!hideBack"
          :class="[
            `navbar__icon navbar__icon--back `,
            { 'navbar__icon--with-slot': hasBackTextSlot },
          ]"
          @click="$emit('onBack')"
          aria-label="Go Back"
          title="Go Back"
        >
          <InlineSvg
            :src="getImageUrl('shared/icon-arrow-left.svg')"
            aria-label="Go Back Arrow"
            :class="`svg svg__${backColor}`"
          />
          <slot name="back-text" v-if="hasBackTextSlot" />
          <div :class="`navbar__icon__text navbar__icon__${backColor}`" v-else>
            Go Back
          </div>
          <!-- :stroke="iconsColor" -->
        </button>
        <!-- <div v-else class="navbar__icon navbar__icon--hidden" /> -->
      </template>

      <!-- Back slot -->
      <div v-else class="navbar__icon navbar__icon--slot">
        <slot name="back" />
      </div>

      <!-- Middle section -->
      <div class="navbar__navigation--middle">
        <slot />
      </div>

      <!-- Action slot -->
      <div v-if="hasActionSlot" class="navbar__icon navbar__icon--slot">
        <slot name="action" />
      </div>
    </div>

    <!-- Extension slot -->
    <!-- <v-scroll-y-transition appear> -->
    <div v-if="hasExtensionSlot" class="navbar__extension">
      <slot name="extension" />
    </div>
    <!-- </v-scroll-y-transition> -->
  </nav>
</template>

<script>
import "./Navbar.scss";
export default {
  name: "Navbar",
  props: {
    /* Default as #FBFAF8, available colors: white, transparent */
    color: String,

    backColor: String,

    /* Remove paddings from buttons */
    dense: Boolean,

    /* Determains max height for the navbar, Also applies dense prop by default */
    maxHeight: [Number, String],

    /* Changes z-index, default is 9 */
    zIndex: Number,

    /* Applies a border to the navbar container */
    border: Boolean,

    /* Applies box shadow to the navbar container */
    elevated: Boolean,

    /* Hides Back button */
    hideBack: Boolean,

    /* Hides Action button */
    hideAction: Boolean,

    /* Sets the navbar to position absolute (default: sticky) */
    absolute: Boolean,

    /* Remove 'poisition' property from navbar container */
    notSticky: Boolean,

    /* Applies stickiness to sticky extension on scroll */
    stickyExtension: Boolean,

    /* Changes icons color, default to $color-dark */
    iconsColor: {
      type: String,
      default: "#1F1F1F",
    },
  },

  data: () => ({
    stickyTopDistance: 0,
  }),

  computed: {
    hasZIndex: {
      cache: false,
      get() {
        return this.zIndex !== null || this.zIndex === 0;
      },
    },
    hasMaxHeight: {
      cache: false,
      get() {
        return (
          !!this.maxHeight && (this.maxHeight !== null || this.maxHeight === 0)
        );
      },
    },
    maxHeightProp: {
      cache: false,
      get() {
        return /^\d+$/.test(this.maxHeight)
          ? this.maxHeight + "px"
          : this.maxHeight;
      },
    },
    hasBackSlot: {
      cache: false,
      get() {
        return !!this.$slots.back;
      },
    },
    hasBackTextSlot: {
      cache: false,
      get() {
        return !!this.$slots?.["back-text"];
      },
    },
    hasActionSlot: {
      cache: false,
      get() {
        return !!this.$slots.action;
      },
    },
    hasDefaultSlot: {
      cache: false,
      get() {
        return !!this.$slots.default;
      },
    },
    hasExtensionSlot: {
      cache: false,
      get() {
        return !!this.$slots.extension;
      },
    },
  },

  mounted() {
    if (this.stickyExtension) this.setSticky();
  },
  updated() {
    if (this.stickyExtension) this.setSticky();
  },

  methods: {
    setSticky() {
      this.stickyTopDistance = this.$refs.wrapper.offsetHeight;
    },
  },
};
</script>
