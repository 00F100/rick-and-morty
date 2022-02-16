<template>
    <Card
      :image="image"
      :route="route"
      :title="title"
      :description="description" />
</template>

<script>
import Card from "./Card.vue"

export default {
  name: "CharacterCard",
  components: {
    Card
  },
  props: [
    "image",
    "episode",
    "route",
    "title",
    "description"
  ]
};
</script>