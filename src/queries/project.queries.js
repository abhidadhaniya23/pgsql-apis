export const insertProjectQ = `insert into projects(name,description,start_date,end_date,manager_id) values($1,$2,$3,$4,$5) returning project_id,name,description,start_date,end_date,manager_id`

export const selectProjectQ = ``
export const selectProjectByIdQ = `select * from projects where project_id=$1`
export const selectProjectByPmQ = `select * from projects where manager_id=$1`

export const updateProjectQ = `update projects set name=$1, description=$2`
export const deleteProjectQ = `delete from projects where project_id=$1`
