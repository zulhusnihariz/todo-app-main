var app = new Vue({
  el: "#app",
  data() {
    return {
      newItem: "",
      editedItem: "",
      todoList: [],
      checkList: [],
    };
  },

  mounted() {
    if (localStorage.todoList) {
      this.todoList = JSON.parse(localStorage.todoList);
    }
  },

  watch: {
    todoList: {
      handler(newList) {
        console.log("localStorage updated");
        localStorage.todoList = JSON.stringify(newList);
      },

      deep: true,
    },

    checkList: {
      handler(newList) {
        localStorage.checkList = JSON.stringify(newList);
      },
    },
  },

  methods: {
    addItems() {
      if (this.newItem === "") {
      } else {
        console.log("Enter Key pressed. New item added");
        this.todoList.push({
          todoItem: this.newItem,
          isChecked: false,
        });

        this.newItem = "";

        this.checklistUpdate;
      }
    },

    toggleChecked(item, index) {
      let selectedItem = this.todoList[index].todoItem;
      let itemExists = this.checkList.includes(selectedItem);

      item.isChecked = !item.isChecked;
    },

    editItem(index) {
      let edited = this.$refs["editField"][index].innerHTML;
      this.todoList[index].todoItem = edited;
      console.log("Value in localStorage updated");
    },

    removeItem(index) {
      console.log("Delete button clicked");

      console.log(this.todoList.splice(index, 1)); // why this line work?

      console.log("Item removed");
    },
  },
  computed: {
    filteredList: function () {
      return this.todoList.filter((item) => {
        return !item.isChecked;
      });
    },
  },
});
