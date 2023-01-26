# User stories

- A user must be able to register, and have a unique username and a password
- A user must be able to write down a todo and save it to a list in his account. Each todo will have an optional name, a description, an optional due date and the option to be toggled as complete/incomplete
- A user must be able to create different "lists" by clicking on a create list button in the sidebar, and add todos to each list. Any added list will show on the sidebar, clicking on a list filters the todos shown on screen to only the ones in that list.
- There is a default list called general
- There is 2 buttons on the sidebar, on a different section, under the lists. These buttons are called due tomorrow and due this week, and clicking them shows the todos on the current list that are due tomorrow, or this week.
- If a todo was given a due date, and that date has passed, it will be highlighted with a bright red color

# Implementation details

- mobile design, the todos become shorter and the sidebar collapses (or becomes smaller), pressing a button brings it back
- design will be an upgraded clone of https://khunhour.github.io/todo_list/

User {
username: String,
password: String,
lists: [{ type: ObjectId, ref: 'List' }]
}

List{
name: String,
todos: [{ type: ObjectId, ref: 'Todo' }],
}

Todo{
name: String,
description: String, optional
dueDate: Date, optional
completed: Boolean
}
