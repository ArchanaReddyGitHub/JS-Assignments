function welcomeNote() {
  alert(
    " welcome to Grade Calculator." +
      "\n Click ok and Please enter all subjects one by one. ",
  );

  let sub1 = parseInt(prompt("Enter subject1 marks"));
  let sub2 = parseInt(prompt("Enter subject2 marks"));
  let sub3 = parseInt(prompt("Enter subject3 marks"));
  let sub4 = parseInt(prompt("Enter subject4 marks"));
  let sub5 = parseInt(prompt("Enter subject5 marks"));
  let singleSubject;

  total = sub1 + sub2 + sub3 + sub4 + sub5;
  avg = total / 5;

  // alert(
  //   "Sub1   : " +
  //     sub1 +
  //     "\nSub2   : " +
  //     sub2 +
  //     "\nSub3   : " +
  //     sub2 +
  //     "\nsub4   : " +
  //     sub4 +
  //     "\nsub5   : " +
  //     sub5 +
  //     "\n\nTotal   : " +
  //     total +
  //     "\n\nAverage   : " +
  //     avg,
  // );

  let grade;
  // Check if the student get <35 in any subject
  if (sub1 < 35 || sub2 < 35 || sub3 < 35 || sub4 < 35 || sub5 < 35) {
    grade = "F (Fail)";
  } else if (avg >= 90) {
    //check if all subjects are >35 marks
    grade = "A+";
  } else if (avg > 80 && avg < 89) {
    grade = "A";
  } else if (avg > 70 && avg < 79) {
    grade = "B";
  } else if (avg > 60 && avg < 69) {
    grade = "C";
  } else if (avg > 50 && avg < 59) {
    grade = "D";
  } else {
    grade = "Just Pass";
  }

  alert(
    "               Result                 " +
      "\n\n\nTotal      : " +
      total +
      "\n\nAverage: " +
      avg +
      "\n\nGrade      : " +
      grade,
  );
}
