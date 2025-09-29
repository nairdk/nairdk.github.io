// Terminal Portfolio - Interactive JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Terminal typing effect
    const typingText = document.querySelector('.typing-text');
    const loadingText = document.querySelector('.loading');
    
    // Typing animation for the main command
    function typeText(element, text, speed = 100) {
        element.textContent = '';
        let i = 0;
        
        const typeInterval = setInterval(() => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typeInterval);
                // Show loading after typing is complete
                setTimeout(() => {
                    showLoading();
                }, 500);
            }
        }, speed);
    }
    
    // Loading animation
    function showLoading() {
        const dots = ['', '.', '..', '...'];
        let dotIndex = 0;
        const originalText = loadingText.textContent;
        
        const loadingInterval = setInterval(() => {
            loadingText.textContent = originalText + dots[dotIndex];
            dotIndex = (dotIndex + 1) % dots.length;
        }, 400);
        
        // Stop loading after 3 seconds and show portfolio
        setTimeout(() => {
            clearInterval(loadingInterval);
            loadingText.style.display = 'none';
            showPortfolio();
        }, 3000);
    }
    
    // Show portfolio content with fade-in effect
    function showPortfolio() {
        const sections = document.querySelectorAll('.terminal-section, .terminal-nav');
        sections.forEach((section, index) => {
            section.style.opacity = '0';
            section.style.transform = 'translateY(20px)';
            section.style.transition = 'all 0.6s ease';
            
            setTimeout(() => {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }, index * 200);
        });
    }
    
    // Start the typing animation
    setTimeout(() => {
        typeText(typingText, './run_portfolio.sh');
    }, 1000);
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-cmd');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add active state to clicked link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Smooth scroll to section
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Add highlighting effect to target section
                targetSection.style.boxShadow = '0 0 20px rgba(46, 160, 67, 0.3)';
                setTimeout(() => {
                    targetSection.style.boxShadow = 'none';
                }, 2000);
            }
        });
    });
    
    // Interactive terminal prompts - simulate command execution
    const sectionHeaders = document.querySelectorAll('.section-header');
    sectionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const command = this.querySelector('.command');
            if (command) {
                // Add execution effect
                command.style.color = '#2ea043';
                command.style.animation = 'blink 0.5s';
                
                setTimeout(() => {
                    command.style.color = '';
                    command.style.animation = '';
                }, 1000);
            }
        });
    });
    
    // Hover effects for interactive elements
    const interactiveElements = document.querySelectorAll('.project-card, .experience-item, .blog-post');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.borderColor = 'rgba(46, 160, 67, 0.5)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.borderColor = '';
        });
    });
    
    // Terminal cursor blinking effect enhancement
    function enhanceCursor() {
        const cursor = document.querySelector('.cursor');
        if (cursor) {
            // Add random pause in blinking for more realistic effect
            setInterval(() => {
                if (Math.random() > 0.7) {
                    cursor.style.animationDuration = '2s';
                    setTimeout(() => {
                        cursor.style.animationDuration = '1.2s';
                    }, 2000);
                }
            }, 5000);
        }
    }
    
    // Terminal window effects
    function addTerminalEffects() {
        const terminalWindow = document.querySelector('.terminal-window');
        
        // Add subtle glow effect on hover
        terminalWindow.addEventListener('mouseenter', function() {
            this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(46, 160, 67, 0.1)';
        });
        
        terminalWindow.addEventListener('mouseleave', function() {
            this.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
        });
    }
    
    // Social links interaction
    function setupSocialLinks() {
        const githubLink = document.getElementById('githubLink');
        const linkedinLink = document.getElementById('linkedinLink');
        
        // Add click tracking and animations
        const socialLinks = [githubLink, linkedinLink];
        socialLinks.forEach(link => {
            if (link) {
                link.addEventListener('click', function(e) {
                    // Add ripple effect
                    this.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        this.style.transform = 'translateY(-2px)';
                    }, 150);
                });
            }
        });
    }
    
    // Skills tags interactive effect
    function setupSkillsTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        skillTags.forEach(tag => {
            tag.addEventListener('click', function() {
                // Simulate skill selection
                this.style.background = 'rgba(46, 160, 67, 0.8)';
                this.style.color = 'rgba(18, 18, 18, 0.95)';
                
                setTimeout(() => {
                    this.style.background = '';
                    this.style.color = '';
                }, 1500);
            });
        });
    }
    
    // Resume download simulation
    function setupResumeDownload() {
        const downloadBtn = document.getElementById('downloadResume');
        if (downloadBtn) {
            downloadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Simulate download process
                const originalText = this.innerHTML;
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
                this.style.backgroundColor = 'rgba(255, 193, 7, 0.7)';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check"></i> Downloaded!';
                    this.style.backgroundColor = 'rgba(46, 160, 67, 0.8)';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.style.backgroundColor = '';
                    }, 2000);
                }, 2000);
            });
        }
    }
    
    // Matrix-style background effect (subtle)
    function createMatrixEffect() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.style.position = 'fixed';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.zIndex = '-1';
        canvas.style.opacity = '0.05';
        canvas.style.pointerEvents = 'none';
        
        document.body.appendChild(canvas);
        
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        
        const characters = '01';
        const fontSize = 14;
        const columns = Math.floor(canvas.width / fontSize);
        const drops = Array(columns).fill(0);
        
        function draw() {
            ctx.fillStyle = 'rgba(18, 18, 18, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#2ea043';
            ctx.font = `${fontSize}px monospace`;
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;
                
                ctx.fillText(text, x, y);
                
                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                } else {
                    drops[i]++;
                }
            }
        }
        
        setInterval(draw, 100);
    }
    
    // Keyboard shortcuts
    function setupKeyboardShortcuts() {
        document.addEventListener('keydown', function(e) {
            // Ctrl + / or Cmd + / for help
            if ((e.ctrlKey || e.metaKey) && e.key === '/') {
                e.preventDefault();
                showHelp();
            }
            
            // Arrow keys for section navigation
            if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
                const sections = document.querySelectorAll('.terminal-section');
                const currentSection = getCurrentVisibleSection(sections);
                
                if (currentSection !== -1) {
                    let nextSection = e.key === 'ArrowDown' ? currentSection + 1 : currentSection - 1;
                    nextSection = Math.max(0, Math.min(sections.length - 1, nextSection));
                    
                    if (nextSection !== currentSection) {
                        sections[nextSection].scrollIntoView({ behavior: 'smooth' });
                    }
                }
            }
        });
    }
    
    function getCurrentVisibleSection(sections) {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        for (let i = 0; i < sections.length; i++) {
            const section = sections[i];
            const rect = section.getBoundingClientRect();
            if (rect.top <= windowHeight / 2 && rect.bottom >= windowHeight / 2) {
                return i;
            }
        }
        return 0;
    }
    
    function showHelp() {
        const helpText = `
Terminal Portfolio Help:
- Click section headers to execute commands
- Use arrow keys ↑↓ to navigate sections
- Click navigation links for smooth scrolling
- Hover over elements for interactive effects
- Press Ctrl+/ for this help menu
        `;
        
        const helpDiv = document.createElement('div');
        helpDiv.style.position = 'fixed';
        helpDiv.style.top = '50%';
        helpDiv.style.left = '50%';
        helpDiv.style.transform = 'translate(-50%, -50%)';
        helpDiv.style.background = 'rgba(30, 30, 30, 0.95)';
        helpDiv.style.color = 'rgba(200, 200, 200, 0.9)';
        helpDiv.style.padding = '20px';
        helpDiv.style.borderRadius = '8px';
        helpDiv.style.border = '1px solid rgba(68, 68, 68, 0.6)';
        helpDiv.style.fontFamily = 'monospace';
        helpDiv.style.fontSize = '14px';
        helpDiv.style.whiteSpace = 'pre-line';
        helpDiv.style.zIndex = '1000';
        helpDiv.style.backdropFilter = 'blur(10px)';
        helpDiv.textContent = helpText;
        
        document.body.appendChild(helpDiv);
        
        // Remove help after 5 seconds or on click
        const removeHelp = () => {
            if (document.body.contains(helpDiv)) {
                document.body.removeChild(helpDiv);
            }
        };
        
        helpDiv.addEventListener('click', removeHelp);
        setTimeout(removeHelp, 5000);
    }
    
    // Initialize all effects
    enhanceCursor();
    addTerminalEffects();
    setupSocialLinks();
    setupSkillsTags();
    setupResumeDownload();
    setupKeyboardShortcuts();
    
    // Optional: Add subtle matrix effect (uncomment if desired)
    // createMatrixEffect();
    
    // Console easter egg
    console.log(`
    ┌─────────────────────────────────────┐
    │  Welcome to Dipin's Terminal!       │
    │                                     │
    │  Try these commands:                │
    │  • help() - Show available commands │
    │  • skills() - List technical skills │
    │  • contact() - Get contact info     │
    └─────────────────────────────────────┘
    `);
    
    // Console commands
    window.help = () => {
        console.log('Available commands: help(), skills(), contact(), projects()');
    };
    
    window.skills = () => {
        console.log('Skills: JavaScript, Python, React, Node.js, Docker, AWS, and more!');
    };
    
    window.contact = () => {
        console.log('Email: your.email@example.com | GitHub: github.com/nairdk');
    };
    
    window.projects = () => {
        console.log('Check out my projects at /projects/ or scroll to the projects section!');
    };
});