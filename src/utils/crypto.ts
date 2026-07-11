export interface GeneratorOptions {
  length: number;
  uppercase: boolean;
  lowercase: boolean;
  numbers: boolean;
  symbols: boolean;
  avoidAmbiguous: boolean;
}

export function generateSecurePassword(options: GeneratorOptions): string {
  let charPool = '';
  
  // Define character sets, filtering out lookalike characters if checked
  if (options.uppercase) charPool += options.avoidAmbiguous ? 'ABCDEFGHJKLMNPQRSTUVWXYZ' : 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  if (options.lowercase) charPool += options.avoidAmbiguous ? 'abcdefghijkmnpqrstuvwxyz' : 'abcdefghijklmnopqrstuvwxyz';
  if (options.numbers) charPool += options.avoidAmbiguous ? '23456789' : '0123456789';
  if (options.symbols) charPool += '!@#$%^&*()_+-=[]{}|;:,.<>?';

  if (!charPool) return '';

  // Allocate space for secure random numbers
  const randomValues = new Uint32Array(options.length);
  window.crypto.getRandomValues(randomValues);

  let password = '';
  for (let i = 0; i < options.length; i++) {
    // Select index safely using modulo arithmetic over true random integers
    const randomIndex = randomValues[i] % charPool.length;
    password += charPool.charAt(randomIndex);
  }

  return password;
}
