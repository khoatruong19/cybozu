import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Lock, Pencil, Trash, UserIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import DefaultAvatar from "../../../assets/default-avatar.png";
import { MODALS, useModalContext } from "../../../providers/ModalProvider";
import { UserSchema, UserSchemaType } from "../../../schema/form";
import { User, UserRole } from "../../../schema/types";
import {
  useCreateUserMutation,
  useDeleteUserMutation,
  useUpdateUserMutation,
} from "../../../stores/user/service";
import Button from "../../Form/Button";
import Label from "../../Form/Label";
import FieldControl from "../../Form/FieldControl";
import resizeImage from "../../../utils/resizeImage";

type ModalType = "create" | "update";

type Props = {
  type: ModalType;
  user?: User;
};

const UserEditingModal = ({ type, user }: Props) => {
  const { showModal, closeModal } = useModalContext();
  const [file, setFile] = useState<File | Blob | null>(null);
  const [avatar, setAvatar] = useState("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [create, { isLoading: createLoading }] = useCreateUserMutation();
  const [update, { isLoading: updateLoading }] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<UserSchemaType>({
    resolver: zodResolver(UserSchema),
  });

  const createSubmitHandler = (formData: FormData) => {
    return create(formData);
  };

  const updateSubmitHandler = (formData: FormData) => {
    return update({ id: user!.id, data: formData });
  };

  const onSubmit: SubmitHandler<UserSchemaType> = (values: UserSchemaType) => {
    const submitHandler =
      type === "create" ? createSubmitHandler : updateSubmitHandler;

    const formData = new FormData();

    Object.entries(values).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (file) {
      resizeImage({ file }, async (resultBlob) => {
        formData.append("file", resultBlob);
        submitHandler(formData)
          .then(() => {
            closeModal();
            reset();
          })
          .catch(() => {});
      });
      return;
    }

    submitHandler(formData)
      .then(() => {
        closeModal();
        reset();
      })
      .catch(() => {});
  };

  const handleOpenChooseFile = () => {
    fileInputRef.current?.click();
  };

  const onChangFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (!file) return;
    setFile(file);
    setAvatar(URL.createObjectURL(file));
  };

  const handleDeleteUser = () => {
    const deleteHandler = () =>
      deleteUser({ userId: user?.id! })
        .then(() => closeModal())
        .catch(() => {});
    showModal(MODALS.CONFIRM, { confirmHandler: deleteHandler });
  };

  useEffect(() => {
    if (!user) return;
    setValue("email", user.email);
    setValue("full_name", user.full_name);
    setValue("role", user.role);
    setAvatar(user.avatar ?? "");
  }, [user]);

  return (
    <div className="relative w-[500px] py-8 font-mono">
      {type === "update" && (
        <Button
          onClick={handleDeleteUser}
          className="absolute right-0 top-5 text-red-400"
        >
          <Trash strokeWidth={2.5} />
        </Button>
      )}

      <h1 className="text-3xl font-semibold text-center">
        {type === "create" ? "Create User" : "Update User"}
      </h1>

      <div
        onClick={handleOpenChooseFile}
        className="relative w-40 h-40 rounded-full overflow-hidden mx-auto hover-opacity mt-8"
      >
        <img
          src={!!avatar ? avatar : DefaultAvatar}
          alt=""
          className="absolute top-0 left-0 w-full h-full object-cover"
        />
        <input
          ref={fileInputRef}
          onChange={onChangFile}
          type="file"
          hidden
          accept=".png, .jpg, .jpeg"
        />
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-md w-full bg-white rounded-md flex flex-col gap-5 items-center justify-center pl-20 pr-8"
      >
        <FieldControl
          field="Email"
          errors={errors}
          name="email"
          placeholder="Email..."
          register={register}
          icon={<UserIcon />}
        />

        {type === "create" && (
          <FieldControl
            field="Password"
            errors={errors}
            name="password"
            placeholder="Password..."
            register={register}
            icon={<Lock />}
          />
        )}

        <FieldControl
          field="Fullname"
          errors={errors}
          name="full_name"
          placeholder="Fullname..."
          register={register}
          icon={<Pencil />}
        />

        <div className="flex flex-col gap-1 w-full">
          <Label field="Role" />
          <div className="flex items-center gap-5 capitalize">
            <KeyRound />
            <select
              {...register("role")}
              className="capitalize focus:outline-0"
              defaultValue={UserRole.USER}
            >
              <option value={UserRole.ADMIN}>Admin</option>
              <option value={UserRole.USER}>User</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 mt-8">
          <Button
            type="button"
            onClick={closeModal}
            className="mx-auto block rounded-lg text-primary hover:text-secondary w-fit"
          >
            Cancel
          </Button>
          <Button
            disabled={createLoading || updateLoading}
            type="submit"
            className="mx-auto block rounded-lg disabled:bg-primary bg-secondary disabled:cursor-default disabled:hover:opacity-100"
          >
            Save
          </Button>
        </div>
      </form>
    </div>
  );
};

export default UserEditingModal;
