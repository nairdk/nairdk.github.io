// Blog-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Blog post filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const blogPosts = document.querySelectorAll('.blog-post');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.dataset.category;
            
            // Update active filter button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter posts
            filterPosts(category);
            
            // Update terminal command display
            updateFilterCommand(category);
        });
    });
    
    function filterPosts(category) {
        blogPosts.forEach(post => {
            const postCategory = post.dataset.category;
            const shouldShow = category === 'all' || postCategory === category;
            
            if (shouldShow) {
                post.classList.remove('hidden');
                post.classList.add('fade-in');
            } else {
                post.classList.add('hidden');
                post.classList.remove('fade-in');
            }
        });
        
        updatePostCount();
    }
    
    function updateFilterCommand(category) {
        const commandElement = document.querySelector('.blog-filters .command');
        if (commandElement) {
            if (category === 'all') {
                commandElement.textContent = 'grep -r "category" *.md';
            } else {
                commandElement.textContent = `grep -r "${category}" *.md`;
            }
        }
    }
    
    function updatePostCount() {
        const visiblePosts = document.querySelectorAll('.blog-post:not(.hidden)');
        const countElement = document.getElementById('postCount');
        if (countElement) {
            countElement.textContent = visiblePosts.length;
        }
    }
    
    // Load more functionality
    const loadMoreBtn = document.querySelector('.load-more-btn');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const loadText = this.querySelector('.load-text');
            const originalText = loadText.textContent;
            
            // Show loading state
            loadText.textContent = 'Loading...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Simulate loading more posts
            setTimeout(() => {
                // In a real implementation, you would fetch more posts here
                loadText.textContent = 'No more posts to load';
                
                setTimeout(() => {
                    this.style.display = 'none';
                }, 1000);
            }, 2000);
        });
    }
    
    // Subscribe form functionality
    const subscribeForm = document.querySelector('.subscribe-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('.email-input');
            const submitBtn = this.querySelector('.subscribe-btn');
            const email = emailInput.value.trim();
            
            if (!email || !isValidEmail(email)) {
                showSubscribeMessage('Please enter a valid email address', 'error');
                return;
            }
            
            // Show loading state
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Subscribing...';
            submitBtn.disabled = true;
            
            // Simulate subscription process
            setTimeout(() => {
                showSubscribeMessage('Successfully subscribed!', 'success');
                emailInput.value = '';
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
    
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    function showSubscribeMessage(message, type) {
        const messageDiv = document.createElement('div');
        messageDiv.textContent = message;
        messageDiv.style.position = 'fixed';
        messageDiv.style.top = '20px';
        messageDiv.style.right = '20px';
        messageDiv.style.padding = '15px 20px';
        messageDiv.style.borderRadius = '6px';
        messageDiv.style.fontFamily = 'monospace';
        messageDiv.style.fontSize = '14px';
        messageDiv.style.zIndex = '1000';
        messageDiv.style.animation = 'slideInRight 0.3s ease';
        
        if (type === 'success') {
            messageDiv.style.background = 'var(--accent-green)';
            messageDiv.style.color = 'var(--bg-primary)';
        } else {
            messageDiv.style.background = 'var(--accent-red)';
            messageDiv.style.color = 'white';
        }
        
        document.body.appendChild(messageDiv);
        
        setTimeout(() => {
            messageDiv.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(messageDiv)) {
                    document.body.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }
    
    // Add CSS for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Blog post hover effects
    blogPosts.forEach(post => {
        const postTitle = post.querySelector('h3 a');
        const postTags = post.querySelectorAll('.tag');
        
        post.addEventListener('mouseenter', function() {
            postTags.forEach(tag => {
                tag.style.borderColor = 'var(--accent-green)';
            });
        });
        
        post.addEventListener('mouseleave', function() {
            postTags.forEach(tag => {
                tag.style.borderColor = 'var(--border-color)';
            });
        });
    });
    
    // Search functionality (basic)
    function addSearchFunctionality() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <div class="section-header">
                <span class="prompt">search@blog:~$</span>
                <span class="command">grep -i "keyword" *.md</span>
            </div>
            <input type="text" class="search-input" placeholder="Search posts...">
        `;
        
        const filtersSection = document.querySelector('.blog-filters');
        filtersSection.parentNode.insertBefore(searchContainer, filtersSection);
        
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            searchPosts(searchTerm);
        });
    }
    
    function searchPosts(searchTerm) {
        blogPosts.forEach(post => {
            const title = post.querySelector('h3 a').textContent.toLowerCase();
            const excerpt = post.querySelector('.post-excerpt').textContent.toLowerCase();
            const tags = Array.from(post.querySelectorAll('.tag')).map(tag => 
                tag.textContent.toLowerCase()
            ).join(' ');
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                excerpt.includes(searchTerm) || 
                tags.includes(searchTerm);
            
            if (matchesSearch) {
                post.classList.remove('hidden');
                post.classList.add('fade-in');
            } else {
                post.classList.add('hidden');
                post.classList.remove('fade-in');
            }
        });
        
        updatePostCount();
    }
    
    // Initialize search functionality
    addSearchFunctionality();
    
    // Add search styling
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .search-container {
            margin-bottom: 30px;
        }
        
        .search-input {
            width: 100%;
            max-width: 400px;
            padding: 10px 15px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            color: var(--text-primary);
            font-family: monospace;
            margin-top: 15px;
        }
        
        .search-input::placeholder {
            color: var(--text-muted);
        }
        
        .search-input:focus {
            outline: none;
            border-color: var(--accent-green);
            box-shadow: 0 0 0 2px rgba(46, 160, 67, 0.2);
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Initialize post count
    updatePostCount();
});