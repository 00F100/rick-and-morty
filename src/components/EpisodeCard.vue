<template>
    <Card
      :image="getImage(episode)"
      :route="route"
      :title="title"
      :description="description" />
</template>

<script>
import Card from "./Card.vue"

export default {
  name: "EpisodeCard",
  components: {
    Card
  },
  props: [
    "episode",
    "route",
    "title",
    "description"
  ],
  methods: {
    getImage(index) {
      if(+index < 10) {
        index = "0" + index
      }
      return "https://videovak.com/jpg/1178x662/rick_and_morty_s01e" + index + ".jpg"
    }
  },
};
</script>