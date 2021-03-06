/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import Link from "next/link";
// import { useRouter } from "next/dist/client/router";

const index = ({ photo }) => {
  // const router = useRouter();
  const { title, url } = photo;
  // console.log("photo");
  // console.log(photo);
  // console.log("router");
  // console.log(router);
  // console.log(router.query.id);
  return (
    <div>
      {/* router.query.id */}
      {/* {photo.map((info) => (
        <>
          <h2>image {info.title}</h2>
          </>
        ))} */}
      <h2>image {title}</h2>
      <Image src={url} width={500} height={500} alt="" />
      <Link href={`/photos/${photo.id}`}>
        <a>go back</a>
      </Link>
    </div>
  );
};

export const getStaticProps = async (context) => {
  const { id } = context.params;
  const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${id}`);
  const photo = await res.json();

  return {
    props: {
      photo,
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/photos?_start=0&_end=10`
  );
  const photos = await res.json();
  const ids = photos.map((photo) => photo.id);
  const paths = ids.map((id) => {
    return {
      params: { id: id.toString() },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export default index;
