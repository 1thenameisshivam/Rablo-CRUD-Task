"use client";

import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTask, updateTask, deleteTask, toggleTask } from "../lib/taskSlice";
import styles from "./TaskManager.module.scss";

export default function TaskManager() {
  const [newTask, setNewTask] = useState("");
  const [editingTask, setEditingTask] = useState(null);
  const tasks = useSelector((state) => state.tasks);
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      dispatch(addTask(newTask));
      setNewTask("");
    }
  };

  const handleEdit = (task) => {
    setEditingTask({ ...task });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (editingTask.text.trim()) {
      dispatch(updateTask({ id: editingTask.id, text: editingTask.text }));
      setEditingTask(null);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Task Manager</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
          className={styles.input}
        />
        <button type="submit" className={styles.button}>
          Add Task
        </button>
      </form>
      <ul className={styles.taskList}>
        {tasks.map((task) => (
          <li key={task.id} className={styles.taskItem}>
            {editingTask && editingTask.id === task.id ? (
              <form onSubmit={handleUpdate} className={styles.editForm}>
                <input
                  type="text"
                  value={editingTask.text}
                  onChange={(e) =>
                    setEditingTask({ ...editingTask, text: e.target.value })
                  }
                  className={styles.editInput}
                />
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </form>
            ) : (
              <>
                <span
                  className={`${styles.taskText} ${
                    task.completed ? styles.completed : ""
                  }`}
                  onClick={() => dispatch(toggleTask(task.id))}
                >
                  {task.text}
                </span>
                <button
                  onClick={() => handleEdit(task)}
                  className={styles.editButton}
                >
                  Edit
                </button>
                <button
                  onClick={() => dispatch(deleteTask(task.id))}
                  className={styles.deleteButton}
                >
                  Delete
                </button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
