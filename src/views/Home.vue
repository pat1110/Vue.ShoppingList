<template>
  <div class="home">
    <h1>Shopping-Table</h1>
    <product-form v-on:add:product="addProduct" v-on:update="updateProduct" v-bind:products="products"/>
    <router-link :to="{name: 'NewProduct'}">
      <button>New</button>
    </router-link>
    <shopping-table v-bind:products="products" v-on:delete:product="deleteProduct" v-on:edit:product="editProduct" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShoppingTable from "@/components/ShoppingTable.vue";
import ProductForm from "@/components/ProductForm.vue";

export default {
  name: "Home",
  components: {
    ShoppingTable,
    ProductForm,
  },
  created() { // Life-Cycle Hook
    this.products = JSON.parse(localStorage.getItem('products') || '[]')
  },
  data() {
    return {
      products: [
        {
          id: 0,
          status: 'active',
          name: 'Karotten',
          price: 0.25,
          quantity: 12,
          store: 'Netto',          
          offer: true,
          provideBy: new Date('2021-05-28')
        },
        {
          id: 1,
          status: 'expired',
          name: 'Kartoffeln',
          price: 0.50,
          quantity: 1,
          store: 'Kaufland',
          offer: true,
          provideBy: new Date('2021-05-27')
        },
        {
          id: 2,
          status: 'provided',
          name: 'Bananen',
          price: 0.25,
          quantity: 3,
          store: 'Aldi',
          offer: false,
          provideBy: new Date('2021-05-26')
        },
      ],
    }
  },
  methods: {
    saveProductsToLocalStorage() {
      localStorage.setItem('products', JSON.stringify(this.products))
    },
    newProduct() {
      //this.poi = -1
    },
    addProduct(product) {
      const lastId =
      this.products.length > 0
        ? this.products[this.products.length - 1].id
        : 0;
      const id = lastId + 1;
      const newProduct = { ...product, id };
      this.products = [...this.products, newProduct]

      this.saveProductsToLocalStorage()
      if(this.$route.name === 'NewProduct') {
        this.$router.push({name: 'Home'})
      }
    },
    editProduct(id) {
      this.$router.push({name: 'EditProduct', params: { poi: id } })
    },
    updateProduct({product, poi}) {
      const id = poi
      this.products = this.products.filter(
        p => p.id !== id
      )
      
      const newProduct = { ...product, id };
      this.products.push(newProduct)

      this.saveProductsToLocalStorage()
      this.$router.push({name: 'Home'})
    },
    deleteProduct(id) {
      this.products = this.products.filter(
        product => product.id !== id
      )
      this.saveProductsToLocalStorage()
    }
  }
}
</script>
