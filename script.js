(function() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('sidebarToggle');
    const menuItems = document.querySelectorAll('#mainMenu li');
    const breakpoint = 768; // pixels

    // Function to set collapsed state based on window width
    function setCollapsedByWidth() {
      if (window.innerWidth <= breakpoint) {
        sidebar.classList.add('collapsed');
      } else {
        sidebar.classList.remove('collapsed');
      }
    }

    // Run on initial load
    setCollapsedByWidth();

    // Listen for resize events
    window.addEventListener('resize', setCollapsedByWidth);

    // Manual toggle button: switch class regardless, but also save state?
    toggleBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      sidebar.classList.toggle('collapsed');
      // (optional) you could store user preference, but we let resize override later
    });

    // Menu item active state
    //function setActive(clickedItem) {
      //menuItems.forEach(item => item.classList.remove('active'));
      //clickedItem.classList.add('active');
    //}

    menuItems.forEach(item => {
      item.addEventListener('click', function() {
        setActive(this);
        console.log('menu:', this.querySelector('span')?.innerText.trim() || this.dataset.label);
      });
    });

    // Card clicks
    document.querySelectorAll('.option-card').forEach(card => {
      card.addEventListener('click', () => {
        console.log('option card:', card.querySelector('span')?.innerText);
      });
    });

    // Filter chips
    document.querySelectorAll('.filter-item').forEach(chip => {
      chip.addEventListener('click', () => {
        console.log('filter chip:', chip.innerText.trim());
      });
    });

    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    document.querySelectorAll('.menu li a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.parentElement.classList.add('active');
    }
});
// ---------- CUSTOM DROPDOWNS ----------
    const dropdowns = document.querySelectorAll('.custom-dropdown');

    // Close all dropdowns
    function closeAllDropdowns(except = null) {
      dropdowns.forEach(drop => {
        const menu = drop.querySelector('.dropdown-menu');
        const btn = drop.querySelector('.dropdown-btn');
        if (except && drop === except) return;
        if (menu) menu.classList.remove('show');
        if (btn) btn.classList.remove('active');
      });
    }

    // Toggle a specific dropdown
    function toggleDropdown(drop) {
      const menu = drop.querySelector('.dropdown-menu');
      const btn = drop.querySelector('.dropdown-btn');
      if (!menu || !btn) return;

      const isOpen = menu.classList.contains('show');
      closeAllDropdowns(); // close others
      if (!isOpen) {
        menu.classList.add('show');
        btn.classList.add('active');
      } else {
        menu.classList.remove('show');
        btn.classList.remove('active');
      }
    }

    // Handle button click
    dropdowns.forEach(drop => {
      const btn = drop.querySelector('.dropdown-btn');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleDropdown(drop);
      });

      // Handle option selection
      const menu = drop.querySelector('.dropdown-menu');
      menu.querySelectorAll('li').forEach(item => {
        item.addEventListener('click', (e) => {
          e.stopPropagation();
          const value = item.dataset.value;
          const text = item.innerText;
          // Update button text (keep the arrow)
          btn.innerHTML = `${text} <i class="fas fa-chevron-down"></i>`;
          // Close dropdown
          menu.classList.remove('show');
          btn.classList.remove('active');
          // Log or trigger action
          console.log(`${drop.id} selected:`, value);
        });
      });
    });

     const userAvatar = document.getElementById('userAvatar');
    const userDropdown = document.getElementById('userDropdown');

    userAvatar.addEventListener('click', (e) => {
      e.stopPropagation();
      userDropdown.classList.toggle('show');
    });

    // Close user dropdown when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.user-menu')) {
        userDropdown.classList.remove('show');
      }
    });

    // Prevent closing when clicking inside dropdown
    userDropdown.addEventListener('click', (e) => e.stopPropagation());

    // User dropdown options (example actions)
    userDropdown.querySelectorAll('li').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.innerText.trim();
        console.log(`User menu: ${action}`);
        userDropdown.classList.remove('show');
        // Here you can add actual navigation or actions
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.custom-dropdown')) {
        closeAllDropdowns();
      }
    });

    // Prevent closing when clicking inside dropdown menu
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.addEventListener('click', (e) => e.stopPropagation());
    });
  })();