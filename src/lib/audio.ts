/**
 * Futuristic Haptic Audio Engine
 * Programmatically generates UI sound effects using Web Audio API
 */

class HapticEngine {
  private context: AudioContext | null = null;
  private isEnabled: boolean = true;

  constructor() {
    // Context is initialized on first user interaction to satisfy browser policies
  }

  public setEnabled(enabled: boolean) {
    this.isEnabled = enabled;
  }

  private initContext() {
    if (typeof window === 'undefined') return;
    try {
      if (!this.context) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          this.context = new AudioContextClass();
        }
      }
      if (this.context && this.context.state === 'suspended') {
        this.context.resume().catch(() => {
          // Resume can fail if not triggered by user interaction
        });
      }
    } catch (e) {
      console.warn('AudioContext initialization failed:', e);
    }
  }

  /**
   * Plays a subtle, high-frequency haptic click
   * Perfect for button presses or toggles
   */
  public playClick() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.context) return;

      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200, this.context.currentTime);
      osc.frequency.exponentialRampToValueAtTime(400, this.context.currentTime + 0.05);

      gain.gain.setValueAtTime(0.05, this.context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, this.context.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start();
      osc.stop(this.context.currentTime + 0.05);
    } catch (e) {
      // Fail silently if audio is blocked
    }
  }

  /**
   * Plays a soft, resonant "hover" sound
   * Designed for nav items and interactive hover states
   */
  public playHover() {
    if (!this.isEnabled) return;
    try {
      this.initContext();
      if (!this.context) return;

      const osc = this.context.createOscillator();
      const gain = this.context.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.context.currentTime);
      
      gain.gain.setValueAtTime(0, this.context.currentTime);
      gain.gain.linearRampToValueAtTime(0.02, this.context.currentTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.1);

      osc.connect(gain);
      gain.connect(this.context.destination);

      osc.start();
      osc.stop(this.context.currentTime + 0.1);
    } catch (e) {
      // Fail silently
    }
  }
}

export const hapticEngine = new HapticEngine();
