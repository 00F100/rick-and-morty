<template>
  <q-card class="character-card" @click="$router.push(route)">
      <q-card-section>
        <div class="row">
          <div class="col">
            <img :src="image" class="character-image" />
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="name">{{ title }}</p>
            <small>{{ description }}</small>
          </div>
          <div class="col-3 icon-block" v-if="alive || dead || unknown">
            <div class="row">
              <div class="col-12">
                <q-icon name="emoji_people" class="float-right" v-if="alive" />
                <q-icon name="portrait" class="float-right" v-if="dead" />
                <q-icon name="help_outline" class="float-right" v-if="unknown" />
              </div>
              <div class="col-12">
                <small class="float-right state" v-if="alive">{{ $t('alive') }}</small>
                <small class="float-right state" v-if="dead">{{ $t('in memoriam') }}</small>
                <small class="float-right state" v-if="unknown">{{ $t('unknown') }}</small>
              </div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>
</template>

<script>
export default {
  name: "EpisodeCard",
  props: [
    "alive",
    "dead",
    "unknown",
    "image",
    "route",
    "title",
    "description",
  ]
};
</script>

<style scoped lang="scss">
@import '../styles/quasar.variables.sass';
.character-card {
  cursor: pointer;
  margin: 10px;
  min-height: 255px;
}
.image-block {
  text-align: center;
}
.character-image {
  width: 100%;
}
.q-card__section {
  padding: 16px 16px 10px 16px;
}
.name {
  margin: 0;
  font-size: 1.3rem;
}
.icon-block {
  margin-top: 8px;
}
</style>