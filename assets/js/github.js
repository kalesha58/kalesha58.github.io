'use strict';

/**
 * GitHub Analytics Component
 * Fetches and displays GitHub statistics
 */

const GitHub = {
  GITHUB_USERNAME: 'kalesha58',

  updateElement: function(id, value, fallback = '0') {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value !== null && value !== undefined ? value : fallback;
    }
  },

  fetchStats: async function() {
    try {
      // Show loading state
      this.updateElement('github-followers', '...');
      this.updateElement('github-repos', '...');
      this.updateElement('github-stars', '...');
      this.updateElement('github-forks', '...');
      this.updateElement('github-stars-earned', '...');

      // Fetch user profile with timeout
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000);

      let userResponse;
      try {
        userResponse = await fetch(`https://api.github.com/users/${this.GITHUB_USERNAME}`, {
          signal: controller.signal,
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        clearTimeout(timeoutId);
      } catch (fetchError) {
        clearTimeout(timeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timeout - please check your internet connection');
        }
        throw fetchError;
      }

      if (!userResponse.ok) {
        if (userResponse.status === 403) {
          throw new Error('Rate limit exceeded - please try again later');
        } else if (userResponse.status === 404) {
          throw new Error('GitHub user not found');
        }
        throw new Error(`Failed to fetch user data: ${userResponse.status}`);
      }

      const userData = await userResponse.json();

      // Update basic stats
      this.updateElement('github-followers', userData.followers || 0);
      this.updateElement('github-repos', userData.public_repos || 0);

      // Fetch all repositories
      const reposController = new AbortController();
      const reposTimeoutId = setTimeout(() => reposController.abort(), 15000);

      let reposResponse;
      try {
        reposResponse = await fetch(`https://api.github.com/users/${this.GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
          signal: reposController.signal,
          headers: { 'Accept': 'application/vnd.github.v3+json' }
        });
        clearTimeout(reposTimeoutId);
      } catch (fetchError) {
        clearTimeout(reposTimeoutId);
        if (fetchError.name === 'AbortError') {
          throw new Error('Request timeout while fetching repositories');
        }
        throw fetchError;
      }

      if (!reposResponse.ok) {
        if (reposResponse.status === 403) {
          throw new Error('Rate limit exceeded - please try again later');
        }
        throw new Error(`Failed to fetch repositories: ${reposResponse.status}`);
      }

      const reposData = await reposResponse.json();

      // Calculate total stars and forks
      let totalStars = 0;
      let totalForks = 0;
      let languageStats = {};

      for (const repo of reposData) {
        totalStars += repo.stargazers_count || 0;
        totalForks += repo.forks_count || 0;

        if (repo.language) {
          languageStats[repo.language] = (languageStats[repo.language] || 0) + 1;
        }
      }

      // Update stars and forks
      this.updateElement('github-stars', totalStars);
      this.updateElement('github-forks', totalForks);
      this.updateElement('github-stars-earned', totalStars);

      // Calculate and display language percentages
      const totalRepos = Object.values(languageStats).reduce((sum, count) => sum + count, 0);
      const languagesArray = Object.entries(languageStats)
        .map(([lang, count]) => ({
          name: lang,
          count: count,
          percentage: totalRepos > 0 ? ((count / totalRepos) * 100).toFixed(1) : '0'
        }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 6);

      const languagesContainer = document.getElementById('github-languages');
      if (languagesContainer) {
        if (languagesArray.length > 0) {
          languagesContainer.innerHTML = languagesArray.map(lang => `
            <div class="language-item">
              <span class="language-name">${lang.name}</span>
              <div class="language-bar">
                <div class="language-fill" style="width: ${lang.percentage}%;"></div>
              </div>
              <span class="language-percentage">${lang.percentage}%</span>
            </div>
          `).join('');
        } else {
          languagesContainer.innerHTML = '<div class="loading-state">No language data available</div>';
        }
      }

      // Update contribution text
      this.updateElement('github-contribution-text', `Total ${totalStars} stars across ${reposData.length} repositories`);

      // Update stats
      this.updateElement('github-commits', 'N/A');
      this.updateElement('github-prs', 'N/A');
      this.updateElement('github-issues', 'N/A');

      // Fetch streaks
      this.fetchStreaks();

    } catch (error) {
      console.error('Error fetching GitHub stats:', error);
      
      const errorMessage = error.message || 'Failed to load';
      this.updateElement('github-followers', 'N/A');
      this.updateElement('github-stars', 'N/A');
      this.updateElement('github-repos', 'N/A');
      this.updateElement('github-forks', 'N/A');
      this.updateElement('github-stars-earned', 'N/A');
      this.updateElement('github-contribution-text', 'Unable to load GitHub data. Please check your connection and try again later.');
      
      const languagesContainer = document.getElementById('github-languages');
      if (languagesContainer) {
        languagesContainer.innerHTML = `<div class="loading-state">Unable to load language data: ${errorMessage}</div>`;
      }
    }
  },

  fetchStreaks: async function() {
    try {
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme") || "dark";
      const graphTheme = currentTheme === "dark" ? "github-compact" : "github-light";
      const contributionImg = document.getElementById('github-contributions');
      
      if (contributionImg) {
        contributionImg.src = `https://github-readme-activity-graph.vercel.app/graph?username=${this.GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true&area=true`;
        contributionImg.onerror = function() {
          this.style.display = 'none';
          const wrapper = document.querySelector('.contribution-graph-wrapper');
          if (wrapper) {
            wrapper.innerHTML = '<div class="loading-state">Unable to load contribution graph. Please check your connection.</div>';
          }
        };
      }

      // Streak data
      this.updateElement('current-streak', '0');
      this.updateElement('current-streak-date', new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
      this.updateElement('total-contributions', 'N/A');
      this.updateElement('contributions-date-range', 'Check graph above');
      this.updateElement('longest-streak', 'N/A');
      this.updateElement('longest-streak-date', 'N/A');

    } catch (error) {
      console.error('Error fetching GitHub streaks:', error);
      this.updateElement('current-streak', 'N/A');
      this.updateElement('total-contributions', 'N/A');
      this.updateElement('longest-streak', 'N/A');
    }
  },

  updateGraphTheme: function(theme) {
    const graphTheme = theme === "dark" ? "github-compact" : "github-light";
    const contributionImg = document.getElementById('github-contributions');
    if (contributionImg) {
      contributionImg.src = `https://github-readme-activity-graph.vercel.app/graph?username=${this.GITHUB_USERNAME}&theme=${graphTheme}&hide_border=true&area=true`;
    }
  },

  init: function() {
    if (document.getElementById('github-followers')) {
      // Wait for DOM to be fully ready
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
          this.fetchStats();
        });
      } else {
        this.fetchStats();
      }
      
      // Listen for theme changes
      window.addEventListener('themeChanged', (event) => {
        this.updateGraphTheme(event.detail.theme);
      });
      
      // Initial theme setup for graph
      const html = document.documentElement;
      const currentTheme = html.getAttribute("data-theme") || "dark";
      const observer = new MutationObserver(() => {
        const newTheme = html.getAttribute("data-theme") || "dark";
        this.updateGraphTheme(newTheme);
      });
      
      observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    }
  }
};

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => GitHub.init());
} else {
  GitHub.init();
}

