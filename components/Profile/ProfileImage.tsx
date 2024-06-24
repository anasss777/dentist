// "use client";

// import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/react";
// import React, { useState } from "react";
// import {
//   svgAddImage,
//   svgBigUser,
//   svgCloseDark,
//   svgDefaultImage,
//   svgEditBlue,
// } from "../svgPaths";
// import { Profile } from "@/types/profile";
// import Image from "next/image";
// import Swal from "sweetalert2";
// import { useTranslations } from "next-intl";
// import { updateProfileImage } from "@/utils/profile";

// type Props = {
//   profile: Profile;
// };

// const ProfileImage = ({ profile }: Props) => {
//   const [isEditOpen, setIsEditOpen] = useState(false);
//   const [selectedImage, setSelectedImage] = useState<File>();
//   const [imageUrl, setImageUrl] = useState<string>(profile.profileImage);
//   const t = useTranslations("profile");

//   const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0];
//     if (file) {
//       setSelectedImage(file);
//       setImageUrl(URL.createObjectURL(file));
//     }
//   };

//   const handleImageUpload = (image: File, profileId: string) => {
//     updateProfileImage({
//       image,
//       profileId,
//       oldImage: profile.profileImage,
//     }).then(() => setIsEditOpen(!isEditOpen));

//     Swal.fire({
//       text: t("imageUpdated"),
//       icon: "success",
//       confirmButtonColor: "#4682b4",
//       confirmButtonText: t("ok"),
//     });
//   };

//   return (
//     <Popover
//       isOpen={isEditOpen}
//       key="blur"
//       offset={10}
//       backdrop="blur"
//       className={`relative h-[35vh]`}
//     >
//       <PopoverTrigger>
//         <div>
//           {profile.profileImage ? (
//             <Image
//               onClick={() => setIsEditOpen(!isEditOpen)}
//               src={profile.profileImage}
//               alt={profile.name}
//               height={500}
//               width={500}
//               priority
//               className={`object-cover h-20 w-20 rounded-full border-2 border-secondary shadow-lg`}
//             />
//           ) : (
//             <span>{svgBigUser}</span>
//           )}
//           <span
//             onClick={() => setIsEditOpen(!isEditOpen)}
//             className={`relative -top-6 z-10 flex flex-row items-center bg-[#cbdae6] h-fit w-fit p-1 rounded-full border
//             border-secondary shadow-Card2 cursor-pointer`}
//           >
//             {svgEditBlue}
//           </span>
//         </div>
//       </PopoverTrigger>

//       <PopoverContent
//         className={`flex flex-col justify-between items-start gap-1 bg-gray-200 m-5 rounded-lg overflow-y-auto h-[90vh] mx-auto p-2
//         absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-[400px]:w-96 min-[280px]:w-[280px] w-64`}
//       >
//         {/* Close button */}
//         <button
//           onClick={() => setIsEditOpen(!isEditOpen)}
//           className={`ring-0 outline-none`}
//         >
//           {svgCloseDark}
//         </button>

//         {/* Image */}
//         <div
//           className={`flex flex-col justify-center items-center gap-5 w-full h-full`}
//         >
//           <button className="flex flex-col items-center justify-center cursor-default">
//             <label htmlFor={`imageInput`} className="cursor-pointer">
//               <span
//                 className={`flex bg-primary/30 dark:bg-primary/50 h-fit w-fit p-1 rounded-full border border-primary shadow-md`}
//               >
//                 {svgAddImage}
//               </span>
//             </label>
//             <input
//               type="file"
//               id={`imageInput`}
//               accept="image/*"
//               className="absolute -top-10"
//               onChange={(e) => handleImageChange(e)}
//             />
//           </button>

//           {imageUrl ? (
//             <Image
//               src={imageUrl}
//               alt={profile.name}
//               width={1000}
//               height={1000}
//               priority={true}
//               className="object-cover h-96 w-full justify-center mx-auto rounded-3xl shadow-Card"
//             />
//           ) : (
//             svgDefaultImage
//           )}
//         </div>

//         {/* Save change button */}
//         <div className={`flex flex-col justify-center items-center w-full`}>
//           {imageUrl && selectedImage ? (
//             <button
//               className={`btn bg-secondary`}
//               onClick={() => handleImageUpload(selectedImage, profile.userId)}
//             >
//               {t("save")}
//             </button>
//           ) : (
//             <button disabled className={`btn bg-secondary/50`}>
//               {t("save")}
//             </button>
//           )}
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default ProfileImage;
