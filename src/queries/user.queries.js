export const insertUserQ = `insert into users(user_id,username,email,password) values($1,$2,$3,$4)`
export const getUserByIdQ = `select username,email,user_id,role_id from users where user_id=$1`
export const getUserByEmailQ = `select user_id,email,password from users where email=$1`
