<template>
    <Card
      :image="imageUrl"
      :route="route"
      :title="title"
      :description="description" />
</template>

<script>
import Card from "./Card.vue"
import * as imageExists from "image-exists"

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
  data() {
    return {
      imageUrl: "https://via.placeholder.com/248x140"
    }
  },
  watch: {
    episode() {
      this.checkImage()
    }
  },
  mounted() {
    this.checkImage()
  },
  methods: {
    checkImage() {
      try {
        const imageUrl = "https://videovak.com/jpg/1178x662/rick_and_morty_" + String(this.episode).toLowerCase() + ".jpg"
        imageExists(imageUrl, (exists) => {
          if (exists) {
            this.imageUrl = imageUrl
          }
        })
      } catch (e) {
        console.error(e)
      }
    }
  }
};
</script>