const App = React.createClass({

  getInitialState: function () {
    return {
      todoList: [],
      temp: []
    }
  },

  addTask: function (event) {
    const todoList = this.state.todoList;
    const newInput = event.target.value;
    if (event.key === 'Enter' && newInput !== '') {
      todoList.push({
        completed: false,
        task: newInput
      });
    }
    this.setState({todoList});
    this.setState({temp: todoList});
  },

  changeHandel: function (index) {
    const todoList = this.state.todoList;
    todoList[index].completed = !todoList[index].completed;
    this.setState({todoList});
    this.setState({temp: todoList});
  },

  deleteTask: function (index) {
    const todoList = this.state.todoList;
    todoList.splice(index, 1);
    this.setState({temp: todoList});
  },

  completedTask: function () {
    let temp = this.state.todoList;
    temp = temp.filter(todo => todo.completed);
    this.setState({temp});
  },

  activeTask: function () {
    let temp = this.state.todoList;
    temp = temp.filter(todo => !todo.completed);
    this.setState({temp});
  },

  allTask: function () {
    this.setState({temp: this.state.todoList});
  },

  render: function () {
    return <div>
      <input type="text" placeholder="What needs to be done?" onKeyPress={this.addTask}/>
      <TaskList onDelete={this.deleteTask} todoList={this.state.temp} onChange={this.changeHandel}/>
      <Type completed={this.completedTask} todoList={this.state.todoList} active={this.activeTask} all={this.allTask}/>
    </div>
  }
});

const TaskList = React.createClass({

  remove: function (index) {
    this.props.onDelete(index);
  },

  change: function (index) {
    this.props.onChange(index)
  },

  render: function () {
    return <div>
      {
        this.props.todoList.map((item, index) => {
          return <div key={index}>
            <input type="checkbox" checked={item.completed} onClick={this.change.bind(this, index)}/>{item.task}
            <button onClick={this.remove.bind(this, index)}> X</button>
          </div>
        })
      }
    </div>
  }
});

const Type = React.createClass({

  render: function () {
    return <div>
      <button>{this.props.todoList.map(todo => todo.completed ? 0 : 1)
        .reduce((a, b) => a + b, 0)} items left
      </button>
      <button onClick={this.props.all}>All</button>
      <button onClick={this.props.active}>Active</button>
      <button onClick={this.props.completed}>Completed</button>
      <button onClick={this.props.active}>Clear completed</button>
    </div>
  }
});

ReactDOM.render(<App />, document.getElementById('container'));
