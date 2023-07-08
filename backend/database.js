const dbConnection = require("./sqlite");
let _db;

dbConnection.getDbConnection()
  .then((db) => {
    init(db);
  })
  .catch((err) => {
    console.log(err);
    throw err;
  });

function init(db) {
  _db = db;
}

const knex_db = require("./db-config");

const dbinitialize = async () => {
  await testBase.resetDatabase(knex_db);
};

const readTeachers = async () => {
  const sql = `SELECT * FROM teacher`;
  try {
    const teachers = await knex_db.raw(sql);
    return teachers;
  } catch (error) {
    throw error;
  }
};

const readTeacherInfo = async (id) => {
  const sql = `SELECT * FROM teacher WHERE id = ?`;
  try {
    const teacher = await knex_db.raw(sql, [id]);
    return teacher;
  } catch (error) {
    throw error;
  }
};

const addTeacher = async (id, name, age) => {
  const sql = `INSERT INTO teacher(id, name, age) VALUES (?, ?, ?)`;
  try {
    await knex_db.raw(sql, [id, name, age]);
    return { status: "Successfully inserted Teacher" };
  } catch (error) {
    throw error;
  }
};

const updateTeacher = async (name, age, id) => {
  const sql = `UPDATE teacher SET name = ?, age = ? WHERE id = ?`;
  try {
    await knex_db.raw(sql, [name, age, id]);
    return { status: "Successfully updated Teacher" };
  } catch (error) {
    throw error;
  }
};

const deleteTeacher = async (id) => {
  const sql = `DELETE FROM teacher WHERE id = ?`;
  try {
    await knex_db.raw(sql, [id]);
    return { status: "Successfully deleted Teacher" };
  } catch (error) {
    throw error;
  }
};

const readStudents = async () => {
  const sql = `SELECT * FROM student`;
  try {
    const students = await knex_db.raw(sql);
    return students;
  } catch (error) {
    throw error;
  }
};

const readStudentInfo = async (id) => {
  const sql = `SELECT * FROM student WHERE id = ?`;
  try {
    const student = await knex_db.raw(sql, [id]);
    return student;
  } catch (error) {
    throw error;
  }
};

const addStudent = async (id, name, age, hometown) => {
  const sql = `INSERT INTO student(id, name, age, hometown) VALUES (?, ?, ?, ?)`;
  try {
    await knex_db.raw(sql, [id, name, age, hometown]);
    return { status: "Successfully inserted student" };
  } catch (error) {
    throw error;
  }
};

const updateStudent = async (name, age, hometown, id) => {
  const sql = `UPDATE student SET name = ?, age = ?, hometown = ? WHERE id = ?`;
  try {
    await knex_db.raw(sql, [name, age, hometown, id]);
    return { status: "Successfully updated student" };
  } catch (error) {
    throw error;
  }
};

const deleteStudent = async (id) => {
  const sql = `DELETE FROM student WHERE id = ?`;
  try {
    await knex_db.raw(sql, [id]);
    return { status: "Successfully deleted student" };
  } catch (error) {
    throw error;
  }
};

module.exports = {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
  dbinitialize,
};
