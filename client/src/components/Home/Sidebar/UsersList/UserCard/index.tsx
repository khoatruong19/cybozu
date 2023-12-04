import { User, UserRole } from "../../../../../schema/types";
import DefaultAvatar from "../../../../../assets/default-avatar.png";
import {
  MODALS,
  useModalContext,
} from "../../../../../providers/ModalProvider";
import { useAuth } from "../../../../../hooks/useAuth";

type Props = {
  user: User;
};

const UserCard = ({ user }: Props) => {
  const { user: me } = useAuth();
  const { showModal } = useModalContext();

  const handleOpenUpdateModal = () => {
    if (user.role === UserRole.ADMIN) {
      showModal(MODALS.USER_INFORMATION, { user });
      return;
    }

    if (user.id === me!.id) {
      showModal(MODALS.PROFILE, {});
    } else {
      showModal(MODALS.UPDATE_USER, { type: "update", user });
    }
  };

  return (
    <div
      onClick={handleOpenUpdateModal}
      className="w-full h-16 px-2 border-b flex items-center gap-2 bg-white hover-opacity"
    >
      <img
        src={user?.avatar ?? DefaultAvatar}
        className="w-12 h-12 rounded-full object-cover"
        alt=""
      />
      <div>
        <h3 className="text-lg font-semibold">{user.full_name}</h3>
        <p className="capitalize text-sm">{user.role}</p>
      </div>
    </div>
  );
};

export default UserCard;
