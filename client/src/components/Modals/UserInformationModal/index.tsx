import { KeyRound, Pencil, UserIcon } from "lucide-react";
import DefaultAvatar from "../../../assets/default-avatar.png";
import { useModalContext } from "../../../providers/ModalProvider";
import { User } from "../../../schema/types";
import Button from "../../Form/Button";
import FieldControl from "../../Form/FieldControl";
import Label from "../../Form/Label";

type Props = {
  user?: User;
};

const UserInformationModal = ({ user }: Props) => {
  const { closeModal } = useModalContext();

  return (
    <div className="w-[500px] py-8 font-mono">
      <h1 className="text-3xl font-semibold text-center">User Information</h1>

      <div className="relative w-40 h-40 rounded-full overflow-hidden mx-auto mt-8">
        <img
          src={user?.avatar ?? DefaultAvatar}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
      </div>

      <div className="max-w-md w-full bg-white rounded-md flex flex-col gap-5 items-center justify-center pl-20 pr-8">
        <FieldControl
          field="Email"
          name="email"
          inputDisabled
          inputValue={user?.email}
          icon={<UserIcon />}
          inputWrapperClass={"bg-primary"}
        />

        <FieldControl
          field="Fullname"
          name="full_name"
          inputDisabled
          inputValue={user?.full_name}
          icon={<Pencil />}
          inputWrapperClass={"bg-primary"}
        />

        <div className="flex flex-col gap-1 w-full">
          <Label field="Role" />
          <div className="flex items-center gap-5 capitalize bg-primary py-2 rounded-md">
            <KeyRound />
            <span>{user?.role}</span>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-5">
          <Button
            type="button"
            onClick={closeModal}
            className="mx-auto block rounded-lg text-primary hover:text-secondary w-fit"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserInformationModal;
