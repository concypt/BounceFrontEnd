// import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { fetchHostDetails } from "../api/masabService";
import EventCard from "./EventCard";
import FollowUnfollowBtn from "./FollowUnfollowBtn";
import styles from "./hostProfile.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HostProfile = () => {
  const { organisationId } = useParams();

  const {
    data: profile,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["hostDetails", organisationId],
    queryFn: () => fetchHostDetails(organisationId),
  });

  if (isLoading) {
    return (
      <div className={styles.skeletonContainer}>
        <div className={styles.hostProfile}>
          <div className={styles.profilePath}>
            <Skeleton circle={true} height={200} width={200} />
            <div className={styles.skeletonName}>
              <Skeleton width={300} height={20} />
            </div>
          </div>
          <div className={styles.hostCard}>
            <div className="row">
              <div className="col-lg-6">
                <h2>About</h2>
                <Skeleton height={40} count={3} />
              </div>
              <div className="col-lg-6">
                <h2>Followers</h2>
                <div className={`users ${styles.skeletonUsers}`}>
                  <div className="user_imgs">
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton circle={true} height={40} width={40} />
                    <Skeleton circle={true} height={40} width={40} />
                    <div className={styles.skeletonCount}>
                      <Skeleton width={50} height={20} />
                    </div>
                  </div>
                </div>
                <Skeleton height={40} width={120} />
                <Skeleton height={20} count={2} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bounce_bg_circle">
      <div className="container-fluid">
        {error ? (
          <div className={styles.hostProfile}>
            <h3 className="text-center">{error}</h3>
          </div>
        ) : !profile ? (
          <div className={styles.hostProfile}>
            <h2 className="text-center">No profile available</h2>
          </div>
        ) : (
          <div className={styles.hostProfile}>
            <div className={styles.profilePath}>
              <img src={profile.imagePath} alt="" />
              <h1>
                {profile.name
                  ? profile.name
                  : profile.first_name + " " + profile.last_name}
              </h1>
            </div>
            <div className={styles.hostCard}>
              <div className="row">
                <div className="col-lg-6">
                  <h2>About</h2>
                  <p className={styles.hostText}>
                    {profile.bio ? profile.bio : "No bio found..."}
                  </p>
                </div>
                <div className="col-lg-6">
                  <h2>Followers</h2>
                  <div className={`users ${styles.hostUser}`}>
                    <div className="user_imgs">
                      {profile.followers_user
                        .slice(0, 4)
                        .map((follower, index) => (
                          <img
                            key={index}
                            src={follower.imagePath}
                            alt={`Follower ${follower.first_name}`}
                          />
                        ))}
                      {profile.followers_user.length > 4 && (
                        <div className="user_count">
                          <p>{profile.followers_user.length - 4}+</p>
                        </div>
                      )}
                      {/* Other components or elements */}
                    </div>
                  </div>
                  <FollowUnfollowBtn organisationId={profile.id} />
                  <p className={styles.hostText}>
                    Follow to receive the latest updates and new event
                    announcements by email!
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <div className={styles.gvoEvents}>
        <div className={styles.eventsGrid}>
          {profile.events &&
            profile.events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HostProfile;
