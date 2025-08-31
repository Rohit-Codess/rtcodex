// Simple toast notification utility for Next.js
// Alternative to react-hot-toast used in your React project

export interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
  className?: string;
}

class Toast {
  private container: HTMLElement | null = null;

  private createContainer() {
    if (this.container) return this.container;
    
    this.container = document.createElement('div');
    this.container.className = 'toast-container fixed top-4 right-4 z-50 space-y-2';
    document.body.appendChild(this.container);
    return this.container;
  }

  private show(message: string, type: 'success' | 'error' | 'info', options: ToastOptions = {}) {
    const container = this.createContainer();
    const toast = document.createElement('div');
    
    const baseClasses = 'px-4 py-3 rounded-lg shadow-lg border transform transition-all duration-300 ease-in-out translate-x-full opacity-0';
    const typeClasses = {
      success: 'bg-green-500/90 border-green-400 text-white',
      error: 'bg-red-500/90 border-red-400 text-white',
      info: 'bg-blue-500/90 border-blue-400 text-white'
    };
    
    toast.className = `${baseClasses} ${typeClasses[type]} ${options.className || ''}`;
    toast.textContent = message;
    
    container.appendChild(toast);
    
    // Animate in
    setTimeout(() => {
      toast.classList.remove('translate-x-full', 'opacity-0');
    }, 10);
    
    // Remove toast
    const duration = options.duration || 5000;
    setTimeout(() => {
      toast.classList.add('translate-x-full', 'opacity-0');
      setTimeout(() => {
        if (container.contains(toast)) {
          container.removeChild(toast);
        }
        // Remove container if empty
        if (container.children.length === 0) {
          document.body.removeChild(container);
          this.container = null;
        }
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.show(message, 'success', options);
  }

  error(message: string, options?: ToastOptions) {
    this.show(message, 'error', options);
  }

  info(message: string, options?: ToastOptions) {
    this.show(message, 'info', options);
  }
}

export const toast = new Toast();