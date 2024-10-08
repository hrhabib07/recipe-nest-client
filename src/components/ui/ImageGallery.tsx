import React from "react";
import LightGallery from "lightgallery/react";

// import styles
import "lightgallery/css/lightgallery.css";
import "lightgallery/css/lg-zoom.css";
import "lightgallery/css/lg-thumbnail.css";

// import plugins if you need
import lgThumbnail from "lightgallery/plugins/thumbnail";
import lgZoom from "lightgallery/plugins/zoom";
import Image from "next/image";
import Link from "next/link";
const ImageGallery = ({ images }: { images: string[] }) => {
  const onInit = () => {
    // console.log("lightGallery has been initialized");
  };

  return (
    <>
      <LightGallery
        elementClassNames={` mt-2 gap-2 grid place-items-center ${
          images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        } `}
        plugins={[lgThumbnail, lgZoom]}
        speed={500}
        onInit={onInit}
      >
        {images.map((image: string, index) => (
          <Link
            key={index}
            className={`w-full ${
              images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
            }`}
            href={`${image}`}
          >
            <Image
              alt={`image-${index + 1}`}
              className="h-[400px] w-full object-cover"
              data-lg-size="1600-2400"
              height={500}
              src={image}
              width={500}
            />
          </Link>
        ))}
      </LightGallery>
    </>
  );
};

export default ImageGallery;
