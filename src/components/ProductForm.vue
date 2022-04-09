<template>
  <div id="product-form">
    <h2 v-if="$route.name === 'NewProduct' || $route.name === 'Home'">Add Product</h2>
    <h2 v-else>Edit Product</h2>
    <form v-on:submit.prevent="handleSubmit">
      <label>Status</label>
      <select v-model="product.status">
        <option>active</option>
        <option>expired</option>
        <option>provided</option>
        <option>irrelevant</option>
      </select>
      <label>Product name</label>
      <input type="text" ref="first" :class="{ 'has-error': submitting && invalidName }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.name />
      <label>Store</label>
      <input type="text" :class="{ 'has-error': submitting && invalidStore }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.store />
      <label>Price</label>
      <input type="number" step="0.01" :class="{ 'has-error': submitting && invalidPrice }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.price />
      <label>Quantity</label>
      <input type="number" :class="{ 'has-error': submitting && invalidQuantity }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.quantity step="1" />
      <label>Offer</label>
      <input type="checkbox" v-model=product.offer />
      <label>Provide as of</label>
      <input type="date" placeholder="1900-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" :class="{ 'has-error': submitting && invalidDate }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.provideAsOf />
      <label>Provide by</label>
      <input type="date" placeholder="1900-01-01" pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" :class="{ 'has-error': submitting && invalidDate }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=product.provideBy />
      <button v-if="$route.name === 'EditProduct'">Save Changes</button>
      <button v-else>Add Product</button>
      <p v-if="error && submitting" class="error-message">
        ❗ Please fill out all required fields with reasonalbe values
      </p>
      <p v-if="success" class="success-message">
        ✅ Product successfully added
      </p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'product-form',
    props: {
      products: Array
    },
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
        poi: -1,
        product: {
          status: 'active',
          name: '',
          store: '',
          price: 0,
          quantity: 1,
          offer: false,
          provideBy: new Date().toISOString().slice(0,10),
          provideAsOf: new Date().toISOString().slice(0,10)
        },
      }
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (this.invalidName || this.invalidStore || this.invalidPrice || this.invalidQuantity || this.invalidDate) {
          this.error = true
          return
        }
        if(this.$route.name === 'EditProduct') {
          this.$emit('update', {product: this.product, poi: this.poi})
        } else {
          this.$emit('add:product', this.product)
        }
        
        this.$refs.first.focus()

        this.resetProduct()

        this.submitting = false
        this.error = false
        this.success = true
        
      },
      clearStatus() {
        this.error = false
        this.success = false
      },
      resetProduct() {
        this.product = {
          status: 'active',
          name: '',
          store: '',
          price: 0,
          quantity: 1,
          offer: false,
          provideBy: new Date().toISOString().slice(0,10),
          provideAsOf: new Date().toISOString().slice(0,10)
        }
      }
    },
    computed: {
      invalidName() {
        return this.product.name === ''
      },
      invalidStore() {
        return this.product.store === ''
      },
      invalidPrice() {
        return this.product.price < 0
      },
      invalidQuantity() {
        return this.product.quantity <= 0
      },
      invalidDate() {
        let today = new Date().toISOString().slice(0, 10)
        console.log(this.product.provideBy, " : ", today, " = ", new Date(this.product.provideBy)>=new Date(today))
        return this.product.provideBy === '' && this.product.provideBy >= Date()-1
      }
    },
    watch: {
      $route(to, from) {
        console.log(to, from)
        
        if(to.name === 'NewProduct') {
          this.resetProduct()
        } else if(to.name === 'EditProduct') {
          const val = to.params.poi
          this.poi = val
          this.product.status = (this.products.filter(p => p.id == val))[0].status
          this.product.name = (this.products.filter(p => p.id == val))[0].name
          this.product.store = (this.products.filter(p => p.id == val))[0].store
          this.product.price = (this.products.filter(p => p.id == val))[0].price
          this.product.offer = (this.products.filter(p => p.id == val))[0].offer
          this.product.provideBy = (this.products.filter(p => p.id == val))[0].provideBy
          this.product.provideAsOf = (this.products.filter(p => p.id == val))[0].provideAsOf
          
        }
      },
    }
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  div#product-form {
    border: 2px solid gray;
    margin-bottom: 2rem;
  }

  [class*='-message'] {
    font-weight: 500;
  }

  .error-message {
    color: #d33c40;
  }

  .success-message {
    color: #32a95d;
  }
</style>