var app = new Vue({
  el: "#app",
  data() {
    return {
      newItem: "",
      currentItem: "",
      todoList: [],
      currentList: [],
    };
  },

  mounted() {
    if (localStorage.todoList) {
      this.todoList = JSON.parse(localStorage.todoList);
      this.currentList = this.todoList;
    }
  },

  watch: {
    todoList: {
      handler(newList) {
        localStorage.todoList = JSON.stringify(newList);
      },

      deep: true,
    },
  },

  methods: {
    addItems() {
      if (this.newItem === "") {
      } else {
        this.todoList.push({
          todoItem: this.newItem,
          isChecked: false,
        });
        this.newItem = "";
      }
    },

    toggleChecked(item) {
      item.isChecked = !item.isChecked;
    },

    editItem(item, index) {
      let edited = this.$refs["editField"][index].innerHTML;
      console.log(item);

      this.todoList[this.todoList.indexOf(item)].todoItem = edited;
    },

    removeItem(item) {
      if (this.currentList == this.activeList) {
        this.todoList.splice(this.todoList.indexOf(item), 1);
        this.currentList = this.activeList;
      } else if (this.currentList == this.completedList) {
        this.todoList.splice(this.todoList.indexOf(item), 1);
        this.currentList = this.completedList;
      } else {
        this.todoList.splice(this.todoList.indexOf(item), 1);
      }
    },

    removeAll() {
      let i = this.todoList.length - 1;

      // this.completedList.length = 0;

      while (i != -1) {
        if (this.todoList[i].isChecked) {
          this.removeItem(this.todoList[i]);
          i--;
        } else {
          i--;
        }
      }
    },
  },

  computed: {
    activeList: function () {
      activeList = this.todoList.filter((item) => {
        return !item.isChecked;
      });

      return activeList;
    },
    completedList: function () {
      completedList = this.todoList.filter((item) => {
        return item.isChecked;
      });

      return completedList;
    },
  },
});
