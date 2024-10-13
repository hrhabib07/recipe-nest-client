import { Button } from "@nextui-org/button";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";

import RNInput from "../form/RNInput";
import RNForm from "../form/RNForm";
import RNTextEditor from "../form/RNTextEditor";
import RNSelect from "../form/RNSelect";

import { useUpdatePost } from "@/src/hooks/post.hook";

const UpdatePostModal = ({ post }: any) => {
  const [editorValue, setEditorValue] = useState(""); // State for editor content
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { mutate: updatePost } = useUpdatePost();

  // Setting the default values including the editor's content
  useEffect(() => {
    if (post && post.description) {
      setEditorValue(post.description); // Ensure description is stored as HTML or Quill's delta format
    }
  }, [post]);

  const defaultValuesOfPosts = {
    title: post.title,
    contentType: post.contentType,
  };
  const onSubmit = (data: any) => {
    const payload: { postId: string; postData: any } = {
      postId: post._id,
      postData: { ...data, description: editorValue },
    };

    updatePost(payload);
  };
  const contentTypeOptions = [
    { key: "Free", label: "Free" },
    { key: "Premium", label: "Premium" },
  ];

  return (
    <>
      <>
        <Button className="bg-transparent" onPress={onOpen}>
          {" "}
          Update Post
        </Button>
        {/* {createPostPending && <LoadingSpinner />} */}
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
                      <RNForm
                        // resolver={zodResolver(registerValidationSchema)}
                        defaultValues={defaultValuesOfPosts}
                        onSubmit={onSubmit}
                      >
                        <div className="py-3">
                          <RNInput label="Title" name="title" size="sm" />
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
                        <div className="py-3">
                          <RNTextEditor
                            label="Description"
                            name="description"
                            value={editorValue}
                            onChange={setEditorValue}
                          />
                        </div>

                        <Button
                          className="my-3 w-full rounded-md bg-default-900 text-default"
                          size="lg"
                          type="submit"
                          onPress={onClose}
                        >
                          Update
                        </Button>
                      </RNForm>
                      {/* <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                         

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
                      </FormProvider> */}
                    </div>
                  </>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    </>
  );
};

export default UpdatePostModal;
