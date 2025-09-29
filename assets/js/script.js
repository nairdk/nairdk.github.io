// Terminal Portfolio - Interactive JavaScript

// ===== SECTION VISIBILITY CONFIGURATION =====
// Set to false to hide sections, true to show them
const SECTION_CONFIG = {
    projects: false,    // Show/hide projects section
    blog: false        // Show/hide blog section
};
// ============================================

// Theme toggle functionality
function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Update toggle button icon classes
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (newTheme === 'light') {
            themeIcon.className = 'theme-icon theme-icon-light';
        } else {
            themeIcon.className = 'theme-icon theme-icon-dark';
        }
    }
    
    return `Theme switched to ${newTheme} mode`;
}

// Load saved theme on page load
function loadTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    const themeIcon = document.getElementById('themeIcon');
    if (themeIcon) {
        if (savedTheme === 'light') {
            themeIcon.className = 'theme-icon theme-icon-light';
        } else {
            themeIcon.className = 'theme-icon theme-icon-dark';
        }
    }
}

// Keyboard shortcut for theme toggle
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        toggleTheme();
    }
});

// Apply section visibility based on configuration
function applySectionConfig() {
    const navCommands = document.querySelector('.nav-commands');
    
    // First, handle section visibility
    Object.keys(SECTION_CONFIG).forEach(sectionId => {
        const section = document.getElementById(sectionId);
        const navLink = document.querySelector(`a[href="#${sectionId}"]`);
        
        if (section && navLink) {
            if (SECTION_CONFIG[sectionId]) {
                section.style.display = 'block';
                navLink.style.display = 'inline';
            } else {
                section.style.display = 'none';
                navLink.style.display = 'none';
            }
        }
    });
    
    // Rebuild navigation to clean up pipes
    if (navCommands) {
        const allLinks = navCommands.querySelectorAll('.nav-cmd');
        const visibleLinks = Array.from(allLinks).filter(link => 
            window.getComputedStyle(link).display !== 'none'
        );
        
        // Rebuild the navigation with proper separators
        let newHTML = '';
        visibleLinks.forEach((link, index) => {
            newHTML += link.outerHTML;
            if (index < visibleLinks.length - 1) {
                newHTML += ' <span style="color: var(--text-muted); margin: 0 2px;">|</span> ';
            }
        });
        
        navCommands.innerHTML = newHTML;
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Load theme and apply section configuration first
    loadTheme();
    applySectionConfig();
    
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
                // Let the download proceed naturally, but add visual feedback
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
                }, 1000);
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
    
    // Interactive Terminal Functionality
    setupInteractiveTerminal();
    
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
        console.log('Email: dipin.nair@example.com | GitHub: github.com/nairdk');
    };
    
    window.projects = () => {
        console.log('Check out my projects at /projects/ or scroll to the projects section!');
    };
    
    // Interactive Terminal Setup
    function setupInteractiveTerminal() {
        const terminalInput = document.querySelector('.terminal-input');
        const terminalOutput = document.getElementById('terminalOutput');
        let commandHistory = [];
        let historyIndex = -1;
        
        if (!terminalInput || !terminalOutput) return;
        
        // Terminal commands
        const commands = {
            'help': {
                description: 'Show available commands',
                action: () => `Available commands:
• theme - Switch between light/dark themes
• about - Show information about me
• skills - Display technical skills
• experience - View work experience
• education - Show educational background
• projects - Browse my projects
• blog - Read my blog posts
• resume - Download my resume
• contact - Get my contact information

• help, clear, whoami, pwd, ls, echo, date

Use Ctrl+T to quickly toggle theme or click the button in terminal header.`
            },
            'theme': {
                description: 'Toggle between light/dark themes',
                action: () => {
                    toggleTheme();
                    return 'Theme toggled! You can also use Ctrl+T or the button in the terminal header.';
                }
            },
            
            about: {
                description: 'Show information about Dipin',
                action: () => `Software Developer with 6+ years of experience in Python and C++ specializing in simulation software and automation.
Currently R&D Engineer II at Ansys, core contributor to Ansys Mechanical software and PyMechanical maintainer.
Strong mathematical background with expertise in robotics, AI, and DevOps workflows.`
            },
            
            skills: {
                description: 'List technical skills',
                action: () => `Technical Skills:
• Programming: C/C++, Python, JavaScript, HTML, CSS, MATLAB, XML, SQL, LaTeX
• Tools: Visual Studio, VS Code, Git, Microsoft Azure, Linux, GitHub, CI/CD, Jupyter
• CAE Software: Ansys, Abaqus, SimLab, Hypermesh, UG NX
• Specialties: PyAnsys Libraries, Simulation Software, Automation, DevOps
• Soft Skills: Problem-solving, Leadership, Six Sigma Black Belt`
            },
            
            projects: {
                description: 'Show recent projects',
                action: () => `Recent Projects:
• PyAnsys Open Source Libraries - Core contributor to simulation software packages
• Classification of Rice using AI - Genetic Fuzzy Cascading system with 94.36% accuracy
• Real-time Path Planning - Dijkstra and A* algorithms for dynamic obstacle avoidance
• MASTA Efficiency Modules - 12 different C++ modules for transmission optimization
• SimLab Automation - JavaScript-based meshing automation for simulation analysis
Type 'open projects' to view detailed project information.`
            },
            
            blog: {
                description: 'Show recent blog posts',
                action: () => `Recent Blog Posts:
• Building Scalable Web Applications - Architecture patterns and best practices
• My Journey with React Hooks - From class components to hooks
• Docker Best Practices - Production deployment strategies
Type 'open blog' to view all posts.`
            },
            
            contact: {
                description: 'Show contact information',
                action: () => `Contact Information:
📧 Email: dipinknair619@gmail.com
🐙 GitHub: github.com/dipinknair
💼 LinkedIn: linkedin.com/in/dipinknair619
📱 Phone: +1 (513) 620-0022
📍 Location: Austin, TX`
            },
            
            education: {
                description: 'Show educational background',
                action: () => `Educational Background:
[2021-2023] Master of Science in Mechanical Engineering
🎓 University of Cincinnati
• GPA: 4.0/4.0 (Perfect GPA)
• Specialization: Engineering Simulation and Automation
• Research: AI Techniques for Classification Systems

[2012-2016] Bachelor of Technology in Mechanical Engineering
🎓 Indian Institute of Technology, Hyderabad
• GPA: 8.24/10
• Strong foundation in Engineering Mathematics and Physics
• Technical projects in manufacturing and automation systems`
            },
            
            experience: {
                description: 'Show work experience',
                action: () => `Work Experience:
[2023-present] R&D Engineer II - Ansys Inc.
• Developed PyAnsys Open Source Libraries and supported Ansys Mechanical production
• Conducted Scrum meetings for PyMechanical Python package
• Worked with Linear Dynamics team for new ANSYS Mechanical features
• Made major contributions through Azure and ARM testing

[2016-2020] Senior Engineer - General Motors
• Earned Design for Six Sigma Black Belt supervising 2 projects
• Coordinated 12 efficiency modules in MASTA using C++
• Led team of 4 to automate meshing in SimLab with JavaScript
• Automated Abaqus modeling reducing 85% of man hours`
            },
            
            resume: {
                description: 'Download resume',
                action: () => {
                    // Trigger actual resume download
                    const link = document.createElement('a');
                    link.href = 'assets/documents/resume.pdf';
                    link.download = 'Dipin_Nair_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                    return 'Resume download initiated...';
                }
            },
            
            open: {
                description: 'Open a section (projects, blog, etc.)',
                action: (args) => {
                    const section = args[0]?.toLowerCase();
                    switch (section) {
                        case 'projects':
                            window.location.href = 'projects/';
                            return 'Opening projects page...';
                        case 'blog':
                            window.location.href = 'blog/';
                            return 'Opening blog page...';
                        case 'github':
                            window.open('https://github.com/nairdk', '_blank');
                            return 'Opening GitHub profile...';
                        case 'linkedin':
                            window.open('https://linkedin.com/in/dipin-nair', '_blank');
                            return 'Opening LinkedIn profile...';
                        default:
                            return `Unknown section: ${section}. Try 'open projects', 'open blog', 'open github', or 'open linkedin'.`;
                    }
                }
            },
            
            goto: {
                description: 'Navigate to a section (about, projects, blog, contact)',
                action: (args) => {
                    const section = args[0]?.toLowerCase();
                    const element = document.getElementById(section);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        return `Navigating to ${section} section...`;
                    }
                    return `Section '${section}' not found. Try: about, experience, projects, blog, resume, contact`;
                }
            },
            
            clear: {
                description: 'Clear terminal output',
                action: () => {
                    terminalOutput.innerHTML = '';
                    terminalOutput.classList.remove('visible');
                    return '';
                }
            },
            
            date: {
                description: 'Show current date',
                action: () => new Date().toLocaleString()
            },
            
            whoami: {
                description: 'Show current user',
                action: () => 'terminal@dipin'
            },
            
            pwd: {
                description: 'Print working directory',
                action: () => '/home/dipin/portfolio'
            },
            
            ls: {
                description: 'List directory contents',
                action: () => `total 8
drwxr-xr-x  about/
drwxr-xr-x  experience/
drwxr-xr-x  projects/
drwxr-xr-x  blog/
-rw-r--r--  resume.pdf
drwxr-xr-x  contact/`
            },
            
            echo: {
                description: 'Display text',
                action: (args) => args.join(' ') || ''
            }
        };
        
        // Handle command input
        terminalInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const command = this.value.trim();
                
                if (command) {
                    executeCommand(command);
                    commandHistory.unshift(command);
                    if (commandHistory.length > 50) commandHistory.pop();
                    historyIndex = -1;
                }
                
                this.value = '';
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    this.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    this.value = commandHistory[historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    this.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                // Auto-complete functionality
                const partial = this.value.toLowerCase();
                const matches = Object.keys(commands).filter(cmd => cmd.startsWith(partial));
                if (matches.length === 1) {
                    this.value = matches[0];
                } else if (matches.length > 1) {
                    addToOutput(`visitor@dipin-portfolio:~$ ${this.value}`, 'command');
                    addToOutput(`Possible completions: ${matches.join(', ')}`, 'response');
                }
            }
        });
        
        function executeCommand(input) {
            const [commandName, ...args] = input.split(' ');
            const command = commands[commandName.toLowerCase()];
            
            // Show the command in terminal
            addToOutput(`terminal@dipin:~$ ${input}`, 'command');
            
            if (command) {
                const result = command.action(args);
                if (result) {
                    addToOutput(result, 'response');
                }
            } else {
                addToOutput(`Command not found: ${commandName}. Type 'help' for available commands.`, 'error');
            }
            
            // Auto-scroll to bottom
            terminalOutput.scrollTop = terminalOutput.scrollHeight;
        }
        
        function addToOutput(text, type = 'response') {
            terminalOutput.classList.add('visible');
            const line = document.createElement('div');
            line.className = `output-line ${type}`;
            line.textContent = text;
            terminalOutput.appendChild(line);
        }
        
        // Show welcome message
        setTimeout(() => {
            addToOutput("Welcome to Dipin's Interactive Portfolio Terminal!", 'success');
            addToOutput("Type 'help' to see available commands or 'about' to learn more about me.", 'response');
        }, 2000);
    }
});