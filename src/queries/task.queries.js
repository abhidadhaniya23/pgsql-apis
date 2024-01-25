export const insertTaskQ = `insert into tasks(name,description,due_date,priority,status,project_id,assignee_id) values($1,$2,$3,$4,$5,$6,$7)`
export const selectTaskQ = ``
export const updateTaskQ = ``
export const deleteTaskQ = ``

export const getAssignedTasksByPmQ = `
select
	t.name as task_name,
	t.description as task_description,
	due_date,
	status,
	priority,
	t.project_id,
	manager_id,
	projects.name as project_name
from tasks as t
join
	projects on t.project_id=projects.project_id
where manager_id=$1
`

export const getAssignedTasksToDeveloperQ = `
SELECT
  tasks.name AS task_name,
  tasks.description,
  due_date,
  priority,
  status,
  projects.name AS project_name,
  users.user_id AS assignee_id,
  users.username AS assignee_username
from tasks
JOIN
  users ON tasks.assignee_id = users.user_id
JOIN
  projects ON tasks.project_id = projects.project_id
WHERE
  users.user_id=$1;
`
