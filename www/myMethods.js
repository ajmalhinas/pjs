
function saveSchool(new_school){
  console.log('In saveSchool()...')
  persistence.add(new_school);
  persistence.flush();
  alert('Saved a school with -\nName: ' + new_school._data.school_name + ', Id: ' + new_school._data.school_id);
}

function saveSchools(schools){
  console.log('saveSchools()...')
  let out_str = 'Saved a new schools with -\n';
  for (var  i = 0; i < schools.length; i++) {
    var school = new School({ school_name: schools[i].school_name , school_id: schools[i].school_id});
    persistence.add(school);
    out_str += 'Name: ' + schools[i].school_name + ", Id: " + schools[i].school_id + "\n"
  }
  alert(out_str);
  persistence.flush();
}

function findSchoolById(id, callback) {
  console.log('In findSchoolById(id)')
  School.findBy("school_id", id, function(found_school) {
    console.log(found_school);

    if (callback) {
      callback(found_school)
    } else {
      alert("Found a school with -\nName: " + found_school._data.school_name + ", id: " + found_school._data.school_id);
    }
  });
}

function deleteSchool(id) {
  console.log('In deleteSchool(id)')
  findSchoolById(id, function(remove_school){
      persistence.remove(remove_school);
      alert('Removed a school with -\nName: ' + remove_school._data.school_name + " id: " + remove_school._data.school_id);
  });
  persistence.flush();
}

function saveStudents(students) {
  console.log('In saveStudents(students)')
  let out_str = "Saved students with -\n"
  for ( var i = 0; i < students.length; i++) {
    var student = new Student({ student_name: students[i].student_name, school_name: students[i].school_name});
    persistence.add(student);
    out_str += "Name: " + students[i].student_name + ", School: " + students[i].school_name + "\n";
  }
  alert(out_str);
  persistence.flush();
}

function findSchoolsByName(name) {
  console.log('In findSchoolsByName(name)')
  let out_str = "Finding all schools with name: " + name + " - \n";
  var allSchoolsWithName = School.all().filter("school_name", "=", name);
  allSchoolsWithName.list(null, function(results) {
     for(let i = 0; i < results.length; i++) {
       out_str += "school_name: " + results[i]._data.school_name + ", school_id: " + results[i]._data.school_id + "\n";
     }
     alert(out_str);
  });
}

function findAllStudentsOfSchool(name) {
  console.log('In findAllStudentsOfSchool(name)');
  // Student.findBy("school_name", name, function(some_param){
  var allStudents = Student.all().filter("school_name", '=',  name);
  let out_str = "Finding all students studying at school: " + name + "\n";
  allStudents.list(null, function(results) {
    for(let i = 0; i < results.length; i++) {
      out_str += "student_name: " + results[i]._data.student_name + "\n";
    }
    alert(out_str);
  });
}
