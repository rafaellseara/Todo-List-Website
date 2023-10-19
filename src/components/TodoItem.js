import React, { useEffect, useState } from 'react';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast, { CheckmarkIcon } from 'react-hot-toast';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import TodoModal from './TodoModal';
import CheckButton from './CheckButton';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function formatTodoTime(todoTime) {
  const [date, time] = todoTime.split(', ');
  const [day, month, year] = date.split('/');
  const [hour, minute] = time.split(':');
  const hour12 = Number(hour) % 12 || 12;
  const formattedTime = `${Number(hour12)}:${minute} ${
    hour >= 12 ? 'pm' : 'am'
  }`;
  return `${day}/${month}/${year}, ${formattedTime}`;
}

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setChecked] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const hadnleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfuly');
  };
  const hadnleUpdate = () => {
    setUpdateModalOpen(true);
  };

  const formattedTime = formatTodoTime(todo.time);

  const handleCheck = () => {
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.text}>
            <p
              className={getClasses([
                styles.todoText,
                styles[`${todo.color}`],
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>{formattedTime}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={hadnleDelete}
            onKeyDown={hadnleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={hadnleUpdate}
            onKeyDown={hadnleUpdate}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
