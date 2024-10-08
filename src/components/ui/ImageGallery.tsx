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
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <LightGallery
        elementClassNames={` mt-2 gap-2 grid place-items-center ${
          images.length === 1 ? "grid-cols-1" : "grid-cols-2"
        } `}
        onInit={onInit}
        speed={500}
        plugins={[lgThumbnail, lgZoom]}
      >
        {images.map((image: string, index) => (
          <Link
            className={`w-full ${
              images.length === 3 && index === 0 ? "col-span-2" : "col-span-1"
            }`}
            href={`${image}`}
            key={index}
          >
            <Image
              alt={`$image-${index + 1}`}
              className="h-[400px] w-full object-cover"
              height={500}
              src={image}
              width={500}
              data-lg-size="1600-2400"
            />
          </Link>
        ))}
      </LightGallery>
    </>
  );
};

export default ImageGallery;
