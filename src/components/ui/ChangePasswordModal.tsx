"use client";

import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import RNInput from "../form/RNInput";

import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUser } from "@/src/context/user.provider";
import { usePasswordChange } from "@/src/hooks/auth.hook";

// export default function CreatePost() {
const ChangePasswordModal = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const router = useRouter();

  const {
    mutate: handlePassword,
    isPending: passwordChangePending,
    isSuccess: passwordChangeSuccess,
  } = usePasswordChange();

  const { user } = useUser();

  const methods = useForm();

  const { handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const postData = {
      ...data,
    };

    // console.log(postData);

    handlePassword(postData);
  };

  if (!passwordChangePending && passwordChangeSuccess) {
    router.push("/profile");
  }

  return (
    <>
      <Button onPress={onOpen}>Change Password</Button>

      {passwordChangePending && <LoadingSpinner />}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-gradient-to-b from-default-100">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-semibold">Change your Password</h1>
              </ModalHeader>
              <ModalBody>
                <>
                  <div className="h-full rounded-xl ">
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <RNInput label="Old-password" name="oldPassword" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <RNInput label="New Password" name="newPassword" />
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button size="lg" type="submit" onPress={onClose}>
                            Update
                          </Button>
                        </div>
                      </form>
                    </FormProvider>
                  </div>
                </>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
