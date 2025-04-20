"use client";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileWithPicture } from "@/types/profile";
import { Button } from "@/components/ui/button";
import { profilesService } from "@/services/profiles.service";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}) {
  const getPageNumbers = () => {
    const delta = 2;
    const range = [];
    const rangeWithDots = [];

    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }

    if (currentPage - delta > 2) {
      rangeWithDots.push(1, "...");
    } else {
      rangeWithDots.push(1);
    }

    rangeWithDots.push(...range);

    if (currentPage + delta < totalPages - 1) {
      rangeWithDots.push("...", totalPages);
    } else if (totalPages > 1) {
      rangeWithDots.push(totalPages);
    }

    return rangeWithDots;
  };

  return (
    <div className="flex justify-center gap-1 mt-6 flex-wrap">
      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="hidden sm:inline-flex"
      >
        Previous
      </Button>
      {getPageNumbers().map((pageNumber, i) =>
        pageNumber === "..." ? (
          <span key={`dots-${i}`} className="px-3 py-2">
            ...
          </span>
        ) : (
          <Button
            key={pageNumber}
            variant={currentPage === pageNumber ? "default" : "outline"}
            onClick={() => onPageChange(pageNumber as number)}
            className="w-10 h-10 p-0"
          >
            {pageNumber}
          </Button>
        )
      )}

      <Button
        variant="outline"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="hidden sm:inline-flex"
      >
        Next
      </Button>
    </div>
  );
}

export default function Home() {
  const [profiles, setProfiles] = useState<ProfileWithPicture[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnlyVisible, setShowOnlyVisible] = useState(false);
  const [locationFilter, setLocationFilter] = useState("");

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        setIsLoading(true);
        const { profiles: fetchedProfiles, totalPages } =
          await profilesService.getAllProfiles(currentPage);
        setProfiles(fetchedProfiles);
        setTotalPages(totalPages);
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, [currentPage]);

  const displayedProfiles = profiles
    .filter((p) => !showOnlyVisible || p.Profile.isPhoneNumberVisible)
    .filter(
      (p) =>
        !locationFilter ||
        p.Profile.city?.toLowerCase().includes(locationFilter.toLowerCase())
    );

  return (
    <main className="min-h-screen p-6 space-y-6 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto border-1 border-gray-500 p-4 rounded-xl text-black">
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2 bg-blue-100 p-3 rounded">
            <Input
              type="text"
              placeholder="Filter by location..."
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="max-w-xs"
            />
          </div>

          <div className="flex items-center space-x-2 bg-blue-100 p-3 rounded">
            <Switch
              checked={showOnlyVisible}
              onCheckedChange={setShowOnlyVisible}
              id="phone-filter"
            />
            <label htmlFor="phone-filter" className="text-sm font-medium">
              Show only profiles with visible phone numbers
            </label>
          </div>
        </div>

        <div className="space-y-6 text-black">
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            displayedProfiles.map((profile) => (
              <ProfileCard key={profile.Profile.id} profile={profile} />
            ))
          )}
        </div>
      </div>

      {/* <div className="flex justify-center gap-2 mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <Button
            key={i + 1}
            variant={currentPage === i + 1 ? "default" : "outline"}
            onClick={() => setCurrentPage(i + 1)}
          >
            {i + 1}
          </Button>
        ))}
      </div> */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}
