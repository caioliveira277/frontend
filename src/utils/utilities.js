const dateNow = new Date();
const monthsName = [
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro"
];
const weeks = [
  "Segunda-feira",
  "Terça-feira",
  "Quarta-feira",
  "Quinta-feira",
  "Sexta-feira",
  "Sabado",
  "Domingo"
];
const dateToday = `${dateNow.getDate()}/${dateNow.getMonth() + 1}/${dateNow.getFullYear()}`;

const DateFormatDB = (date, time = false) => {
  const splitDateTime = date.split(" ");
  const splitDate = splitDateTime[0].split("-");

  const setDate = `${splitDate[2]}/${splitDate[1]}/${splitDate[0]}`;

  if (time === true) {
    const splitTime = splitDateTime[1].split(".");
    const setTime = splitTime[0];
    return setDate + " " + setTime;
  }
  return setDate;
};

export { dateNow, monthsName, weeks, dateToday, DateFormatDB };
