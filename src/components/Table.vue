<script lang="ts">
import type Column from "@/types/Column"
import ColumnType from "@/enum/ColumnType"
import { computed, defineComponent, ref, type PropType } from "vue"

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
        const rows = ref(props.rows)
        if (!!props.defaultSorting) {
            rows.value = rows.value.sort((a, b) => {
                return a[props.defaultSorting!] < b[props.defaultSorting!] ? 1 : -1
            })
        }

        const sortColumn = ref(props.defaultSorting ? props.defaultSorting : '')
        const ascending = ref(props.defaultSorting ? true : false)

        const sort = (col: string) => {
            if (sortColumn.value === col) {
                ascending.value = !ascending.value;
            } else {
                ascending.value = true;
                sortColumn.value = col;
            }

            const sortedRows = rows.value.sort((a, b) => {
                if (a[col] > b[col]) {
                    console.log(1)
                    return ascending.value ? -1 : 1
                } else if (a[col] < b[col]) {
                    console.log(2)
                    return ascending.value ? 1 : -1
                }
                return 0;
            })

            rows.value = sortedRows

        }

        const columnType = ColumnType

        return { rows, columnType, sortColumn, ascending, sort }
    }
})
</script>

<template>
  <table class="table">
    <thead>
        <th v-for="col in columns" :key="col.title" v-on:click="sort(col.name)">
            <div class="arrow" v-if="col.name == sortColumn" v-bind:class="ascending ? 'arrow_up' : 'arrow_down'"></div>
            {{ col.title }}
        </th>
    </thead>
    <tbody>
        <tr v-for="row in rows" :key="row.id">
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

.table th .arrow {
  float: left;
  width: 12px;
  height: 18px;
  background-repeat: no-repeat;
  background-size: contain;
  background-position-y: bottom;
  margin-right: 5px
}

.arrow_up {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/d/d6/Feather-arrows-arrow-up.svg')
}

.arrow_down {
  background-image: url('https://upload.wikimedia.org/wikipedia/commons/5/5e/Feather-arrows-arrow-down.svg')
}
</style>