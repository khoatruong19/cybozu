import { Contact2, PlusCircle, X } from "lucide-react";
import { useState } from "react";
import { cn } from "../../../lib/clsx";
import { MODALS, useModalContext } from "../../../providers/ModalProvider";
import Button from "../../Form/Button";
import UsersList from "./UsersList";

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const { showModal } = useModalContext();

  const handleToggleOpen = () => setOpen((prev) => !prev);
  const handleOpenCreateModal = () =>
    showModal(MODALS.CREATE_USER, { type: "create" });

  return (
    <aside className="absolute right-0 top-0 gap-2 font-poppins ">
      <div
        className={cn(
          "w-96 bg-primary h-[calc(100vh-4rem)] overflow-y-auto flex items-start transition-all duration-200 translate-x-0 border-l-2 border-primary",
          {
            "translate-x-[100%]": !open,
          }
        )}
      >
        <div className="flex flex-col w-full py-5 ">
          <h1 className="text-3xl font-semibold text-center text-tertiary">
            Users
          </h1>

          <UsersList />
        </div>

        <Button
          onClick={handleOpenCreateModal}
          className="absolute right-2 p-0 top-1 text-secondary"
        >
          <PlusCircle size={30} />
        </Button>
      </div>
      <Button
        onClick={handleToggleOpen}
        className={cn(
          `absolute top-0 w-fit px-3 py-1 transition-all
         duration-200 text-secondary`,
          {
            "right-0": !open,
            "left-[-53px]": open,
          }
        )}
      >
        {open ? (
          <X size={40} className="mt-[-5px] ml-1.5" />
        ) : (
          <Contact2 size={40} />
        )}
      </Button>
    </aside>
  );
};

export default Sidebar;
