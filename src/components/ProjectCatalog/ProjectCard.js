import React, { memo } from 'react';
import styles from './styles.module.css';

const ProjectCard = memo(({ project, tagGroups, onTagClick, onVideoClick }) => {
  // Helper to get tag info (short code and display name)
  const getTagInfo = (tagKey) => {
    if (tagGroups.languages?.tags[tagKey]) {
      return tagGroups.languages.tags[tagKey];
    }
    if (tagGroups.platforms?.tags[tagKey]) {
      return tagGroups.platforms.tags[tagKey];
    }
    return { displayName: tagKey, short: tagKey.substring(0, 2).toUpperCase() };
  };

  const handleImageClick = (e) => {
    e.preventDefault();
    window.open(project.link, '_blank', 'noopener,noreferrer');
  };

  const handleVideoClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (project.video && onVideoClick) {
      onVideoClick(project.video);
    }
  };

  const handleTagClick = (tagKey) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (onTagClick) {
      onTagClick(tagKey);
    }
  };

  return (
    <div className={styles.projectCard}>
      {/* Image */}
      <div className={styles.imageContainer} onClick={handleImageClick}>
        <img
          src={`/img/projects/${project.image}`}
          alt={project.name}
          className={styles.projectImage}
          loading="lazy"
        />
      </div>

      {/* Project Details */}
      <div className={styles.projectDetails}>
        <p className={styles.projectDescription}>{project.description}</p>

        {/* Tag Chips */}
        <div className={styles.projectTags}>
          {project.tags?.map((tagKey) => {
            const tagInfo = getTagInfo(tagKey);
            return (
              <button
                key={tagKey}
                className={styles.tagChip}
                onClick={handleTagClick(tagKey)}
              >
                {tagInfo.icon ? (
                  <img
                    src={`/img/tags/${tagInfo.icon}`}
                    alt={tagInfo.displayName}
                    className={styles.tagChipIcon}
                  />
                ) : (
                  tagInfo.displayName
                )}
                <span className={styles.tagChipTooltip}>{tagInfo.displayName}</span>
              </button>
            );
          })}
        </div>

        {/* YouTube Link */}
        {project.video && (
          <button className={styles.youtubeLink} onClick={handleVideoClick}>
            <svg className={styles.youtubeLinkIcon} viewBox="0 0 24 24">
              <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" fill="currentColor"/>
            </svg>
            Watch Video
          </button>
        )}

        {/* View Project Button */}
        <a
          href={project.link}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.viewProjectBtn}
        >
          {project.name}
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </a>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
