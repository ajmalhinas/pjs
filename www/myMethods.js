
function saveSchool(new_school){
  console.log('In saveSchool()...')
  persistence.add(new_school);
  persistence.flush();
}

function saveSchools(schools){
  console.log('saveSchools()...')
  for (var  i = 0; i < schools.length; i++) {
    var school = new School({ school_name: schools[i].school_name , school_id: schools[i].school_id});
    persistence.add(school);
  }
  persistence.flush();
}

function findSchoolById(id, callback) {
  console.log('In findSchoolById(id)')
  School.findBy("school_id", id, function(found_school) {
    console.log(found_school);
    if (callback) {
      callback(found_school)
    }
  });
}

function deleteSchool(id) {
  console.log('In deleteSchool(id)')
  findSchoolById(id, function(remove_school){
      persistence.remove(remove_school);
  });
  persistence.flush();
}

function saveStudents(students) {
  console.log('In saveStudents(students)')
  for ( var i = 0; i < students.length; i++) {
    var student = new Student({ student_name: students[i].student_name, school_name: students[i].school_name});
    persistence.add(student);
  }
  persistence.flush();
}

function findSchoolsByName(name) {
  console.log('In findSchoolsByName(name)')
  var allSchoolsWithName = School.all().filter("school_name", "=", name);
  allSchoolsWithName.list(null, function(results) {
        console.log(results);
  });
}

function findAllStudentsOfSchool(name) {
  console.log('In findAllStudentsOfSchool(name)');
  // Student.findBy("school_name", name, function(some_param){
  var allStudents = Student.all().filter("school_name", '=',  name);
  allStudents.list(null, function(results) {
      console.log(results);
  });
}
