import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { MdOutlineClose } from 'react-icons/md';
import { v4 as uuid } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { addTodo, updateTodo } from '../slices/todoSlice';
import { getClasses } from '../utils/getClasses';
import styles from '../styles/modules/modal.module.scss';
import stylesColor from '../styles/modules/button.module.scss';
import Button from './Button';

const dropIn = {
  hidden: {
    opacity: 0,
    transform: 'scale(0.9)',
  },
  visible: {
    transform: 'scale(1)',
    opacity: 1,
    transition: {
      duration: 0.1,
      type: 'spring',
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    transform: 'scale(0.9)',
    opacity: 0,
  },
};

function TodoModal({ type, modalOpen, setModalOpen, todo }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState('incomplete');
  const [color, setColor] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === 'update' && todo) {
      setTitle(todo.title);
      setStatus(todo.status);
      setColor(todo.color);
    } else {
      setTitle('');
      setStatus('incomplete');
      setColor('');
    }
  }, [type, todo, modalOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title === '') {
      toast.error('Please enter a title');
      return;
    }
    if (color === '') {
      toast.error('Please choose a color');
      return;
    }
    if (title && status && color) {
      if (type === 'add') {
        dispatch(
          addTodo({
            id: uuid(),
            title,
            status,
            color,
            time: new Date().toLocaleString(),
          })
        );
        toast.success('Task Added Successfuly');
        setTitle('');
        setColor('');
        setModalOpen(false);
      }
      if (type === 'update') {
        if (
          todo.title !== title ||
          todo.status !== status ||
          todo.color !== color
        ) {
          dispatch(
            updateTodo({
              ...todo,
              title,
              status,
              color,
            })
          );
          setModalOpen(false);
        } else {
          toast.error('No Changes Made');
        }
      }
    } else {
      toast.error("Title Shouldn't Be Empty");
    }
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setTitle('');
    setColor('');
  };

  return (
    <AnimatePresence>
      {modalOpen && (
        <motion.div
          className={styles.wrapper}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className={styles.container}
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              className={styles.closeButton}
              onKeyDown={() => setModalOpen(false)}
              onClick={() => setModalOpen(false)}
              role="button"
              tabIndex={0}
              // animation
              initial={{ top: 40, opacity: 0 }}
              animate={{ top: -10, opacity: 1 }}
              exit={{ top: 40, opacity: 0 }}
            >
              <MdOutlineClose />
            </motion.div>

            <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
              <h1 className={styles.formTitle}>
                {type === 'add' ? 'Add' : 'Update'} TODO
              </h1>
              <label htmlFor="title">
                Title
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </label>
              <label htmlFor="type">
                Status
                <select
                  id="type"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                >
                  <option value="incomplete">Incomplete</option>
                  <option value="complete">Completed</option>
                </select>
              </label>
              <div className={stylesColor.center}>
                <Button
                  variant="color1"
                  onClick={() => setColor('color1')}
                  className={getClasses([
                    stylesColor.button,
                    stylesColor[`button--color-1`],
                    color === 'color1' ? stylesColor[`button--selected`] : '',
                  ])}
                >
                  {' '}
                </Button>
                <Button
                  variant="color2"
                  onClick={() => setColor('color2')}
                  className={getClasses([
                    stylesColor.button,
                    stylesColor[`button--color-2`],
                    color === 'color2' ? stylesColor[`button--selected`] : '',
                  ])}
                >
                  {' '}
                </Button>
                <Button
                  variant="color3"
                  onClick={() => setColor('color3')}
                  className={getClasses([
                    stylesColor.button,
                    stylesColor[`button--color-3`],
                    color === 'color3' ? stylesColor[`button--selected`] : '',
                  ])}
                >
                  {' '}
                </Button>
                <Button
                  variant="color4"
                  onClick={() => setColor('color4')}
                  className={getClasses([
                    stylesColor.button,
                    stylesColor[`button--color-4`],
                    color === 'color4' ? stylesColor[`button--selected`] : '',
                  ])}
                >
                  {' '}
                </Button>
                <Button
                  variant="color5"
                  onClick={() => setColor('color5')}
                  className={getClasses([
                    stylesColor.button,
                    stylesColor[`button--color-5`],
                    color === 'color5' ? stylesColor[`button--selected`] : '',
                  ])}
                >
                  {' '}
                </Button>
              </div>
              <div className={styles.buttonContainer}>
                <Button type="submit" variant="primary">
                  {type === 'add' ? 'Add Task' : 'Update Task'}
                </Button>
                <Button variant="secondary" onClick={() => handleCloseModal()}>
                  Cancel
                </Button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default TodoModal;
