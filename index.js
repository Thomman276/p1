/**
 * AuraTask - Simple Task Manager Application Logic
 * Implements local storage persistence, smooth transition states,
 * and responsive UI statistics updates.
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- DOM Elements ---
  const taskInput = document.getElementById('taskInput');
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskList = document.getElementById('taskList');
  const taskCounter = document.getElementById('taskCounter');
  const progressBarFill = document.getElementById('progressBarFill');
  const emptyState = document.getElementById('emptyState');

  // --- State Initialization ---
  let tasks = [];

  // Load tasks from localStorage
  const loadTasks = () => {
    try {
      const storedTasks = localStorage.getItem('auratasks');
      tasks = storedTasks ? JSON.parse(storedTasks) : [];
    } catch (e) {
      console.error('Error reading from localStorage', e);
      tasks = [];
    }
  };

  // Save tasks to localStorage
  const saveTasks = () => {
    try {
      localStorage.setItem('auratasks', JSON.stringify(tasks));
    } catch (e) {
      console.error('Error saving to localStorage', e);
    }
  };

  // --- UI Operations & Render Helpers ---

  // Update overall progress bar & stats label
  const updateStats = () => {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;

    // Update Counter Text
    taskCounter.textContent = `${completed} of ${total} completed`;

    // Update Progress Bar
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);
    progressBarFill.style.width = `${percentage}%`;

    // Toggle Empty State Visibility
    if (total === 0) {
      emptyState.classList.remove('hidden');
    } else {
      emptyState.classList.add('hidden');
    }
  };

  // Create & return a task DOM element with event listeners
  const createTaskDOMElement = (task) => {
    const li = document.createElement('li');
    li.className = `task-item${task.completed ? ' completed' : ''}`;
    li.dataset.id = task.id;

    // Build subcomponents
    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'task-content-wrapper';

    // Complete Button
    const checkboxBtn = document.createElement('button');
    checkboxBtn.className = 'checkbox-btn';
    checkboxBtn.setAttribute('aria-label', task.completed ? 'Mark task as active' : 'Complete task');
    checkboxBtn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="20 6 9 17 4 12"></polyline>
      </svg>
    `;

    // Task text
    const textSpan = document.createElement('span');
    textSpan.className = 'task-text';
    textSpan.textContent = task.text;

    contentWrapper.appendChild(checkboxBtn);
    contentWrapper.appendChild(textSpan);

    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.setAttribute('aria-label', 'Delete task');
    deleteBtn.innerHTML = `
      <svg class="delete-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
      </svg>
    `;

    li.appendChild(contentWrapper);
    li.appendChild(deleteBtn);

    // Toggle Complete Logic
    checkboxBtn.addEventListener('click', () => {
      task.completed = !task.completed;
      li.classList.toggle('completed', task.completed);
      checkboxBtn.setAttribute('aria-label', task.completed ? 'Mark task as active' : 'Complete task');
      saveTasks();
      updateStats();
    });

    // Delete Task Logic (includes deletion slide out animation)
    deleteBtn.addEventListener('click', () => {
      li.classList.add('removing');
      
      // Wait for slideOut keyframe animation to complete
      const handleTransitionEnd = () => {
        li.removeEventListener('animationend', handleTransitionEnd);
        li.remove();
        
        // Remove from memory
        tasks = tasks.filter(t => t.id !== task.id);
        saveTasks();
        updateStats();
      };
      
      li.addEventListener('animationend', handleTransitionEnd);
      // Fallback in case animation is skipped or fails
      setTimeout(() => {
        if (document.body.contains(li)) {
          handleTransitionEnd();
        }
      }, 400);
    });

    return li;
  };

  // Add a new task to lists and state
  const addNewTask = () => {
    const text = taskInput.value.trim();

    if (!text) {
      // Empty input visual validation feedback
      taskInput.classList.add('shake');
      taskInput.focus();
      
      // Remove shake class after animation completes so it can be re-triggered
      taskInput.addEventListener('animationend', () => {
        taskInput.classList.remove('shake');
      }, { once: true });
      return;
    }

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false
    };

    tasks.push(newTask);
    saveTasks();

    const taskElement = createTaskDOMElement(newTask);
    taskList.appendChild(taskElement);

    taskInput.value = '';
    taskInput.focus();
    updateStats();
  };

  // --- Event Listeners ---
  addTaskBtn.addEventListener('click', addNewTask);

  taskInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      addNewTask();
    }
  });

  // --- Initial Setup Flow ---
  loadTasks();
  tasks.forEach(task => {
    const taskElement = createTaskDOMElement(task);
    taskList.appendChild(taskElement);
  });
  updateStats();
});
