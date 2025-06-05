// TrasteroApp Standalone - JavaScript con Sistema de Autenticación
// Versión 1.1.0 con protección por contraseña

// Utility functions for encryption (basic)
function encryptPassword(password) {
    // Simple Base64 encoding for basic protection
    // In a real app, use proper encryption
    return btoa(password + 'trastero_salt_2024');
}

function verifyPassword(inputPassword, storedHash) {
    return encryptPassword(inputPassword) === storedHash;
}

// Authentication Manager
class AuthManager {
    constructor() {
        this.isAuthenticated = false;
        this.sessionTimeout = 30 * 60 * 1000; // 30 minutes in milliseconds
        this.sessionTimer = null;
    }

    // Check if user is already authenticated
    checkAuthStatus() {
        const lastAuth = localStorage.getItem('trastero_last_auth');
        const sessionToken = sessionStorage.getItem('trastero_session');
        
        if (lastAuth && sessionToken) {
            const lastAuthTime = parseInt(lastAuth);
            const now = Date.now();
            
            if (now - lastAuthTime < this.sessionTimeout) {
                this.isAuthenticated = true;
                this.startSessionTimer();
                return true;
            } else {
                this.logout();
            }
        }
        
        return false;
    }

    // Check if password exists
    hasPassword() {
        return localStorage.getItem('trastero_password') !== null;
    }

    // Set up new password
    setupPassword(password) {
        if (password.length < 4) {
            throw new Error('La contraseña debe tener al menos 4 caracteres');
        }
        
        const hashedPassword = encryptPassword(password);
        localStorage.setItem('trastero_password', hashedPassword);
        return true;
    }

    // Authenticate user
    authenticate(password) {
        const storedPassword = localStorage.getItem('trastero_password');
        
        if (!storedPassword) {
            throw new Error('No hay contraseña configurada');
        }

        if (verifyPassword(password, storedPassword)) {
            this.isAuthenticated = true;
            localStorage.setItem('trastero_last_auth', Date.now().toString());
            sessionStorage.setItem('trastero_session', 'active');
            this.startSessionTimer();
            return true;
        } else {
            throw new Error('Contraseña incorrecta');
        }
    }

    // Change password
    changePassword(currentPassword, newPassword) {
        if (!this.isAuthenticated) {
            throw new Error('No autenticado');
        }

        const storedPassword = localStorage.getItem('trastero_password');
        
        if (!verifyPassword(currentPassword, storedPassword)) {
            throw new Error('Contraseña actual incorrecta');
        }

        if (newPassword.length < 4) {
            throw new Error('La nueva contraseña debe tener al menos 4 caracteres');
        }

        const hashedPassword = encryptPassword(newPassword);
        localStorage.setItem('trastero_password', hashedPassword);
        return true;
    }

    // Start session timer
    startSessionTimer() {
        this.clearSessionTimer();
        
        this.sessionTimer = setTimeout(() => {
            this.logout();
            this.showMessage('Sesión expirada. Por favor, inicia sesión nuevamente.', 'error');
            this.showLoginScreen();
        }, this.sessionTimeout);
    }

    // Clear session timer
    clearSessionTimer() {
        if (this.sessionTimer) {
            clearTimeout(this.sessionTimer);
            this.sessionTimer = null;
        }
    }

    // Logout
    logout() {
        this.isAuthenticated = false;
        this.clearSessionTimer();
        localStorage.removeItem('trastero_last_auth');
        sessionStorage.removeItem('trastero_session');
    }

    // Show message
    showMessage(message, type = 'info') {
        // This will be implemented by the UI manager
        console.log(`${type.toUpperCase()}: ${message}`);
    }

    // Show login screen
    showLoginScreen() {
        document.getElementById('main-app').classList.add('hidden');
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
    }
}

// Login UI Manager
class LoginUI {
    constructor(authManager, onLoginSuccess) {
        this.authManager = authManager;
        this.onLoginSuccess = onLoginSuccess;
        this.isSetupMode = false;
        
        this.initializeElements();
        this.setupEventListeners();
        this.checkInitialState();
    }

    initializeElements() {
        this.loginScreen = document.getElementById('login-screen');
        this.loginForm = document.getElementById('login-form');
        this.passwordInput = document.getElementById('login-password');
        this.togglePasswordBtn = document.getElementById('toggle-password');
        this.loginButton = document.getElementById('login-button');
        this.loginButtonText = document.getElementById('login-button-text');
        this.loginSubtitle = document.getElementById('login-subtitle');
        this.messageContainer = document.getElementById('login-message-container');
    }

    setupEventListeners() {
        // Login form submission
        this.loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleLogin();
        });

        // Password visibility toggle
        this.togglePasswordBtn.addEventListener('click', () => {
            this.togglePasswordVisibility();
        });

        // Enter key handling
        this.passwordInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        });
    }

    checkInitialState() {
        if (!this.authManager.hasPassword()) {
            this.enterSetupMode();
        } else {
            this.enterLoginMode();
        }
    }

    enterSetupMode() {
        this.isSetupMode = true;
        this.loginSubtitle.textContent = 'Configura una contraseña para proteger tus datos';
        this.loginButtonText.textContent = 'Configurar Contraseña';
        this.passwordInput.placeholder = 'Nueva contraseña (mínimo 4 caracteres)';
        this.passwordInput.setAttribute('minlength', '4');
        
        this.showMessage('Primera vez usando TrasteroApp. Configura una contraseña para proteger tus datos.', 'setup');
    }

    enterLoginMode() {
        this.isSetupMode = false;
        this.loginSubtitle.textContent = 'Introduce tu contraseña para acceder';
        this.loginButtonText.textContent = 'Ingresar';
        this.passwordInput.placeholder = 'Contraseña';
        this.passwordInput.removeAttribute('minlength');
    }

    async handleLogin() {
        const password = this.passwordInput.value.trim();
        
        if (!password) {
            this.showMessage('Por favor, introduce una contraseña', 'error');
            return;
        }

        this.setLoading(true);

        try {
            if (this.isSetupMode) {
                if (password.length < 4) {
                    throw new Error('La contraseña debe tener al menos 4 caracteres');
                }
                
                this.authManager.setupPassword(password);
                this.authManager.authenticate(password);
                this.showMessage('Contraseña configurada correctamente', 'success');
            } else {
                this.authManager.authenticate(password);
                this.showMessage('Acceso concedido', 'success');
            }

            // Small delay to show success message
            setTimeout(() => {
                this.onLoginSuccess();
            }, 500);

        } catch (error) {
            this.showMessage(error.message, 'error');
            this.passwordInput.value = '';
            this.passwordInput.focus();
        } finally {
            this.setLoading(false);
        }
    }

    togglePasswordVisibility() {
        const isPassword = this.passwordInput.type === 'password';
        this.passwordInput.type = isPassword ? 'text' : 'password';
        
        const eyeIcon = this.togglePasswordBtn.querySelector('svg');
        if (isPassword) {
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"></path>
            `;
        } else {
            eyeIcon.innerHTML = `
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
            `;
        }
    }

    setLoading(loading) {
        this.loginButton.disabled = loading;
        if (loading) {
            this.loginButtonText.textContent = 'Procesando...';
        } else {
            this.loginButtonText.textContent = this.isSetupMode ? 'Configurar Contraseña' : 'Ingresar';
        }
    }

    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `${type}-message`;
        messageElement.textContent = message;
        
        this.messageContainer.innerHTML = '';
        this.messageContainer.appendChild(messageElement);

        // Auto-hide success messages
        if (type === 'success') {
            setTimeout(() => {
                if (this.messageContainer.contains(messageElement)) {
                    this.messageContainer.removeChild(messageElement);
                }
            }, 3000);
        }
    }

    reset() {
        this.passwordInput.value = '';
        this.messageContainer.innerHTML = '';
        this.setLoading(false);
        this.checkInitialState();
    }
}

// Password Change Modal Manager
class PasswordChangeModal {
    constructor(authManager) {
        this.authManager = authManager;
        this.initializeElements();
        this.setupEventListeners();
    }

    initializeElements() {
        this.modal = document.getElementById('password-modal');
        this.form = document.getElementById('password-change-form');
        this.currentPasswordInput = document.getElementById('current-password');
        this.newPasswordInput = document.getElementById('new-password');
        this.confirmPasswordInput = document.getElementById('confirm-password');
        this.messageContainer = document.getElementById('password-modal-message');
        this.cancelButton = document.getElementById('cancel-password-change');
    }

    setupEventListeners() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handlePasswordChange();
        });

        this.cancelButton.addEventListener('click', () => {
            this.hide();
        });

        // Close modal when clicking outside
        this.modal.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.hide();
            }
        });

        // Escape key to close modal
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !this.modal.classList.contains('hidden')) {
                this.hide();
            }
        });
    }

    show() {
        this.modal.classList.remove('hidden');
        this.currentPasswordInput.focus();
        this.clearForm();
    }

    hide() {
        this.modal.classList.add('hidden');
        this.clearForm();
    }

    clearForm() {
        this.form.reset();
        this.messageContainer.innerHTML = '';
    }

    async handlePasswordChange() {
        const currentPassword = this.currentPasswordInput.value;
        const newPassword = this.newPasswordInput.value;
        const confirmPassword = this.confirmPasswordInput.value;

        // Validation
        if (!currentPassword || !newPassword || !confirmPassword) {
            this.showMessage('Todos los campos son obligatorios', 'error');
            return;
        }

        if (newPassword.length < 4) {
            this.showMessage('La nueva contraseña debe tener al menos 4 caracteres', 'error');
            return;
        }

        if (newPassword !== confirmPassword) {
            this.showMessage('Las contraseñas no coinciden', 'error');
            return;
        }

        if (currentPassword === newPassword) {
            this.showMessage('La nueva contraseña debe ser diferente a la actual', 'error');
            return;
        }

        try {
            this.authManager.changePassword(currentPassword, newPassword);
            this.showMessage('Contraseña cambiada correctamente', 'success');
            
            setTimeout(() => {
                this.hide();
            }, 1500);

        } catch (error) {
            this.showMessage(error.message, 'error');
        }
    }

    showMessage(message, type = 'info') {
        const messageElement = document.createElement('div');
        messageElement.className = `${type}-message`;
        messageElement.textContent = message;
        
        this.messageContainer.innerHTML = '';
        this.messageContainer.appendChild(messageElement);
    }
}

// Main TrasteroApp Class (with authentication integration)
class TrasteroApp {
    constructor() {
        this.items = [];
        this.editingId = null;
        this.editValue = '';
        this.deletingId = null;

        // Initialize authentication
        this.authManager = new AuthManager();
        this.authManager.showMessage = (message, type) => this.showGlobalMessage(message, type);
        this.authManager.showLoginScreen = () => this.showLoginScreen();

        // Initialize login UI
        this.loginUI = new LoginUI(this.authManager, () => this.onLoginSuccess());

        // Initialize password change modal
        this.passwordChangeModal = new PasswordChangeModal(this.authManager);

        // Check if already authenticated
        if (this.authManager.checkAuthStatus()) {
            this.onLoginSuccess();
        } else {
            this.showLoginScreen();
        }
    }

    showLoginScreen() {
        document.getElementById('main-app').classList.add('hidden');
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('login-screen').classList.remove('hidden');
        this.loginUI.reset();
    }

    onLoginSuccess() {
        // Hide login screen and show loading
        document.getElementById('login-screen').classList.add('hidden');
        document.getElementById('loading-screen').classList.remove('hidden');

        // Initialize the main app
        setTimeout(() => {
            this.initializeMainApp();
        }, 1000);
    }

    initializeMainApp() {
        // Initialize elements
        this.initializeElements();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Load data and render
        this.loadItems();
        this.render();
        this.updateStats();

        // Hide loading screen and show main app
        document.getElementById('loading-screen').classList.add('hidden');
        document.getElementById('main-app').classList.remove('hidden');
    }

    initializeElements() {
        // Form elements
        this.addForm = document.getElementById('add-item-form');
        this.itemNameInput = document.getElementById('item-name');
        this.itemLocationInput = document.getElementById('item-location');
        this.addButton = document.getElementById('add-button');
        
        // Search elements
        this.searchInput = document.getElementById('search-input');
        
        // List elements
        this.itemsContainer = document.getElementById('items-container');
        this.totalItemsElement = document.getElementById('total-items');
        
        // Export/Import elements
        this.exportButton = document.getElementById('export-btn');
        this.importInput = document.getElementById('import-input');

        // Auth elements
        this.logoutButton = document.getElementById('logout-btn');
        this.changePasswordButton = document.getElementById('change-password-btn');
    }

    setupEventListeners() {
        // Add form submission
        this.addForm.addEventListener('submit', (e) => {
            e.preventDefault();
            this.addItem();
        });

        // Search functionality
        this.searchInput.addEventListener('input', () => {
            this.render();
        });

        // Export/Import functionality
        this.exportButton.addEventListener('click', () => {
            this.exportData();
        });

        this.importInput.addEventListener('change', (e) => {
            this.importData(e);
        });

        // Auth functionality
        this.logoutButton.addEventListener('click', () => {
            this.logout();
        });

        this.changePasswordButton.addEventListener('click', () => {
            this.passwordChangeModal.show();
        });

        // Items list event delegation
        this.setupItemsEventDelegation();
    }

    logout() {
        if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
            this.authManager.logout();
            this.showLoginScreen();
        }
    }

    showGlobalMessage(message, type) {
        // You can implement a global notification system here
        // For now, we'll use a simple alert for critical messages
        if (type === 'error') {
            alert(message);
        }
    }

    // Generate unique ID
    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    // Add new item
    addItem() {
        const name = this.itemNameInput.value.trim();
        const location = this.itemLocationInput.value.trim();

        if (!name || !location) {
            alert('Por favor, completa todos los campos');
            return;
        }

        const newItem = {
            id: this.generateId(),
            name: name,
            location: location,
            dateAdded: new Date().toLocaleDateString('es-ES')
        };

        this.items.unshift(newItem);
        this.saveItems();
        this.render();
        this.updateStats();

        // Clear form
        this.addForm.reset();
        this.itemNameInput.focus();

        // Show success animation
        this.addButton.style.background = '#10b981';
        this.addButton.textContent = '¡Agregado!';
        setTimeout(() => {
            this.addButton.style.background = '#2563eb';
            this.addButton.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                </svg>
                Agregar Objeto
            `;
        }, 1000);
    }

    // Get filtered items based on search
    getFilteredItems() {
        const searchTerm = this.searchInput.value.toLowerCase();
        if (!searchTerm) return this.items;

        return this.items.filter(item => 
            item.name.toLowerCase().includes(searchTerm) ||
            item.location.toLowerCase().includes(searchTerm)
        );
    }

    // Render items list
    render() {
        const filteredItems = this.getFilteredItems();
        
        if (filteredItems.length === 0) {
            this.renderEmptyState();
            return;
        }

        const html = filteredItems.map(item => this.renderItem(item)).join('');
        this.itemsContainer.innerHTML = html;
    }

    // Render single item
    renderItem(item) {
        const isEditing = this.editingId === item.id;
        const isDeleting = this.deletingId === item.id;

        if (isDeleting) {
            return `
                <div class="item-card confirm-delete">
                    <div class="item-header">
                        <div class="item-name">¿Eliminar "${this.escapeHtml(item.name)}"?</div>
                    </div>
                    <p>Esta acción no se puede deshacer.</p>
                    <div class="confirm-actions">
                        <button class="btn confirm-btn" data-action="confirm-delete" data-id="${item.id}">
                            Eliminar
                        </button>
                        <button class="btn cancel-btn" data-action="cancel-delete">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
        }

        if (isEditing) {
            return `
                <div class="item-card">
                    <input 
                        type="text" 
                        class="edit-input" 
                        value="${this.escapeHtml(this.editValue)}"
                        data-id="${item.id}"
                        autofocus
                    >
                    <div class="edit-actions">
                        <button class="btn btn-primary" data-action="save-edit">
                            Guardar
                        </button>
                        <button class="btn btn-secondary" data-action="cancel-edit">
                            Cancelar
                        </button>
                    </div>
                </div>
            `;
        }

        return `
            <div class="item-card">
                <div class="item-header">
                    <div class="item-name">${this.escapeHtml(item.name)}</div>
                    <div class="item-actions">
                        <button class="btn-icon edit" data-action="start-edit" data-id="${item.id}" title="Editar">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                            </svg>
                        </button>
                        <button class="btn-icon delete" data-action="start-delete" data-id="${item.id}" title="Eliminar">
                            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="item-location">${this.escapeHtml(item.location)}</div>
                <div class="item-date">Agregado el ${item.dateAdded}</div>
            </div>
        `;
    }

    // Render empty state
    renderEmptyState() {
        const searchTerm = this.searchInput.value.trim();
        const message = searchTerm 
            ? `No se encontraron objetos que coincidan con "${searchTerm}"`
            : 'No hay objetos registrados aún';

        this.itemsContainer.innerHTML = `
            <div class="empty-state">
                <svg class="empty-state-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="64" height="64">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <p>${message}</p>
                ${!searchTerm ? '<p class="text-sm">Agrega tu primer objeto usando el formulario de arriba</p>' : ''}
            </div>
        `;
    }

    // Setup event delegation for items list
    setupItemsEventDelegation() {
        const container = this.itemsContainer;
        
        // Handle button clicks
        container.addEventListener('click', (e) => {
            const action = e.target.closest('[data-action]')?.dataset.action;
            const id = e.target.closest('[data-id]')?.dataset.id;
            
            if (!action) return;
            
            switch (action) {
                case 'start-edit':
                    this.handleEditStart(id);
                    break;
                case 'save-edit':
                    this.handleEditSave();
                    break;
                case 'cancel-edit':
                    this.handleEditCancel();
                    break;
                case 'start-delete':
                    this.handleDeleteStart(id);
                    break;
                case 'confirm-delete':
                    this.handleDeleteConfirm(id);
                    break;
                case 'cancel-delete':
                    this.handleDeleteCancel();
                    break;
            }
        });
        
        // Handle edit input changes
        container.addEventListener('input', (e) => {
            if (e.target.matches('input[data-id]')) {
                this.editValue = e.target.value;
            }
        });
        
        // Handle edit input key events
        container.addEventListener('keydown', (e) => {
            if (e.target.matches('input[data-id]')) {
                if (e.key === 'Enter') {
                    this.handleEditSave();
                } else if (e.key === 'Escape') {
                    this.handleEditCancel();
                }
            }
        });
    }

    // Edit handlers
    handleEditStart(id) {
        if (this.editingId || this.deletingId) return;
        
        const item = this.items.find(item => item.id === id);
        if (!item) return;
        
        this.editingId = id;
        this.editValue = item.name;
        this.render();
    }

    handleEditSave() {
        if (!this.editingId) return;
        
        const newValue = this.editValue.trim();
        if (!newValue) {
            alert('El nombre no puede estar vacío');
            return;
        }
        
        const item = this.items.find(item => item.id === this.editingId);
        if (item) {
            item.name = newValue;
            this.saveItems();
        }
        
        this.editingId = null;
        this.editValue = '';
        this.render();
    }

    handleEditCancel() {
        this.editingId = null;
        this.editValue = '';
        this.render();
    }

    // Delete handlers
    handleDeleteStart(id) {
        if (this.editingId || this.deletingId) return;
        
        this.deletingId = id;
        this.render();
    }

    handleDeleteConfirm(id) {
        this.items = this.items.filter(item => item.id !== id);
        this.saveItems();
        this.deletingId = null;
        this.render();
        this.updateStats();
    }

    handleDeleteCancel() {
        this.deletingId = null;
        this.render();
    }

    // Data persistence
    saveItems() {
        try {
            localStorage.setItem('trastero_items', JSON.stringify(this.items));
        } catch (error) {
            console.error('Error saving items:', error);
            alert('Error al guardar los datos');
        }
    }

    loadItems() {
        try {
            const stored = localStorage.getItem('trastero_items');
            this.items = stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Error loading items:', error);
            this.items = [];
        }
    }

    // Stats
    updateStats() {
        this.totalItemsElement.textContent = this.items.length;
    }

    // Export functionality
    exportData() {
        try {
            const data = {
                items: this.items,
                exportDate: new Date().toISOString(),
                version: '1.1.0'
            };
            
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            
            const a = document.createElement('a');
            a.href = url;
            a.download = `trastero-datos-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            
            URL.revokeObjectURL(url);
            
            // Show success feedback
            const originalText = this.exportButton.innerHTML;
            this.exportButton.innerHTML = `
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                ¡Exportado!
            `;
            
            setTimeout(() => {
                this.exportButton.innerHTML = originalText;
            }, 2000);
            
        } catch (error) {
            console.error('Error exporting data:', error);
            alert('Error al exportar los datos');
        }
    }

    // Import functionality
    importData(event) {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const data = JSON.parse(e.target.result);
                
                // Validate data structure
                if (!data.items || !Array.isArray(data.items)) {
                    throw new Error('Formato de archivo inválido');
                }
                
                // Validate items structure
                const validItems = data.items.filter(item => 
                    item && 
                    typeof item.name === 'string' && 
                    typeof item.location === 'string'
                );
                
                if (validItems.length === 0) {
                    throw new Error('No se encontraron elementos válidos en el archivo');
                }
                
                // Ensure all items have required fields
                const normalizedItems = validItems.map(item => ({
                    id: item.id || this.generateId(),
                    name: item.name.trim(),
                    location: item.location.trim(),
                    dateAdded: item.dateAdded || new Date().toLocaleDateString('es-ES')
                }));
                
                // Confirm import
                const confirmMessage = `¿Importar ${normalizedItems.length} elementos?\n\nEsto reemplazará todos los datos actuales.`;
                
                if (confirm(confirmMessage)) {
                    this.items = normalizedItems;
                    this.saveItems();
                    this.render();
                    this.updateStats();
                    
                    alert(`Importación exitosa: ${normalizedItems.length} elementos importados`);
                }
                
            } catch (error) {
                console.error('Error importing data:', error);
                alert('Error al importar: ' + error.message);
            }
            
            // Clear file input
            event.target.value = '';
        };
        
        reader.readAsText(file);
    }

    // Escape HTML to prevent XSS
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TrasteroApp();
});
