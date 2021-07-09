<template>
  <v-fab-transition appear>
    <v-dialog
      v-model="isOpen"
      fullscreen
      persistent
      transition="dialog-bottom-transition"
      no-click-animation
    >
      <div class="feedback">
        <Navbar
          :maxHeight="36"
          notSticky
          @onBack="goHome"
          @keydown.esc="goHome"
        />
        <Form @onDelete="deleteFb" @onCancel="goHome" @onSubmit="goHome" />
      </div>
    </v-dialog>
  </v-fab-transition>
</template>

<script>
import "./AddFeedback.scss";
import Navbar from "../../Layout/Navbar/Navbar.vue";
import Form from "./Form/Form.vue";
import { mapActions } from "vuex";

export default {
  components: { Navbar, Form },

  data: () => ({
    isOpen: true,
  }),

  methods: {
    ...mapActions({
      deleteFeedback: "feedbacks/deleteFeedback",
    }),

    deleteFb() {
      this.deleteFeedback(this.$route.params.id);
      this.isOpen = false;
      setTimeout(() => this.$router.push("/"), 160);
    },
  },

  watch: {
    "$route.name"(name) {
      this.isOpen = name === "edit_fb";
    },
  },

  created() {
    document.querySelector("body").classList.add("modal-open");
    document.querySelector("html").classList.add("modal-open");
  },

  destroyed() {
    document.querySelector("body").classList.remove("modal-open");
    document.querySelector("html").classList.remove("modal-open");
  },
};
</script>

<style lang="scss"></style>
