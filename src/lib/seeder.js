import { supabase } from './supabaseClient';
import {
  heroArticles,
  trendingNow,
  ottUpdates,
  movieNews,
  latestReviews,
  upcomingReleases,
  latestTrailers
} from '../data/movieData';

/**
 * Transforms local mock items into standard Supabase updates schema
 */
export function getInitialSeedUpdates() {
  const updates = [];

  // 1. Hero / Top Stories
  heroArticles.forEach((item) => {
    updates.push({
      title: item.title,
      slug: item.id || `hero-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'Top Story',
      short_description: item.summary,
      content: item.content || item.summary,
      featured_image_url: item.image || item.poster,
      author: 'Editor in Chief',
      status: 'published',
      tags: `${item.movieTag || ''}, ${item.actor || ''}`.trim(),
      extra_data: {
        movieTag: item.movieTag,
        actor: item.actor,
        badge: item.badge,
        views: item.views
      },
      published_at: new Date().toISOString()
    });
  });

  // 2. Trending / Movie News
  if (movieNews.featured) {
    updates.push({
      title: movieNews.featured.title,
      slug: movieNews.featured.id || 'news-featured-1',
      category: 'Movie News',
      short_description: movieNews.featured.summary,
      content: movieNews.featured.content || movieNews.featured.summary,
      featured_image_url: movieNews.featured.image,
      author: 'News Desk',
      status: 'published',
      tags: 'Breaking News, Exclusive',
      extra_data: { views: movieNews.featured.views },
      published_at: new Date().toISOString()
    });
  }

  if (Array.isArray(movieNews.list)) {
    movieNews.list.forEach((item) => {
      updates.push({
        title: item.title,
        slug: item.id || `news-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        category: 'Movie News',
        short_description: item.summary,
        content: item.summary,
        featured_image_url: item.image,
        author: 'News Desk',
        status: 'published',
        tags: 'Tollywood',
        extra_data: { views: item.views },
        published_at: new Date().toISOString()
      });
    });
  }

  // 3. OTT Updates
  ottUpdates.forEach((item) => {
    updates.push({
      title: item.title,
      slug: item.id || `ott-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'OTT Updates',
      short_description: item.description,
      content: `Platform: ${item.platformName}\nStatus: ${item.status}\nQuality: ${item.quality}\nLanguage: ${item.language}\n\nSynopsis:\n${item.description}`,
      featured_image_url: item.poster,
      author: 'OTT Reporter',
      status: 'published',
      tags: `${item.platformName}, Digital Premiere`,
      extra_data: {
        platform: item.platform,
        platformName: item.platformName,
        status: item.status,
        releaseDate: item.releaseDate,
        quality: item.quality,
        language: item.language
      },
      published_at: new Date().toISOString()
    });
  });

  // 4. Movie Reviews
  latestReviews.forEach((item) => {
    updates.push({
      title: item.title,
      slug: item.id || `rev-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'Reviews',
      short_description: item.summary,
      content: `Director: ${item.director}\nCast: ${item.cast}\nVerdict: ${item.verdict}\nRating: ${item.rating}/5.0\n\nReview:\n${item.content}`,
      featured_image_url: item.poster,
      author: 'Film Critic',
      status: 'published',
      tags: `${item.title}, Movie Review`,
      extra_data: {
        rating: item.rating,
        director: item.director,
        cast: item.cast,
        verdict: item.verdict
      },
      published_at: new Date().toISOString()
    });
  });

  // 5. Trailers
  latestTrailers.forEach((item) => {
    updates.push({
      title: item.title,
      slug: item.id || `tr-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'Trailers',
      short_description: `Watch the official trailer for ${item.title}`,
      content: `Official trailer release with duration ${item.duration}. Total views: ${item.views}`,
      featured_image_url: item.thumbnail,
      author: 'Trailer Hub',
      status: 'published',
      tags: 'Official Trailer, Video',
      extra_data: {
        duration: item.duration,
        views: item.views,
        youtubeId: item.youtubeId
      },
      published_at: new Date().toISOString()
    });
  });

  // 6. Upcoming Releases
  upcomingReleases.forEach((item) => {
    updates.push({
      title: item.title,
      slug: item.id || `up-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
      category: 'Upcoming Releases',
      short_description: `Releasing in theaters on ${item.releaseDate}`,
      content: `The theatrical release of ${item.title} is scheduled for ${item.releaseDate}.`,
      featured_image_url: item.poster,
      author: 'Release Calendar',
      status: 'published',
      tags: 'Upcoming, Theatrical',
      extra_data: {
        releaseDate: item.releaseDate,
        days: item.days,
        hrs: item.hrs,
        mins: item.mins
      },
      published_at: new Date().toISOString()
    });
  });

  return updates;
}

/**
 * Seed initial website data into Supabase updates table if table exists and is empty
 */
export async function seedSupabaseData() {
  try {
    const { data: existing, error: checkErr } = await supabase.from('updates').select('id').limit(1);
    if (checkErr) {
      console.warn('Cannot check updates table in Supabase:', checkErr.message);
      return { success: false, error: checkErr.message };
    }

    if (existing && existing.length > 0) {
      return { success: true, count: existing.length, message: 'Table already populated.' };
    }

    const itemsToInsert = getInitialSeedUpdates();
    const { data, error } = await supabase.from('updates').insert(itemsToInsert).select();

    if (error) {
      console.error('Error seeding data to Supabase:', error);
      return { success: false, error: error.message };
    }

    return { success: true, count: data ? data.length : 0, message: 'Successfully seeded database.' };
  } catch (err) {
    console.error('Seeder exception:', err);
    return { success: false, error: err.message };
  }
}
