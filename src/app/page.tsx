"use client";
import { useEffect, useState } from "react";
import { ProfileCard } from "@/components/ProfileCard";
import { ProfileWithPicture } from "@/types/profile";
import { profilesService } from "@/services/profiles.service";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import Pagination from "@/components/Pagination";

export default function Home() {
  const [profiles, setProfiles] = useState<ProfileWithPicture[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [displayedProfiles, setDisplayedProfiles] = useState<
    ProfileWithPicture[]
  >([]);
  const [totalPages, setTotalPages] = useState<number>(0);
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
        setIsLoading(false);
        if (totalPages > 1) {
          for (let i = 2; i < totalPages; i++) {
            const { profiles: nextProfiles } =
              await profilesService.getAllProfiles(i);
            setProfiles((prevProfiles) => [...prevProfiles, ...nextProfiles]);
          }
        }
      } catch (error) {
        console.error("Failed to fetch profiles:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfiles();
  }, []);

  useEffect(() => {
    const startIndex = (currentPage - 1) * 20;
    const endIndex = startIndex + 20;

    const filteredProfiles = profiles
      .filter((p) => !showOnlyVisible || p.Profile.isPhoneNumberVisible)
      .filter((p) => {
        if (!locationFilter) return true;
        const searchText = locationFilter.toLowerCase();
        return (
          p.Profile.name.toLowerCase().includes(searchText) ||
          p.Profile.city?.toLowerCase().includes(searchText) ||
          p.Profile.profileId.toLowerCase().includes(searchText) ||
          p.Profile.employment?.toLowerCase().includes(searchText) ||
          p.Profile.raasi?.toLowerCase().includes(searchText) ||
          p.Profile.star?.toLowerCase().includes(searchText)
        );
      })
      .slice(startIndex, endIndex);

    setDisplayedProfiles(filteredProfiles);
  }, [currentPage, showOnlyVisible, locationFilter, profiles]);

  return (
    <main className="min-h-screen p-6 space-y-6 bg-[#F5F5F5]">
      <div className="max-w-4xl mx-auto border-1 border-gray-500 p-4 rounded-xl text-black">
        <div className="space-y-4 mb-6">
          <div className="flex items-center space-x-2 bg-blue-100 p-3 rounded">
            <Input
              type="text"
              placeholder="Search by name, location, ID, employment..."
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
