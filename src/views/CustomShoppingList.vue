<template>
  <div class="customShoppingList">
    <h1>Custom Shopping List</h1>
    <div v-if="$route.name === 'CustomShoppingList'">
        <h2>Select the desired Shopping List</h2>
        <select v-on:change="listSelected()" v-model="selectedList">
          <option v-for="list in lists" :key="list.id" :value="list.id">
            {{ list.name }}
          </option>
            <!-- Select für Listenauswahl -->
        </select>
    </div>
    <div v-else>
      <h2>{{(this.getList()).name}}</h2>
      <shopping-table v-bind:lists="lists" v-bind:products="products" v-on:check:product="checkProduct" />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import ShoppingTable from "@/components/ShoppingTable.vue";

export default {
    name: "CustomShoppingList",
    components: {
        ShoppingTable,
    },
  data() {
    return {
      selectedList: '',
      products: [],
      lists: []
    }
  },
  created() { // Life-Cycle Hook
    this.lists = JSON.parse(localStorage.getItem('lists') || '[]')
    if(this.$route.name === 'ShowList'){
      this.fetchProducts()
    }    
  },
  watch: {
    '$route' (to, from) {
      if(this.$route.name === 'ShowList' && this.$route.params.loi != null) {
        console.log(to, from)
        this.fetchProducts()
      }
    }
  },
  methods: {
    fetchProducts() {
      this.products = JSON.parse(localStorage.getItem('products') || '[]')
      this.products = this.filterProducts()
      console.log(this.$route.params.loi)
      console.log(this.products)
    },
    listSelected() {
      this.$router.push({name: 'ShowList', params: { loi: this.selectedList } })
    },
    getList() {
      return (this.lists.filter(
              l => l.id == this.$route.params.loi
            ))[0]
    },
    filterProducts() {
      let loi = this.getList()

      let filtered = this.products.filter(product => {
        const status = product.status.toString().toLowerCase();
        const name = product.name.toString().toLowerCase();
        const store = product.store.toLowerCase();
        const price = product.price;
        const quantity = product.quantity;
        const offer = product.offer;
        const provideAsOf = product.provideAsOf;
        const provideBy = product.provideBy;

        console.log(loi)
        return status.includes(loi.statusFilter) && name.match(loi.nameFilter.toLowerCase())
         && store.match(loi.storeFilter.toLowerCase()) &&
          price >= loi.minPriceFilter && price <= loi.maxPriceFilter &&
           quantity >= loi.minQuantityFilter && quantity <= loi.maxQuantityFilter &&
            offer.toString().includes(loi.offerFilter.toString()) &&
             ((new Date(provideBy) >= new Date(loi.dateFromFilter) && new Date(provideBy) <= new Date(loi.dateToFilter)) ||
              (new Date(loi.dateFromFilter) <= new Date(provideAsOf) && new Date(loi.dateToFilter) >= new Date(provideAsOf)))
      });

      return filtered
    },
    checkProduct(id) {
      console.log(id)
      
      let pos = this.products.map(function(e) { return e.id; }).indexOf(id);
      this.products[pos].status = 'provided'
      
      localStorage.setItem('products', JSON.stringify(this.products))
      // status auf provided ändern
    },
  }
}
</script>
