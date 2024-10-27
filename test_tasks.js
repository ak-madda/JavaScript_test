const tasks = [
  {
    taskName: "Feature A",
    difficulty: 7,
    hoursRequired: 15,
    taskType: "feature",
    priority: 4,
    dependencies: [],
  },
  {
    taskName: "Bug Fix B",
    difficulty: 5,
    hoursRequired: 10,
    taskType: "bug",
    priority: 5,
    dependencies: [],
  },
  {
    taskName: "Refactor C",
    difficulty: 9,
    hoursRequired: 25,
    taskType: "refactor",
    priority: 3,
    dependencies: ["Bug Fix B"],
  },
  {
    taskName: "Optimization D",
    difficulty: 6,
    hoursRequired: 20,
    taskType: "feature",
    priority: 2,
    dependencies: [],
  },
  {
    taskName: "Upgrade E",
    difficulty: 8,
    hoursRequired: 15,
    taskType: "feature",
    priority: 5,
    dependencies: ["Feature A"],
  },
];

const developers = [
  { name: "Alice", skillLevel: 7, maxHours: 40, preferredTaskType: "feature" },
  { name: "Bob", skillLevel: 9, maxHours: 30, preferredTaskType: "bug" },
  {
    name: "Charlie",
    skillLevel: 5,
    maxHours: 35,
    preferredTaskType: "refactor",
  },
];

function assignTasksWithPriorityAndDependencies(developers, tasks) {
  // Sort tasks by priority (higher priority first)
  tasks.sort((a, b) => b.priority - a.priority);

  // Helper function to check if dependencies are met
  const dependenciesMet = (task, assignedTasks) =>
    task.dependencies.every((dep) => assignedTasks.includes(dep));

  // Initialize developers' assigned tasks and total work hours
  developers.forEach((dev) => {
    dev.assignedTasks = [];
    dev.totalHours = 0;
  });

  // List to keep track of unassigned tasks
  const unassignedTasks = [];

  // Assign tasks to developers
  tasks.forEach((task) => {
    let assigned = false;
    for (const dev of developers) {
      if (
        dev.skillLevel >= task.difficulty &&
        dev.maxHours >= dev.totalHours + task.hoursRequired &&
        dev.preferredTaskType === task.taskType &&
        dependenciesMet(
          task,
          dev.assignedTasks.map((t) => t.taskName)
        )
      ) {
        dev.assignedTasks.push(task);
        dev.totalHours += task.hoursRequired;
        assigned = true;
        break;
      }
    }
    if (!assigned) {
      unassignedTasks.push(task);
    }
  });

  return { developers, unassignedTasks };
}

const result = assignTasksWithPriorityAndDependencies(developers, tasks);
console.log(result);
