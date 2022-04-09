<template>
  <div id="shopping-table"><input type="text" placeholder="Filter by name or store" v-model="filter" />
  
    <table>
      <thead>
      <tr>
        <th>
          <select v-model="statusFilter">
            <option>Status</option>
            <option>active</option>
            <option>expired</option>
            <option>provided</option>
            <option>irrelevant</option>
          </select>
        </th>
          <th v-on:click="sort('name')">Name <span v-if="currentSort==='name'">▿</span></th>
          <th v-on:click="sort('store')">Store <span v-if="currentSort==='store'">▿</span></th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in filteredProducts" :key="product.id">
          <td>{{ product.status }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.store }}</td>
          <td>{{ product.price }}</td>
          <td>
            <button id="edit" v-on:click="$emit('edit:product', product.id)">Edit</button>
            <button id="delete" v-on:click="$emit('delete:product', product.id)">Delete</button>
            <button v-if="$route.name === 'ShowList'" id="show" v-on:click="$emit('check:product', product.id)">Check</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="products.length < 1" class="empty-table">No entries</p>
  </div>
</template>

<script>
export default {
  name: 'custom-shopping-list-table',
  props: {
    products: Array,
  },
  data() {
    return {
      currentSort:'',
      currentSortDir:'',
      statusFilter: 'Status',
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
    filteredProducts() {
      const requiredStatus = this.statusFilter !== 'Status'
        ? this.statusFilter : '';
      let filtered = this.products.filter(product => {
        const status = product.status.toString().toLowerCase();
        const name = product.name.toString().toLowerCase();
        const store = product.store.toLowerCase();
        const searchTerm = this.filter.toLowerCase();
        
        return status.includes(requiredStatus) && (name.includes(searchTerm) || store.includes(searchTerm));
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