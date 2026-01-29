import React, { useState, useMemo, useCallback, useRef } from 'react';
import { useHistory, useLocation } from '@docusaurus/router';
import ProjectCard from './ProjectCard';
import YouTubeModal from './YouTubeModal';
import styles from './styles.module.css';

// Custom hook for debouncing
const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useLayoutEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const ProjectCatalog = () => {
  const history = useHistory();
  const location = useLocation();
  const searchInputRef = useRef(null);

  const [data, setData] = useState({ tagGroups: {}, projects: [] });
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState(new Set());
  const [videoId, setVideoId] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Initialize from URL params
  React.useLayoutEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get('search');
    const tagsParam = params.get('tags');

    if (searchParam) {
      setSearchTerm(searchParam);
    }
    if (tagsParam) {
      setSelectedTags(new Set(tagsParam.split(',')));
    }
  }, []);

  // Fetch data
  React.useLayoutEffect(() => {
    fetch('/projects.json')
      .then((response) => response.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error loading projects:', error);
        setLoading(false);
      });
  }, []);

  // Update URL when filters change
  React.useLayoutEffect(() => {
    const params = new URLSearchParams();

    if (searchTerm) {
      params.set('search', searchTerm);
    }
    if (selectedTags.size > 0) {
      params.set('tags', Array.from(selectedTags).join(','));
    }

    const newSearch = params.toString();
    const newUrl = newSearch ? `${location.pathname}?${newSearch}` : location.pathname;
    const currentUrl = `${location.pathname}${location.search}`;

    if (newUrl !== currentUrl) {
      history.replace(newUrl);
    }
  }, [searchTerm, selectedTags, history, location.pathname, location.search]);

  // Get all tags from both groups
  const allTags = useMemo(() => {
    const tags = {};
    if (data.tagGroups?.languages?.tags) {
      Object.entries(data.tagGroups.languages.tags).forEach(([key, value]) => {
        tags[key] = { ...value, group: 'languages' };
      });
    }
    if (data.tagGroups?.platforms?.tags) {
      Object.entries(data.tagGroups.platforms.tags).forEach(([key, value]) => {
        tags[key] = { ...value, group: 'platforms' };
      });
    }
    return tags;
  }, [data.tagGroups]);

  // Filter projects
  const filteredProjects = useMemo(() => {
    return data.projects.filter((project) => {
      // Search filter
      const matchesSearch =
        debouncedSearchTerm === '' ||
        project.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        project.description?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());

      // Tags filter - show projects with ANY selected tag
      const matchesTags =
        selectedTags.size === 0 ||
        project.tags?.some((tag) => selectedTags.has(tag));

      return matchesSearch && matchesTags;
    });
  }, [data.projects, debouncedSearchTerm, selectedTags]);

  // Handlers
  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
  }, []);

  const handleTagToggle = useCallback((tagKey) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(tagKey)) {
        newSet.delete(tagKey);
      } else {
        newSet.add(tagKey);
      }
      return newSet;
    });
  }, []);

  const handleClearGroup = useCallback((group) => {
    setSelectedTags((prev) => {
      const newSet = new Set(prev);
      const groupTags = Object.keys(
        group === 'languages' ? data.tagGroups?.languages?.tags || {} : data.tagGroups?.platforms?.tags || {}
      );
      groupTags.forEach((tag) => newSet.delete(tag));
      return newSet;
    });
  }, [data.tagGroups]);

  const handleClearAll = useCallback(() => {
    setSearchTerm('');
    setSelectedTags(new Set());
    searchInputRef.current?.focus();
  }, []);

  const handleVideoClick = useCallback((id) => {
    setVideoId(id);
  }, []);

  const handleCloseVideo = useCallback(() => {
    setVideoId(null);
  }, []);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.loadingSpinner}></div>
        <p>Loading projects...</p>
      </div>
    );
  }

  const languageTags = data.tagGroups?.languages?.tags || {};
  const platformTags = data.tagGroups?.platforms?.tags || {};
  const hasLanguageSelected = Object.keys(languageTags).some((key) => selectedTags.has(key));
  const hasPlatformSelected = Object.keys(platformTags).some((key) => selectedTags.has(key));

  return (
    <div className={styles.catalogContainer}>
      {/* Filter Bar */}
      <div className={styles.filterBar}>
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search projects..."
          className={styles.searchInput}
          value={searchTerm}
          onChange={handleSearchChange}
          aria-label="Search projects"
        />

        {/* Languages & Tools Section */}
        <div className={styles.filterSection}>
          <span className={styles.filterSectionLabel}>
            {data.tagGroups?.languages?.label || 'Languages & Tools'}
          </span>
          <div className={styles.filterTags}>
            <button
              className={`${styles.tagButton} ${!hasLanguageSelected ? styles.active : ''}`}
              onClick={() => handleClearGroup('languages')}
              aria-pressed={!hasLanguageSelected}
            >
              All
            </button>
            {Object.entries(languageTags).map(([key, tag]) => (
              <button
                key={key}
                className={`${styles.tagButton} ${selectedTags.has(key) ? styles.active : ''}`}
                onClick={() => handleTagToggle(key)}
                aria-pressed={selectedTags.has(key)}
              >
                {tag.icon && (
                  <img
                    src={`/img/tags/${tag.icon}`}
                    alt=""
                    className={styles.tagIcon}
                  />
                )}
                <span>{tag.displayName}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Platforms Section */}
        <div className={styles.filterSection}>
          <span className={styles.filterSectionLabel}>
            {data.tagGroups?.platforms?.label || 'Platforms'}
          </span>
          <div className={styles.filterTags}>
            <button
              className={`${styles.tagButton} ${!hasPlatformSelected ? styles.active : ''}`}
              onClick={() => handleClearGroup('platforms')}
              aria-pressed={!hasPlatformSelected}
            >
              All
            </button>
            {Object.entries(platformTags).map(([key, tag]) => (
              <button
                key={key}
                className={`${styles.tagButton} ${selectedTags.has(key) ? styles.active : ''}`}
                onClick={() => handleTagToggle(key)}
                aria-pressed={selectedTags.has(key)}
              >
                {tag.icon && (
                  <img
                    src={`/img/tags/${tag.icon}`}
                    alt=""
                    className={styles.tagIcon}
                  />
                )}
                <span>{tag.displayName}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div className={styles.resultsCount}>
        <span className={styles.countText}>
          Showing {filteredProjects.length} of {data.projects.length} projects
        </span>
        {selectedTags.size > 0 && (
          <span className={styles.activeFilter}>
            <span className={styles.filterLabel}>
              Tags: {Array.from(selectedTags).map((t) => allTags[t]?.displayName || t).join(', ')}
            </span>
            <button
              className={styles.clearFilterBtn}
              onClick={() => setSelectedTags(new Set())}
              aria-label="Clear tag filters"
            >
              ×
            </button>
          </span>
        )}
        {debouncedSearchTerm && (
          <span className={styles.activeFilter}>
            <span className={styles.filterLabel}>Search: "{debouncedSearchTerm}"</span>
            <button
              className={styles.clearFilterBtn}
              onClick={() => setSearchTerm('')}
              aria-label="Clear search"
            >
              ×
            </button>
          </span>
        )}
      </div>

      {/* Project Grid or No Results */}
      {filteredProjects.length === 0 ? (
        <div className={styles.noResults}>
          <p>No projects found matching your criteria.</p>
          <button className={styles.resetButton} onClick={handleClearAll}>
            Clear Filters
          </button>
        </div>
      ) : (
        <div className={styles.projectGrid}>
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.name || index}
              project={project}
              tagGroups={data.tagGroups}
              onTagClick={handleTagToggle}
              onVideoClick={handleVideoClick}
            />
          ))}
        </div>
      )}

      {/* YouTube Modal */}
      {videoId && <YouTubeModal videoId={videoId} onClose={handleCloseVideo} />}
    </div>
  );
};

export default ProjectCatalog;
