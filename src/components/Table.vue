<script lang="ts">
import type Column from "@/types/Column"
import ColumnType from "@/enum/ColumnType"
import { computed, defineComponent, type PropType } from "vue"

export default defineComponent({
    name: "Table",
    props: {
        columns: {
            required: true,
            type: Array as PropType<Column[]>
        },
        rows: {
            required: true,
            type: Array as PropType<any[]>
        },
        defaultSorting: {
            required: false,
            type: String
        }
    },
    setup(props) {
        const orderedRows = computed(() => {
            if (!!props.defaultSorting) {
                return [...props.rows].sort((a, b) => {
                        return a[props.defaultSorting!] < b[props.defaultSorting!] ? 1 : -1
                    })
            } else {
                return [...props.rows]
            }
        })

        const columnType = ColumnType

        return { orderedRows, columnType }
    }
})
</script>

<template>
  <table class="table">
    <thead>
      <th v-for="col in columns" :key="col.title">{{ col.title }}</th>
    </thead>
    <tbody>
        <tr v-for="row in orderedRows" :key="row.id">
            <td v-for="col in columns" :key="col.name">
                <div v-if="col.type === columnType.Text">                
                    {{row[col.name]}}
                </div>
                <div v-if="col.type === columnType.Link">                
                    <a v-bind:href="row[col.name]">{{row[col.name]}}</a>
                </div>
            </td>
        </tr>
    </tbody>
  </table>
</template>

<style>

.table {
  border-collapse: collapse;
}

.table td, .table th {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
  font-weight: bold;
}

.table tr:nth-child(even){background-color: #f2f2f2;}

.table tr:hover {background-color: #ddd;}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #04AA6D;
  color: white;
}
</style>