<template>
    <div class="row">
      <div class="col-12">
        <q-btn v-if="this.$store.state.page.search('/characters/') > -1" @click="$router.go(-1)" color="white" text-color="black" :label="$t('Characters')" icon="arrow_back" />
        <q-btn v-if="this.$store.state.page.search('/episodes/') > -1" @click="$router.go(-1)" color="white" text-color="black" :label="$t('Episodes')" icon="arrow_back" />
        <router-link to="/characters" v-if="this.$store.state.page === '/episodes'">
          <q-btn color="white" text-color="black" :label="$t('Characters')" icon="topic" />
        </router-link>
        <router-link to="/episodes" v-if="this.$store.state.page === '/characters'">
          <q-btn color="white" text-color="black" :label="$t('Episodes')" icon="topic" />
        </router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: "ButtonBackToList"
};
</script>