const seats = [
  {
    id: "sdsd1",
    row: "A",
    order: 0,
  },
  {
    id: "sdsd2",
    row: "A",
    order: 1,
  },
  {
    id: "sdsd2",
    row: "A",
    order: 2,
  },
  {
    id: "sdsd2",
    row: "A",
    order: 4,
  },
  {
    id: "sdsd2",
    row: "A",
    order: 6,
  },
  {
    id: "sdsd4",
    row: "B",
    order: 0,
  },
  {
    id: "sdsd5",
    row: "B",
    order: 1,
  },
  {
    id: "sdsd5",
    row: "B",
    order: 4,
  },
  {
    id: "sdsd1",
    row: "C",
    order: 0,
  },
  {
    id: "sdsd2",
    row: "C",
    order: 1,
  },
  {
    id: "sdsd2",
    row: "C",
    order: 2,
  },
];

const getRow = (row: string) => {
  const rowComponents = seats.filter((seat) => seat.row === row);
  return rowComponents;
};

export { seats, getRow };
