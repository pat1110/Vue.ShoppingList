<template>
  <div class="homeLists">
    <h1>Shopping-Lists-Table</h1>
    <shopping-list-form v-on:add:list="addList" v-on:update="updateList" v-bind:lists="lists"/>
    <router-link :to="{name: 'NewList'}">
      <button>New</button>
    </router-link>
    <shopping-lists-table v-bind:lists="lists" v-on:delete:list="deleteList" v-on:edit:list="editList" v-on:show:list="showList" />
  </div>
</template>

<script>
// @ is an alias to /src
import ShoppingListsTable from "@/components/ShoppingListsTable.vue";
import ShoppingListForm from "@/components/ShoppingListForm.vue";

export default {
  name: "HomeLists",
  components: {
    ShoppingListsTable,
    ShoppingListForm
  },  
  created() { // Life-Cycle Hook
    this.lists = JSON.parse(localStorage.getItem('lists') || '[]')
  },
  data() {
    return {
      lists: [
        {
          id: 0,
          name: 'Alles von Netto',
          statusFilter: '',
          nameFilter: '',
          storeFilter: 'Netto',
          minPriceFilter: 0,
          maxPriceFilter: 100,
          dateFromFilter: '01.01.1900',
          dateToFilter: '01.01.2100',
        },
        {
          id: 1,
          name: 'Alles aktive',
          statusFilter: 'active',
          nameFilter: '',
          storeFilter: '',
          minPriceFilter: 0,
          maxPriceFilter: 100,
          dateFromFilter: '01.01.1900',
          dateToFilter: '01.01.2100',
        },
        {
          id: 2,
          name: 'Alles von Aldi und besorgt',
          statusFilter: 'provided',
          nameFilter: '',
          storeFilter: 'Aldi',
          minPriceFilter: 0,
          maxPriceFilter: 100,
          dateFromFilter: '01.01.1900',
          dateToFilter: '01.01.2100',
        },
      ],
    }
  },
  methods: {
    saveListsToLocalStorage() {
      localStorage.setItem('lists', JSON.stringify(this.lists))
    },
    addList(list) {
      const lastId =
      this.lists.length > 0
        ? this.lists[this.lists.length - 1].id
        : 0;
      const id = lastId + 1;
      const newList = { ...list, id };
      this.lists = [...this.lists, newList]

      this.saveListsToLocalStorage()
      if(this.$route.name === 'NewList') {
        this.$router.push({name: 'HomeLists'})
      }
    },
    editList(id) {
      this.$router.push({name: 'EditList', params: { loi: id } })
    },
    showList(id) {
      this.$router.push({name: 'ShowList', params: { loi: id } })
    },
    updateList({list, loi}) {
      const id = loi
      this.lists = this.lists.filter(
        l => l.id !== id
      )
      
      const newList = { ...list, id };
      this.lists.push(newList)

      this.saveListsToLocalStorage()
      this.$router.push({name: 'HomeLists'})
    },
    deleteList(id) {
      this.lists = this.lists.filter(
        l => l.id !== id
      )
      this.saveListsToLocalStorage()
    }
  }
}
</script>
