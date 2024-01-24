export const insertRoleQ = `insert into roles(name) values($1)`

export const getAllRolesQ = `select * from roles`

export const getRoleByIdQ = `select * from roles where role_id=$1`

export const deleteRoleQ = `delete from roles where role=$1`
