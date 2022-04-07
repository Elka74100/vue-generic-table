<script lang="ts">
import { defineComponent } from "@vue/runtime-core"
import  getRepos  from "../composables/getRepos"
import Table from "../components/Table.vue"
import type Column from "@/types/Column"
import ColumnType from "@/enum/ColumnType"

export default defineComponent({
  components: { Table },
  setup() {
    const {repos, error, load} = getRepos()
    load()

    const columns: Column[] = [
        { name: "name", title: "Name", type: ColumnType.Text },
        { name: "homepage", title: "Link", type: ColumnType.Link },
        { name: "watchers", title: "Stars", type: ColumnType.Text }
    ]

    return { repos, columns, error }
  }
})
</script>

<template>
  <div class="home">
    <Table v-if="repos.length" :columns="columns" :rows="repos" :defaultSorting="'watchers'"></Table>
    <div v-if="error">{{error}}</div> 
  </div>
</template>
<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
