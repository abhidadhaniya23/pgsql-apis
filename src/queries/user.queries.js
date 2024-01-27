export const insertUserQ = `insert into users(user_id,username,email,password) values($1,$2,$3,$4) returning user_id,email,user_id,role_id`
export const getUserByIdQ = `select username,email,user_id,role_id from users where user_id=$1`
export const getUserByEmailQ = `select user_id,email,password,role_id from users where email=$1`
export const getAllUsersQ = `select user_id,username,email,role_id from users`

export const updateUserRoleQ = `update users set role_id=$1 where user_id=$2 returning username,email,user_id,role_id`

export const deleteUserByIdQ = `delete from users where user_id=$1`
