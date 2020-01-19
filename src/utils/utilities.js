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
const dateToday = dateNow.toLocaleString("pt-BR");
const formatForDB = date => {
  date = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  // return `${date[2]}-${date[1]}-${date[0]}`
  return date.split(" ")[0]
};
const DateFormatDB = (date, time = false, standart = false) => {
  if (standart === true) {
    standart = new Date(date.toLocaleDateString());
    date = `${standart.getFullYear()}-${standart.getMonth() +
      1}-${standart.getDate()}`;
  }
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

export { dateNow, monthsName, weeks, dateToday, DateFormatDB, formatForDB };
