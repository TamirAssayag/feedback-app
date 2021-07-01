<template>
  <v-expansion-panels v-model="value" accordion>
    <v-expansion-panel>
      <v-expansion-panel-content>
        <v-textarea
          height="100px"
          auto-grow
          dense
          filled
          required
          background-color="input"
          :placeholder="`Replying to @${username}`"
        >
        </v-textarea>
        <v-icon class="send_reply" style="curesor: pointer"
          >mdi-send-circle-outline</v-icon
        >
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>

<script>
export default {
  data: () => ({}),

  props: {
    username: String,
    value: null,
  },
};
</script>

<style lang="scss"></style>
