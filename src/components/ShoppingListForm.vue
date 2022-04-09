<template>
  <div id="shopping-list-form">
    <h2 v-if="$route.name === 'NewList' || $route.name === 'HomeLists'">Add List</h2>
    <h2 v-else>Edit List</h2>
    <details>
      <summary>Regex-Hinweise</summary>
      <div id="hints">
        <p>Can be applied to the Input-Fields Name and Store.</p>
        <li>Apple -&gt; Must contain Apple</li>
        <li>^Apple.* -&gt; Must begin with Apple (^) and can continue with any character sequence (.*)</li>
        <li>.+apple$ -&gt; Can start with any character, but must start at least with one character (.+) and must end with apple ($)</li>
        <li>(Apple|Pear) -&gt; Must contain Apple or Pear</li>
        <li>Apple[0-9] -&gt; Must contain Apple followed by a digit</li>
        <li>Apfel[^s].* -&gt; Must contain Apple followed by a character, wich is not s, and can continue with any character sequence afterwards ([^s].*)</li>
      </div>
    </details>
    <form v-on:submit.prevent="handleSubmit">
      <label>List Name</label>
      <input type="text" ref="first" :class="{ 'has-error': submitting && invalidName }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.name />
      <h3>Filter</h3>
      <label>Status</label>
      <select v-model="list.statusFilter">
        <option></option>
        <option>active</option>
        <option>expired</option>
        <option>provided</option>
        <option>irrelevant</option>
      </select>
      <label>Name</label>
      <input type="text" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.nameFilter />
      <label>Store</label>
      <input type="text" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.storeFilter />
      <label>minimum Price</label>
      <input type="number" step="0.01" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.minPriceFilter />
      <label>maximum Price</label>
      <input type="number" step="0.01" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.maxPriceFilter />
      <label>minimum Quantity</label>
      <input type="number" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.minQuantityFilter />
      <label>maximum Quantity</label>
      <input type="number" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.maxQuantityFilter />
      <label>Offer</label>
      <select v-model="list.offerFilter">
        <option></option>
        <option>true</option>
        <option>false</option>
      </select>
      <label>valid from</label>
      <input type="date" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.dateFromFilter required />
      <label>expires on</label>
      <input type="date" :class="{ 'has-error': submitting }" v-on:focus="clearStatus" v-on:keypass="clearStatus" v-model=list.dateToFilter required/>
      <button v-if="$route.name === 'EditList'">Save Changes</button>
      <button v-else>Add Shopping List</button>
      <p v-if="error && submitting" class="error-message">
        ❗ Please fill out all required fields with reasonalbe values
      </p>
      <p v-if="success" class="success-message">
        ✅ Shopping List successfully added
      </p>
    </form>
  </div>
</template>

<script>
  export default {
    name: 'shopping-list-form',
    props: {
      lists: Array
    },
    data() {
      return {
        submitting: false,
        error: false,
        success: false,
        loi: -1,
        list: {
          name: '',
          statusFilter: '',
          nameFilter: '',
          storeFilter: '',
          minPriceFilter: 0,
          maxPriceFilter: 100,
          minQuantityFilter: 0,
          maxQuantityFilter: 100,
          offerFilter: '',
          dateFromFilter: new Date().toISOString().slice(0,10),
          dateToFilter: new Date().toISOString().slice(0,10),
        },
      }
    },
    methods: {
      handleSubmit() {
        this.submitting = true
        this.clearStatus()

        if (this.invalidName) {
          this.error = true
          return
        }
        if(this.$route.name === 'EditList') {
          this.$emit('update', {list: this.list, loi: this.loi})
        } else {
          this.$emit('add:list', this.list)
        }
        
        this.$refs.first.focus()

        this.resetList()

        this.submitting = false
        this.error = false
        this.success = true
        
      },
      clearStatus() {
        this.error = false
        this.success = false
      },
      resetList() {
        this.list = {
          name: '',
          statusFilter: '',
          nameFilter: '',
          storeFilter: '',
          minPriceFilter: 0,
          maxPriceFilter: 100,
          minQuantityFilter: 0,
          maxQuantityFilter: 100,
          offerFilter: '',
          dateFromFilter: new Date().toISOString().slice(0,10),
          dateToFilter: new Date().toISOString().slice(0,10),
        }
      }
    },
    computed: {
      invalidName() {
        return this.list.name === ''
      },
    },
    watch: {
      $route(to, from) {
        console.log(to, from)
        
        if(to.name === 'NewList') {
          this.resetList()
        } else if(to.name === 'EditList') {
          const val = to.params.loi
          this.loi = val

          this.list.name = (this.lists.filter(l => l.id == val))[0].name
          this.list.statusFilter = (this.lists.filter(l => l.id == val))[0].statusFilter
          this.list.nameFilter = (this.lists.filter(l => l.id == val))[0].nameFilter
          this.list.storeFilter = (this.lists.filter(l => l.id == val))[0].storeFilter
          this.list.minPriceFilter = (this.lists.filter(l => l.id == val))[0].minPriceFilter
          this.list.maxPriceFilter = (this.lists.filter(l => l.id == val))[0].maxPriceFilter
          this.list.minQuantityFilter = (this.lists.filter(l => l.id == val))[0].minQuantityFilter
          this.list.maxQuantityFilter = (this.lists.filter(l => l.id == val))[0].maxQuantityFilter
          this.list.offerFilter = (this.lists.filter(l => l.id == val))[0].offerFilter
          this.list.dateFromFilter = (this.lists.filter(l => l.id == val))[0].dateFromFilter
          this.list.dateToFilter = (this.lists.filter(l => l.id == val))[0].dateToFilter
        }
      },
    }
  }
</script>

<style scoped>
  form {
    margin-bottom: 2rem;
  }

  div#shopping-list-form {
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

  #hints {
    text-align: left;
    border: 1px solid rgb(204, 204, 204);
    border-radius: 16px;
    padding-left: 3%;
    margin-left: 5%;
    margin-right: 5%;
  }
</style>