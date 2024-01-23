export const insertUserQ = `insert into users(id,name,email,password) values($1,$2,$3,$4)`
export const getUserByIdQ = `select name,email,id from users where id=$1`
export const getUserByEmailQ = `select id,email,password from users where email=$1`
