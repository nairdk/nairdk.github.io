// Post-specific JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Code copy functionality
    const copyButtons = document.querySelectorAll('.copy-btn');
    copyButtons.forEach(button => {
        button.addEventListener('click', function() {
            const codeBlock = this.closest('.code-block');
            const code = codeBlock.querySelector('code');
            
            if (code) {
                // Copy to clipboard
                navigator.clipboard.writeText(code.textContent).then(() => {
                    const originalText = this.textContent;
                    this.textContent = 'Copied!';
                    this.style.background = 'var(--accent-green)';
                    
                    setTimeout(() => {
                        this.textContent = originalText;
                        this.style.background = '';
                    }, 2000);
                }).catch(() => {
                    // Fallback for older browsers
                    const textArea = document.createElement('textarea');
                    textArea.value = code.textContent;
                    document.body.appendChild(textArea);
                    textArea.select();
                    document.execCommand('copy');
                    document.body.removeChild(textArea);
                    
                    this.textContent = 'Copied!';
                    setTimeout(() => {
                        this.textContent = 'Copy';
                    }, 2000);
                });
            }
        });
    });
    
    // Like button functionality
    const likeBtn = document.querySelector('.like-btn');
    if (likeBtn) {
        let isLiked = false;
        let likeCount = parseInt(likeBtn.querySelector('span').textContent.match(/\d+/)[0]);
        
        likeBtn.addEventListener('click', function() {
            isLiked = !isLiked;
            
            if (isLiked) {
                likeCount++;
                this.style.color = 'var(--accent-red)';
                this.style.borderColor = 'var(--accent-red)';
                this.style.background = 'rgba(220, 53, 69, 0.1)';
                this.querySelector('i').className = 'fas fa-heart';
            } else {
                likeCount--;
                this.style.color = '';
                this.style.borderColor = '';
                this.style.background = '';
                this.querySelector('i').className = 'far fa-heart';
            }
            
            this.querySelector('span').textContent = `Like (${likeCount})`;
            
            // Add animation
            this.style.transform = 'scale(1.1)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
    
    // Share button functionality
    const shareBtn = document.querySelector('.share-btn');
    if (shareBtn) {
        shareBtn.addEventListener('click', function() {
            if (navigator.share) {
                navigator.share({
                    title: document.title,
                    url: window.location.href
                });
            } else {
                // Fallback - copy URL to clipboard
                navigator.clipboard.writeText(window.location.href).then(() => {
                    const originalText = this.querySelector('span').textContent;
                    this.querySelector('span').textContent = 'Link Copied!';
                    
                    setTimeout(() => {
                        this.querySelector('span').textContent = originalText;
                    }, 2000);
                });
            }
        });
    }
    
    // Smooth scrolling for table of contents
    const tocLinks = document.querySelectorAll('.toc-content a');
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Highlight the section temporarily
                targetSection.style.backgroundColor = 'rgba(46, 160, 67, 0.1)';
                targetSection.style.transition = 'background-color 0.3s ease';
                
                setTimeout(() => {
                    targetSection.style.backgroundColor = '';
                }, 2000);
            }
        });
    });
    
    // Reading progress indicator
    function addReadingProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.position = 'fixed';
        progressBar.style.top = '0';
        progressBar.style.left = '0';
        progressBar.style.width = '0%';
        progressBar.style.height = '3px';
        progressBar.style.background = 'var(--accent-green)';
        progressBar.style.zIndex = '1000';
        progressBar.style.transition = 'width 0.1s ease';
        document.body.appendChild(progressBar);
        
        function updateProgress() {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = Math.min(scrollPercent, 100) + '%';
        }
        
        window.addEventListener('scroll', updateProgress);
        updateProgress();
    }
    
    // Syntax highlighting for code blocks (basic)
    function highlightCode() {
        const codeBlocks = document.querySelectorAll('code');
        codeBlocks.forEach(code => {
            let html = code.innerHTML;
            
            // Highlight JavaScript keywords
            html = html.replace(/\b(const|let|var|function|class|if|else|for|while|return|import|export|async|await|try|catch)\b/g, 
                '<span style="color: var(--accent-blue);">$1</span>');
            
            // Highlight strings
            html = html.replace(/(["'`].*?["'`])/g, 
                '<span style="color: var(--accent-yellow);">$1</span>');
            
            // Highlight comments
            html = html.replace(/(\/\/.*$|\/\*.*?\*\/)/gm, 
                '<span style="color: var(--text-muted); font-style: italic;">$1</span>');
            
            // Highlight numbers
            html = html.replace(/\b(\d+)\b/g, 
                '<span style="color: var(--accent-red);">$1</span>');
            
            code.innerHTML = html;
        });
    }
    
    // Estimated reading time calculation
    function calculateReadingTime() {
        const content = document.querySelector('.post-content');
        if (content) {
            const text = content.textContent;
            const wordsPerMinute = 200;
            const wordCount = text.split(' ').length;
            const readingTime = Math.ceil(wordCount / wordsPerMinute);
            
            const readTimeElement = document.querySelector('.read-time');
            if (readTimeElement) {
                readTimeElement.textContent = `📖 ${readingTime} min read`;
            }
        }
    }
    
    // Add table of contents auto-generation if not present
    function autoGenerateTOC() {
        const existingTOC = document.querySelector('.table-of-contents');
        if (existingTOC) return;
        
        const headings = document.querySelectorAll('.post-content h2, .post-content h3');
        if (headings.length < 3) return;
        
        const tocContainer = document.createElement('nav');
        tocContainer.className = 'table-of-contents';
        tocContainer.innerHTML = `
            <div class="section-header">
                <span class="prompt">toc@post:~$</span>
                <span class="command">grep "^#" post.md</span>
            </div>
            <div class="toc-content">
                <h3>Table of Contents</h3>
                <ol id="auto-toc"></ol>
            </div>
        `;
        
        const postContent = document.querySelector('.post-content');
        postContent.parentNode.insertBefore(tocContainer, postContent);
        
        const tocList = document.getElementById('auto-toc');
        headings.forEach((heading, index) => {
            if (!heading.id) {
                heading.id = `section-${index}`;
            }
            
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${heading.id}`;
            a.textContent = heading.textContent;
            li.appendChild(a);
            tocList.appendChild(li);
        });
    }
    
    // Initialize features
    addReadingProgress();
    highlightCode();
    calculateReadingTime();
    autoGenerateTOC();
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'h' to go to top
        if (e.key === 'h') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Press 'b' to go back to blog
        if (e.key === 'b') {
            const backBtn = document.querySelector('.back-btn');
            if (backBtn) {
                backBtn.click();
            }
        }
        
        // Press 'l' to like
        if (e.key === 'l') {
            const likeBtn = document.querySelector('.like-btn');
            if (likeBtn) {
                likeBtn.click();
            }
        }
    });
    
    // Add scroll-to-top button
    function addScrollToTop() {
        const scrollBtn = document.createElement('button');
        scrollBtn.innerHTML = '↑';
        scrollBtn.style.position = 'fixed';
        scrollBtn.style.bottom = '20px';
        scrollBtn.style.right = '20px';
        scrollBtn.style.width = '50px';
        scrollBtn.style.height = '50px';
        scrollBtn.style.borderRadius = '50%';
        scrollBtn.style.background = 'var(--accent-green)';
        scrollBtn.style.color = 'var(--bg-primary)';
        scrollBtn.style.border = 'none';
        scrollBtn.style.cursor = 'pointer';
        scrollBtn.style.fontSize = '20px';
        scrollBtn.style.opacity = '0';
        scrollBtn.style.visibility = 'hidden';
        scrollBtn.style.transition = 'all 0.3s ease';
        scrollBtn.style.zIndex = '1000';
        
        document.body.appendChild(scrollBtn);
        
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                scrollBtn.style.opacity = '0.8';
                scrollBtn.style.visibility = 'visible';
            } else {
                scrollBtn.style.opacity = '0';
                scrollBtn.style.visibility = 'hidden';
            }
        });
        
        scrollBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        
        scrollBtn.addEventListener('mouseenter', function() {
            this.style.opacity = '1';
            this.style.transform = 'scale(1.1)';
        });
        
        scrollBtn.addEventListener('mouseleave', function() {
            this.style.opacity = '0.8';
            this.style.transform = 'scale(1)';
        });
    }
    
    addScrollToTop();
    
    console.log('Post interactions loaded. Keyboard shortcuts: h (top), b (back), l (like)');
});