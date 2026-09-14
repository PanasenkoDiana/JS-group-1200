function getCurrentDay() {
  const today = new Date();

  const days = [
    "Воскресенье",
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота"
  ];

  console.log(days[today.getDay()]);
}

getCurrentDay();