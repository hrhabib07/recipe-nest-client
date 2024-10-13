"use client";

import { Button } from "@nextui-org/button";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import RNInput from "../form/RNInput";
import RNTextEditor from "../form/RNTextEditor";
import RNSelect from "../form/RNSelect";

import LoadingSpinner from "@/src/components/ui/LoadingSpinner";
import { useUser } from "@/src/context/user.provider";
import { useCreatePost } from "@/src/hooks/post.hook";

// export default function CreatePost() {
const CreatePostModal = () => {
  const [imageFiles, setImageFiles] = useState<File[] | []>([]);
  const [imagePreviews, setImagePreviews] = useState<string[] | []>([]);
  const [editorValue, setEditorValue] = useState(""); // State for editor content

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const methods = useForm();
  //   console.log(imagePreviews);

  const router = useRouter();

  const {
    mutate: handleCreatePost,
    isPending: createPostPending,
    isSuccess: createPostSuccess,
  } = useCreatePost();

  const { user, isLoading } = useUser();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <p>User not logged in</p>;
  }

  const { control, handleSubmit } = methods;

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const formData = new FormData();
    const postData = {
      ...data,
      user: user?._id,
      description: editorValue,
    };

    // console.log(postData);

    formData.append("data", JSON.stringify(postData));
    // console.log(postData);
    for (let image of imageFiles) {
      formData.append("itemImages", image);
    }
    handleCreatePost(formData);
  };

  const handleImageChange = (e: any) => {
    const file = e?.target?.files[0];

    setImageFiles((prev) => [...prev, file]);

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImagePreviews((prev) => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    }
  };

  if (!createPostPending && createPostSuccess) {
    router.push("/");
  }

  const contentTypeOptions = [
    { key: "Free", label: "Free" },
    { key: "Premium", label: "Premium" },
  ];

  return (
    <>
      <Button onPress={onOpen}>Create a post</Button>

      {createPostPending && <LoadingSpinner />}
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="bg-gradient-to-b from-default-100">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                <h1 className="text-2xl font-semibold">Post a Recipe</h1>
              </ModalHeader>
              <ModalBody>
                <>
                  <div className="h-full rounded-xl ">
                    <FormProvider {...methods}>
                      <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="flex flex-wrap gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <RNInput label="Title" name="title" />
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <RNSelect
                              label="Content Type"
                              name="contentType"
                              options={contentTypeOptions}
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap-reverse gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <RNTextEditor
                              label="Description"
                              name="description"
                              value={editorValue} // Pass the editor value
                              onChange={setEditorValue} // Update the value on change
                            />
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 py-2">
                          <div className="min-w-fit flex-1">
                            <label
                              className="flex h-14 w-full cursor-pointer items-center justify-center rounded-xl border-2 border-default-200 text-default-500 shadow-sm transition-all duration-100 hover:border-default-400"
                              htmlFor="image"
                            >
                              Upload image
                            </label>
                            <input
                              multiple
                              className="hidden"
                              id="image"
                              type="file"
                              onChange={(e) => handleImageChange(e)}
                            />
                          </div>
                        </div>

                        {imagePreviews.length > 0 && (
                          <div className="flex gap-5 my-5 flex-wrap">
                            {imagePreviews.map((imageDataUrl) => (
                              <div
                                key={imageDataUrl}
                                className="relative size-24 rounded-xl border-2 border-dashed border-default-300 p-2"
                              >
                                <img
                                  alt="item"
                                  className="h-full w-full object-cover object-center rounded-md"
                                  src={imageDataUrl}
                                />
                              </div>
                            ))}
                          </div>
                        )}

                        <div className="flex justify-end">
                          <Button size="lg" type="submit">
                            Post
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

export default CreatePostModal;
