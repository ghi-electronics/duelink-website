import React, { useState, useEffect } from 'react';
import styles from './styles.module.css';

export default function ForumFeed() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Use proxy URL in development, direct URL in production
    const isDevelopment = window.location.hostname === 'localhost';
    const baseUrl = isDevelopment 
      ? 'http://localhost:3001/api/forum'
      : 'https://forums.ghielectronics.com';
    
    // Fetch topics with excerpts using latest.json which includes more data
    const apiUrl = `${baseUrl}/c/duelink/duelink-announcement/35/l/latest.json`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch forum data');
        }
        return response.json();
      })
      .then(async data => {
        // Filter out old topics from 2017 and get more recent ones
        const recentTopics = data.topic_list.topics.filter(topic => {
          const lastActivity = new Date(topic.last_posted_at || topic.created_at);
          const createdDate = new Date(topic.created_at);
          // Skip topics from 2017 or earlier
          return createdDate.getFullYear() > 2017 || lastActivity.getFullYear() > 2017;
        });
        
        // Get the first 5 recent topics
        const latestTopics = recentTopics.slice(0, 5);
        
        // Only fetch content for topics that don't have excerpts
        const topicsWithContent = await Promise.all(
          latestTopics.map(async (topic) => {
            // If topic already has an excerpt, use it
            if (topic.excerpt) {
              return topic;
            }
            
            // Otherwise try to fetch content
            try {
              const topicResponse = await fetch(`${baseUrl}/t/${topic.id}.json`);
              if (topicResponse.ok) {
                const topicData = await topicResponse.json();
                // Try to get excerpt from topic details first
                if (topicData.excerpt) {
                  return { ...topic, excerpt: topicData.excerpt };
                }
                
                // If no excerpt, get from first post
                const firstPost = topicData.post_stream?.posts?.[0];
                if (firstPost && firstPost.excerpt) {
                  return { ...topic, excerpt: firstPost.excerpt };
                }
                
                // Last resort: use cooked content but keep it simple
                if (firstPost && firstPost.cooked) {
                  const tempDiv = document.createElement('div');
                  tempDiv.innerHTML = firstPost.cooked;
                  
                  // Try to extract the first image
                  const img = tempDiv.querySelector('img');
                  let imageUrl = null;
                  if (img && img.src) {
                    imageUrl = img.src;
                    // If it's a relative URL, make it absolute
                    if (!imageUrl.startsWith('http')) {
                      imageUrl = `https://forums.ghielectronics.com${imageUrl.startsWith('/') ? '' : '/'}${imageUrl}`;
                    }
                  }
                  
                  // Remove image metadata text (like "NewsletterImage1456×900 74.8 KB" or "image.webp1920×1080 123 KB")
                  let plainText = (tempDiv.textContent || '');
                  // Remove image filenames with dimensions and size (e.g., "NewsletterImage1456×900 74.8 KB")
                  plainText = plainText.replace(/\b\w+\d+×\d+\s+[\d.]+\s*[KMG]?B\b/gi, '');
                  // Remove patterns with file extensions
                  plainText = plainText.replace(/\b\w+\.(png|jpg|jpeg|gif|webp)\d+×\d+\s+[\d.]+\s*[KMG]?B?\b/gi, '');
                  // Remove any remaining dimension patterns
                  plainText = plainText.replace(/\b\d+×\d+\s+[\d.]+\s*[KMG]?B\b/g, '');
                  plainText = plainText.trim().substring(0, 200);
                  
                  if (plainText.length > 20) {
                    return { ...topic, excerpt: plainText + '...', imageUrl };
                  }
                }
              }
            } catch (error) {
              console.error(`Error fetching topic ${topic.id}:`, error);
            }
            
            // Fallback
            return { ...topic, excerpt: `Discussion about ${topic.title}` };
          })
        );
        
        setTopics(topicsWithContent);
        setLoading(false);
      })
      .catch(err => {
        console.error('Forum feed error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className={styles.feedContainer}>
        <h2>Latest Announcements</h2>
        <div className={styles.loading}>Loading announcements...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.feedContainer}>
        <h2>Latest Announcements</h2>
        <div className={styles.error}>
          Unable to load announcements. 
          {window.location.hostname === 'localhost' && (
            <div style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              For local development, run: <code>npm run proxy</code> in another terminal
            </div>
          )}
        </div>
      </div>
    );
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className={styles.feedContainer}>
      <h2>Latest Announcements</h2>
      {error && topics.length > 0 && (
        <div className={styles.notice}>
          ⚠️ Live feed unavailable - showing sample data
        </div>
      )}
      <div className={styles.feedList}>
        {topics.map(topic => (
          <div key={topic.id} className={styles.feedItem}>
            {topic.imageUrl && (
              <div className={styles.feedBanner}>
                <img src={topic.imageUrl} alt={topic.title} />
              </div>
            )}
            <div className={styles.feedHeader}>
              <a 
                href={topic.featured_link || `https://forums.ghielectronics.com/t/${topic.slug}/${topic.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.feedTitle}
              >
                {topic.title}
              </a>
              <div className={styles.feedMeta}>
                <span className={styles.date}>
                  {formatDate(topic.last_posted_at || topic.created_at)}
                </span>
                {topic.posts_count > 1 && (
                  <>
                    <span className={styles.separator}>•</span>
                    <span className={styles.replies}>{topic.posts_count - 1} {topic.posts_count === 2 ? 'reply' : 'replies'}</span>
                  </>
                )}
              </div>
            </div>
            <div className={styles.feedExcerpt}>
              {topic.excerpt || `View the discussion about ${topic.title.toLowerCase()}...`}
            </div>
          </div>
        ))}
      </div>
      <div className={styles.viewMore}>
        <a 
          href="https://forums.ghielectronics.com/c/duelink/duelink-announcement/35"
          target="_blank"
          rel="noopener noreferrer"
          className="button button--secondary"
        >
          View All Announcements →
        </a>
      </div>
    </div>
  );
}