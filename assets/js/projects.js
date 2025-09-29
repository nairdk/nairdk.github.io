// Projects-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Project filtering
    const techFilters = document.querySelectorAll('.tech-filter');
    const projectCards = document.querySelectorAll('.project-card');
    const featuredProjects = document.querySelectorAll('.featured-project');
    const sortSelect = document.querySelector('.sort-select');
    
    // Initialize projects data
    let projectsData = Array.from(projectCards).map((card, index) => ({
        element: card,
        name: card.querySelector('h3 a').textContent,
        tech: card.dataset.tech || '',
        date: new Date(2025, 8 - index, 25), // Mock dates
        stars: parseInt(card.querySelector('.stat').textContent.split(' ')[1]) || 0
    }));
    
    // Tech filter functionality
    techFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const tech = this.dataset.tech;
            
            // Update active filter
            techFilters.forEach(f => f.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(tech);
            
            // Update command display
            updateFilterCommand(tech);
        });
    });
    
    function filterProjects(tech) {
        // Filter regular project cards
        projectCards.forEach(card => {
            const cardTech = card.dataset.tech || '';
            const shouldShow = tech === 'all' || cardTech.includes(tech);
            
            if (shouldShow) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
        
        // Filter featured projects
        featuredProjects.forEach(project => {
            const projectTech = project.dataset.tech || '';
            const shouldShow = tech === 'all' || projectTech.includes(tech);
            
            if (shouldShow) {
                project.classList.remove('hidden');
                project.classList.add('fade-in');
            } else {
                project.classList.add('hidden');
                project.classList.remove('fade-in');
            }
        });
        
        updateProjectStats();
    }
    
    function updateFilterCommand(tech) {
        const commandElement = document.querySelector('.project-filters .command');
        if (commandElement) {
            if (tech === 'all') {
                commandElement.textContent = 'grep -r "tech-stack" projects/';
            } else {
                commandElement.textContent = `grep -r "${tech}" projects/`;
            }
        }
    }
    
    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', function() {
            const sortBy = this.value;
            sortProjects(sortBy);
        });
    }
    
    function sortProjects(sortBy) {
        const container = document.querySelector('.projects-grid');
        if (!container) return;
        
        let sortedProjects = [...projectsData];
        
        switch (sortBy) {
            case 'name':
                sortedProjects.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'popular':
                sortedProjects.sort((a, b) => b.stars - a.stars);
                break;
            case 'recent':
                sortedProjects.sort((a, b) => b.date - a.date);
                break;
        }
        
        // Reorder elements in DOM
        sortedProjects.forEach((project, index) => {
            project.element.style.order = index;
        });
        
        // Add animation
        container.classList.add('sorting');
        setTimeout(() => {
            container.classList.remove('sorting');
        }, 500);
    }
    
    // Project card interactions
    projectCards.forEach(card => {
        const projectIcon = card.querySelector('.project-icon');
        const techTags = card.querySelectorAll('.tech-tag');
        
        card.addEventListener('mouseenter', function() {
            // Animate icon
            if (projectIcon) {
                projectIcon.style.transform = 'scale(1.2) rotate(5deg)';
            }
            
            // Highlight tech tags
            techTags.forEach(tag => {
                tag.style.borderColor = 'var(--accent-green)';
                tag.style.backgroundColor = 'rgba(46, 160, 67, 0.1)';
            });
        });
        
        card.addEventListener('mouseleave', function() {
            // Reset icon
            if (projectIcon) {
                projectIcon.style.transform = 'scale(1) rotate(0deg)';
            }
            
            // Reset tech tags
            techTags.forEach(tag => {
                tag.style.borderColor = 'var(--border-color)';
                tag.style.backgroundColor = 'var(--bg-tertiary)';
            });
        });
    });
    
    // Featured project terminal animations
    const featuredTerminals = document.querySelectorAll('.project-terminal');
    featuredTerminals.forEach(terminal => {
        const asciiDemo = terminal.querySelector('.ascii-demo');
        
        terminal.addEventListener('mouseenter', function() {
            if (asciiDemo) {
                asciiDemo.style.color = 'var(--accent-blue)';
                asciiDemo.style.textShadow = '0 0 10px rgba(58, 150, 221, 0.3)';
            }
        });
        
        terminal.addEventListener('mouseleave', function() {
            if (asciiDemo) {
                asciiDemo.style.color = 'var(--accent-green)';
                asciiDemo.style.textShadow = 'none';
            }
        });
    });
    
    // Project links with loading states
    const projectLinks = document.querySelectorAll('.project-link');
    projectLinks.forEach(link => {
        if (link.href === '#' || link.href.includes('example.com')) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
                this.style.opacity = '0.7';
                this.style.pointerEvents = 'none';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Demo Coming Soon';
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.opacity = '1';
                        this.style.pointerEvents = 'auto';
                    }, 2000);
                }, 1500);
            });
        }
    });
    
    // Add search functionality
    function addProjectSearch() {
        const searchContainer = document.createElement('div');
        searchContainer.className = 'project-search';
        searchContainer.innerHTML = `
            <div class="section-header">
                <span class="prompt">search@projects:~$</span>
                <span class="command">grep -i "keyword" */README.md</span>
            </div>
            <input type="text" class="search-input" placeholder="Search projects...">
        `;
        
        const filtersSection = document.querySelector('.project-filters');
        filtersSection.appendChild(searchContainer);
        
        const searchInput = searchContainer.querySelector('.search-input');
        searchInput.addEventListener('input', function(e) {
            const searchTerm = e.target.value.toLowerCase().trim();
            searchProjects(searchTerm);
        });
    }
    
    function searchProjects(searchTerm) {
        projectCards.forEach(card => {
            const title = card.querySelector('h3 a').textContent.toLowerCase();
            const description = card.querySelector('.project-description p').textContent.toLowerCase();
            const tech = card.dataset.tech.toLowerCase();
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tech.includes(searchTerm);
            
            if (matchesSearch) {
                card.classList.remove('hidden');
                card.classList.add('fade-in');
            } else {
                card.classList.add('hidden');
                card.classList.remove('fade-in');
            }
        });
        
        featuredProjects.forEach(project => {
            const title = project.querySelector('.project-title').textContent.toLowerCase();
            const description = project.querySelector('.project-details p').textContent.toLowerCase();
            const tech = project.dataset.tech.toLowerCase();
            
            const matchesSearch = !searchTerm || 
                title.includes(searchTerm) || 
                description.includes(searchTerm) || 
                tech.includes(searchTerm);
            
            if (matchesSearch) {
                project.classList.remove('hidden');
                project.classList.add('fade-in');
            } else {
                project.classList.add('hidden');
                project.classList.remove('fade-in');
            }
        });
        
        updateProjectStats();
    }
    
    // Update project statistics
    function updateProjectStats() {
        const visibleCards = document.querySelectorAll('.project-card:not(.hidden)');
        const visibleFeatured = document.querySelectorAll('.featured-project:not(.hidden)');
        const totalVisible = visibleCards.length + visibleFeatured.length;
        
        // Update active projects count
        const activeProjectsStat = document.querySelector('.projects-stats .stat strong');
        if (activeProjectsStat) {
            activeProjectsStat.textContent = totalVisible;
        }
    }
    
    // Contribution items interactions
    const contributionItems = document.querySelectorAll('.contribution-item');
    contributionItems.forEach(item => {
        const commitHash = item.querySelector('.commit-hash');
        const repoName = item.querySelector('.repo-name');
        
        item.addEventListener('click', function() {
            // Simulate opening GitHub commit
            const hash = commitHash.textContent;
            const repo = repoName.textContent;
            
            // Add clicked effect
            this.style.backgroundColor = 'var(--bg-tertiary)';
            setTimeout(() => {
                this.style.backgroundColor = 'var(--bg-secondary)';
            }, 200);
            
            console.log(`Opening commit ${hash} in ${repo}`);
        });
    });
    
    // Initialize search functionality
    addProjectSearch();
    
    // Add search styling
    const searchStyle = document.createElement('style');
    searchStyle.textContent = `
        .project-search {
            margin-top: 20px;
            padding-top: 20px;
            border-top: 1px solid var(--border-color);
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
        
        .projects-grid.sorting {
            pointer-events: none;
        }
        
        .projects-grid.sorting .project-card {
            transition: all 0.5s ease;
        }
    `;
    document.head.appendChild(searchStyle);
    
    // Initialize project stats
    updateProjectStats();
    
    // Typing animation for the main command
    setTimeout(() => {
        const typingText = document.querySelector('.typing-text');
        if (typingText) {
            const text = typingText.textContent;
            typingText.textContent = '';
            let i = 0;
            
            const typeInterval = setInterval(() => {
                if (i < text.length) {
                    typingText.textContent += text.charAt(i);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 80);
        }
    }, 500);
});