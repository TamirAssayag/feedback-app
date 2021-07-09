<template>
  <div class="card feedback_wrapper">
    <inlineSvg :src="getImageUrl(iconByMode)" />
    <header class="feedback_wrapper__header">
      <h4>
        {{ newMode ? "Create New Feedback" : `Editing '${newFeedback.title}'` }}
      </h4>
    </header>
    <v-form @submit.prevent="handleSaveForm()" class="feedback_form">
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
            maxlength="55"
            background-color="input"
            :error-messages="titleErrors"
            @focus="$v.newFeedback.title.$reset()"
            @blur="$v.newFeedback.title.$touch()"
            v-model="newFeedback.title"
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
            :items="selectCategoryOptions"
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

      <section v-if="editMode">
        <header class="feedback_form__header">
          <p class="feedback_form__header__title">Update Status</p>
          <v-subheader class="feedback_form__header__subhead">
            Change feature state
          </v-subheader>
        </header>
        <div class="feedback_form__input">
          <v-select
            :items="selectStatusOptions"
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
            v-model="newFeedback.status"
            :error-messages="statusErrors"
            @focus="$v.newFeedback.status.$reset()"
            @blur="$v.newFeedback.status.$touch()"
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
            maxlength="250"
            background-color="input"
            v-model="newFeedback.description"
            :error-messages="descriptionErrors"
            @focus="$v.newFeedback.description.$reset()"
            @blur="$v.newFeedback.description.$touch()"
          ></v-textarea>
        </div>
      </section>

      <section class="feedback_form__buttons mt-10">
        <UIButton
          uistyle="feedback"
          type="submit"
          :title="newMode ? 'Add Feedback' : 'Save Changes'"
          :aria-label="newMode ? 'Add Feedback' : 'Save Changes'"
          >{{ newMode ? "Add Feedback" : "Save Changes" }}</UIButton
        >
        <UIButton
          uistyle="cancel"
          title="Cancel"
          aria-label="Canel"
          @click="$emit('onCancel')"
          >Cancel</UIButton
        >
        <UIButton
          uistyle="delete"
          title="Delete"
          aria-label="Delete"
          @click="$emit('onDelete')"
          v-if="editMode"
          >Delete
        </UIButton>
      </section>
    </v-form>
  </div>
</template>

<script>
import UIButton from "../../../Layout/UI/UIButton.vue";
import FormValidations from "@/mixins/FormValidations";
import { validationMixin } from "vuelidate";
import { required } from "vuelidate/lib/validators";
import { mapActions } from "vuex";
import cloneDeep from "lodash/cloneDeep";
import "./Form.scss";

export default {
  components: { UIButton },
  name: "Form",
  mixins: [validationMixin, FormValidations],

  data: () => ({
    isOpen: false,
    selectCategoryOptions: [
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

    selectStatusOptions: [
      {
        text: "Suggestion",
        value: "suggestion",
      },
      {
        text: "Planned",
        value: "planned",
      },
      {
        text: "In-Progress",
        value: "in-progress",
      },
      {
        text: "Live",
        value: "live",
      },
    ],

    newFeedback: {
      id: null,
      title: null,
      category: null,
      upvotes: 0,
      status: "suggestion",
      description: null,
      comments: [],
    },
  }),

  validations: {
    newFeedback: {
      title: { required },
      category: { required },
      description: { required },
      status: { required },
    },
  },

  computed: {
    newMode() {
      return this.checkRoute("new_fb");
    },

    editMode() {
      return this.checkRoute("edit_fb");
    },

    iconByMode() {
      return this.newMode
        ? "shared/icon-new-feedback.svg"
        : "shared/icon-edit-feedback.svg";
    },
  },

  methods: {
    ...mapActions({
      addFeedback: "feedbacks/addFeedback",
      saveFeedbackById: "feedbacks/saveFeedbackById",
    }),
    handleSaveForm() {
      this.$v.$touch();
      if (this.$v.$invalid) return;
      if (this.newMode) {
        this.addFeedback(this.newFeedback);
      } else {
        this.saveFeedbackById({
          id: this.$route.params.id,
          data: this.newFeedback,
        });
        console.log(this.newFeedback.length - 1);
      }
      return this.$emit("onSubmit");
    },
  },

  created() {
    if (!this.newMode) this.newFeedback = cloneDeep(this.feedback);
  },
};
</script>

<style></style>
