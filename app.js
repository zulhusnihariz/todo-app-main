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
      this.checkList = JSON.parse(localStorage.checkList);
    } else {
      JSON.parse(localStorage.checkList);
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

        this.checkList.push(this.newItem);
        this.newItem = "";
      }
    },

    toggleChecked(item, index) {
      let selectedItem = this.todoList[index].todoItem;
      let itemExists = this.checkList.includes(selectedItem);

      if (!this.todoList[index].isChecked) {
        this.checkList.pop();
      } else {
        this.checkList.push("test");
      }

      item.isChecked = !item.isChecked;
    },

    editItem(index) {
      let edited = this.$refs["editField"][index].innerHTML;
      this.todoList[index].todoItem = edited;
      console.log("Value in localStorage updated");
    },

    removeItem(index) {
      console.log("Delete button clicked");
      console.log(index);

      // Check if item is completed, if false, remove from checkList; else, do nothing
      if (!this.todoList[index].isChecked) {
        this.checkList.pop();
      } else {
      }

      console.log(this.todoList.splice(index, 1)); // why this line work?

      console.log("Item removed");
    },
  },

  computed: {
    filteredList: function () {
      return this.todoList.filter((item) => {
        return item.isChecked;
      });
    },
  },
});
