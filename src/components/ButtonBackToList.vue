<template>
    <div class="col-12">
        <q-btn color="white" text-color="black" label="Back to list" @click="changePage" />
    </div>
</template>

<script>
export default {
  name: "ButtonBackToList",
  methods: {
    changePage() {
      this.$store.commit("changePage", {
        page: "list",
      })
    }
  }
};
</script>