"use client";
import { useState } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ImageGallery } from "./ImageGallery";
import { ProfileWithPicture } from "@/types/profile";

export function ProfileCard({ profile }: { profile: ProfileWithPicture }) {
  const [isGalleryOpen, setIsGalleryOpen] = useState(false);

  return (
    <>
      <Card className="overflow-hidden">
        <CardContent className="p-0 flex flex-col md:flex-row">
          <div
            className="relative w-full md:w-1/3 h-[300px] cursor-pointer"
            onClick={() => profile.picture.length > 0 && setIsGalleryOpen(true)}
          >
            {profile.picture.length > 0 ? (
              <Image
                src={profile.picture[0]}
                alt={profile.Profile.name}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-muted">
                <span>No Image</span>
              </div>
            )}
            {profile.picture.length > 1 && (
              <div className="absolute bottom-2 right-2 bg-black/50 text-white px-2 py-1 rounded-full text-sm">
                +{profile.picture.length - 1}
              </div>
            )}
          </div>

          <div className="w-full md:w-2/3 p-6 space-y-4">
            <div className="flex justify-between items-start">
              <h2 className="text-2xl font-semibold">{profile.Profile.name}</h2>
              <Button variant="ghost" size="icon">
                <StarIcon className="h-5 w-5" />
              </Button>
            </div>

            <div className="space-y-2">
              <p>ID: {profile.Profile.profileId}</p>
              <p>Age: {profile.Profile.age} years</p>
              {profile.Profile.city && <p>Location: {profile.Profile.city}</p>}
              <p>Employment: {profile.Profile.employment}</p>
              <p>
                Phone Number:{" "}
                {profile.Profile.isPhoneNumberVisible
                  ? "Directly Available"
                  : "Not Available"}
              </p>
              <div className="pt-2">
                <p>Raasi: {profile.Profile.raasi}</p>
                <p>Star: {profile.Profile.star?.replace(/_/g, " ")}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <ImageGallery
        images={profile.picture}
        isOpen={isGalleryOpen}
        onClose={() => setIsGalleryOpen(false)}
      />
    </>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}
