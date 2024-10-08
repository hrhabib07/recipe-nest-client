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
const ImageGallery = ({
  images,
  title,
}: {
  images: string[];
  title: string;
}) => {
  const onInit = () => {
    console.log("lightGallery has been initialized");
  };
  return (
    <>
      <>
        <LightGallery
          onInit={onInit}
          speed={500}
          plugins={[lgThumbnail, lgZoom]}
        >
          {images.map((image: string, index) => (
            <Link href={`${image}`}>
              <Image
                alt={`$image-${index + 1}`}
                className="rounded-lg object-cover"
                height={500}
                src={image}
                width={500}
                data-lg-size="1600-2400"
              />
            </Link>
          ))}
          {/* <a href="img/img1.jpg">
            <img alt="img1" src="img/thumb1.jpg" />
          </a>
          <a href="img/img2.jpg">
            <img alt="img2" src="img/thumb2.jpg" />
          </a>
          ... */}
        </LightGallery>
      </>

      {/* {images.map((image: string) => (
        <>
          <Image
            alt={title}
            className="rounded-lg object-cover"
            height={300}
            src={image}
            width={500}
            data-lg-size="1600-2400"
          />
        </>
      ))} */}
    </>
  );
};

export default ImageGallery;
