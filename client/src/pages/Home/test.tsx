import { useState } from "react";
import { cn } from "../../lib/clsx";
import Map from "./Map";

type User = {
  username: string;
  id: string;
  available: boolean;
  seatName: string;
};

type Seat = {
  available: boolean;
  user?: User;
  name: string;
};

function makeid() {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < 4) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const initializeSeats = () => {
  const seats: Seat[][] = [];
  for (let i = 0; i < 4; i++) {
    const seatRow = [];
    for (let j = 0; j < 4; j++) {
      const seat: Seat = {
        available: true,
        name: makeid(),
      };
      seatRow.push(seat);
    }
    seats.push(seatRow);
  }

  return seats;
};

const Home = () => {
  const [seats, setSeats] = useState(initializeSeats());
  const [users, setUsers] = useState([
    {
      id: makeid(),
      username: "Khoa Truong",
      available: true,
      seatName: "",
    },
    {
      id: makeid(),
      username: "Lamelo Ball",
      available: true,
      seatName: "",
    },
  ]);

  const handleOnDrag = (e: React.DragEvent, user?: User) => {
    if (!user) return;
    e.dataTransfer.setData("user", JSON.stringify(user));
  };

  const handleOnDrop = (e: React.DragEvent) => {
    const stringUser = e.dataTransfer.getData("user");
    if (!stringUser) return;

    const seatName = e.currentTarget.id;

    let user: User;
    try {
      user = JSON.parse(stringUser);
    } catch (error) {
      return;
    }

    if (e.currentTarget.getAttribute("placed")) {
      const noOnePlaced = !users.find(
        (item) => item.id !== user.id && item.seatName == seatName
      );
      if (noOnePlaced) e.currentTarget.removeAttribute("placed");
      console.log("heyyy", noOnePlaced, seatName, user);
      return;
    }
    if (!e.currentTarget.getAttribute("placed"))
      e.currentTarget.setAttribute("placed", "true");

    const previousSeat = document.getElementById(user.seatName);
    if (previousSeat) {
      previousSeat.removeAttribute("placed");
    }

    let tempUsers = [...users];

    tempUsers = tempUsers.map((item) => {
      if (item.id === user.id)
        return {
          ...item,
          available: false,
          seatName,
        };
      return item;
    });

    const tempSeats: Seat[][] = [];
    console.log(seatName, user);
    seats.forEach((seatRow) => {
      tempSeats.push(
        seatRow.map((item) => {
          if (item.name === user.seatName) {
            console.log("sd");
            return {
              name: item.name,
              available: true,
            };
          }

          if (item.name === seatName && item.available)
            return {
              ...item,
              available: false,
              user: { ...user, seatName },
            };
          return item;
        })
      );
    });
    console.log({ tempUsers });
    console.log({ tempSeats });
    setUsers(tempUsers);
    setSeats(tempSeats);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-2xl flex items-center gap-10 justify-center mx-auto h-screen">
      {/* <div>
        {seats.map((row, rowIndex) => (
          <div key={rowIndex} className="flex items-center gap-3 mb-2">
            {row.map((column, colIndex) => (
              <div
                draggable
                onDrop={handleOnDrop}
                onDragOver={handleDragOver}
                onDragStart={(e) => handleOnDrag(e, column?.user)}
                className={cn('h-12 w-12 rounded-md bg-gray-400 text-white', {
                  'bg-black': !column.available,
                })}
                id={column.name}
                key={rowIndex + colIndex}
              >
                {column?.user?.username}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {users.map((user) => (
          <div
            draggable
            key={user.id}
            className={cn('w-32 bg-gray-300', {
              'bg-green-400': user.available,
            })}
            onDragStart={(e) => handleOnDrag(e, user)}
          >
            {user.username}
          </div>
        ))}
      </div> */}
      <Map />
    </div>
  );
};

export default Home;
