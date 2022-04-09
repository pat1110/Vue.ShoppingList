<template>
  <div id="shopping-list-table"><input type="text" placeholder="Filter by name" v-model="filter" />
  
    <table>
      <thead>
      <tr>
          <th v-on:click="sort('name')">Name <span v-if="currentSort==='name'">▿</span></th>
          <!--<th>Filter</th>-->
        </tr>
      </thead>
      <tbody>
        <tr v-for="list in filteredLists" :key="list.id">
          <td>{{ list.name }}</td>
          <!--<td>{{ list.nameFilter }}</td>
          <td>{{ list.storeFilter }}</td>
          <td>{{ list.minPriceFilter }}</td>
          <td>{{ list.maxPriceFilter }}</td>
          <td>{{ list.dateFromFilter }}</td>
          <td>{{ list.dateToFilter }}</td>-->
          <td>
            <button id="edit" v-on:click="$emit('edit:list', list.id)">Edit</button>
            <button id="delete" v-on:click="$emit('delete:list', list.id)">Delete</button>
            <button id="show" v-on:click="$emit('show:list', list.id)">Show</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="lists.length < 1" class="empty-table">No entries</p>
  </div>
</template>

<script>
export default {
  name: 'shopping-list-table',
  props: {
    lists: Array,
  },
  data() {
    return {
      currentSort:'',
      currentSortDir:'',
      filter: ''
    }
  },
  methods: {
    sort: function(s) {
      //if s == current sort, reverse
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    }
  },
  computed: {
    filteredLists() {
      let filtered = this.lists.filter(list => {
        const name = list.name.toString().toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        
        return name.includes(searchTerm);
      });

      return filtered.sort((a,b) => {
      let modifier = 1;
      if(this.currentSortDir === 'desc') modifier = -1;
      if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
      if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
      return 0;
    });

    }
  }
}
</script>

<style scoped>
  thead {
    font-weight: bold;
    border-bottom: 2px solid silver;
  }
  button {
    margin: 0.25rem 0.25rem 0 0;
  }
  button#edit {
    background-color: DarkOrange;
    border-color: DarkGoldenRod
  }
  button#delete {
    background-color: Red;
    border-color: FireBrick
  }
  .empty-table {
    font-weight: bold;
    text-align: center;
  }
</style>