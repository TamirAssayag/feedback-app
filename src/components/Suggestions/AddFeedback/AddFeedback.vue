<template>
  <div class="feedback">
    <Navbar :maxHeight="36" notSticky @onBack="goBack()" />
    <div class="card feedback_wrapper">
      <inlineSvg :src="getImageUrl('shared/icon-new-feedback.svg')" />
      <header class="feedback_wrapper__header">
        <h4>Create New Feedback</h4>
      </header>

      <v-form @submit.prevent="handleSaveForm" class="feedback_form">
        <section>
          <header class="feedback_form__header">
            <p class="feedback_form__header__title">Feedback Title</p>
            <v-subheader class="feedback_form__header__subhead">
              Add a short, descriptive headline
            </v-subheader>
          </header>
          <div class="feedback_form__input">
            <v-text-field
              height="48px"
              dense
              filled
              background-color="input"
              v-model="newFeedback.title"
              :error-messages="titleErrors"
              @focus="$v.newFeedback.title.$reset()"
              @blur="$v.newFeedback.title.$touch()"
            ></v-text-field>
          </div>
        </section>

        <section>
          <header class="feedback_form__header">
            <p class="feedback_form__header__title">Category</p>
            <v-subheader class="feedback_form__header__subhead">
              Choose a category for your feedback
            </v-subheader>
          </header>
          <div class="feedback_form__input">
            <v-select
              :items="selectOptions"
              height="48px"
              dense
              filled
              attach
              append-icon="mdi-chevron-down"
              :menu-props="{
                transition: 'scroll-y-transition',
                top: false,
                offsetY: true,
              }"
              background-color="input"
              v-model="newFeedback.category"
              :error-messages="categoryErrors"
              @focus="$v.newFeedback.category.$reset()"
              @blur="$v.newFeedback.category.$touch()"
            >
            </v-select>
          </div>
        </section>

        <section>
          <header class="feedback_form__header">
            <p class="feedback_form__header__title">Feedback Details</p>
            <v-subheader class="feedback_form__header__subhead">
              Include any specific comments on what should be improved, added,
              etc.
            </v-subheader>
          </header>
          <div class="feedback_form__input mt-8">
            <v-textarea
              height="120px"
              no-resize
              dense
              filled
              required
              background-color="input"
              v-model="newFeedback.description"
              :error-messages="descriptionErrors"
              @focus="$v.newFeedback.description.$reset()"
              @blur="$v.newFeedback.description.$touch()"
            ></v-textarea>
          </div>
        </section>

        <section class="feedback_form__buttons mt-10">
          <UIButton uistyle="feedback" type="submit">Add Feedback</UIButton>
          <UIButton uistyle="cancel" @click="goBack()">Cancel</UIButton>
        </section>
      </v-form>
    </div>
  </div>
</template>

<script>
import "./AddFeedback.scss";
import Navbar from "../../Layout/Navbar/Navbar.vue";
import UIButton from "../../Layout/UI/UIButton.vue";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
// import cloneDeep from "lodash/cloneDeep";
import { mapActions } from "vuex";

export default {
  components: { Navbar, UIButton },

  data: () => ({
    mixins: [validationMixin],
    selectOptions: [
      {
        text: "UI",
        value: "UI",
      },
      {
        text: "UX",
        value: "UX",
      },
      {
        text: "Enhancement",
        value: "enhancement",
      },
      {
        text: "Bug",
        value: "bug",
      },
      {
        text: "Feature",
        value: "feature",
      },
    ],
    newFeedback: {
      id: null,
      title: null,
      category: null,
      upvotes: 0,
      status: "suggestion",
      description: null,
    },
  }),

  validations: {
    newFeedback: {
      title: { required },
      category: { required },
      description: { required },
    },
  },

  methods: {
    ...mapActions({
      addFeedback: "feedbacks/addFeedback",
    }),
    handleSaveForm() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      this.addFeedback(this.newFeedback);
      this.$router.push("/");
    },
  },

  computed: {
    titleErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.title;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    categoryErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.category;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
    descriptionErrors() {
      const errors = [];
      const $v = this.$v.newFeedback.description;
      if (!$v.$dirty) {
        return errors;
      } else {
        !$v.required && errors.push("Can't be empty");
      }
      return errors;
    },
  },

  created() {
    this.newFeedback;
  },
};
</script>

<style lang="scss"></style>
