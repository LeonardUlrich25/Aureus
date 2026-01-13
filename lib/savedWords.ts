export interface SavedWord {
  word: string;
  definition: string;
  cluster: string;
  difficulty: number;
  savedAt: string;
}

export class SavedWordsManager {
  private static STORAGE_KEY = 'saved_words';
  
  static async getSavedWords(userId: string): Promise<SavedWord[]> {
    try {
      const key = `${this.STORAGE_KEY}:${userId}`;
      const stored = localStorage.getItem(key);
      return stored ? JSON.parse(stored) : [];
    } catch (err) {
      console.error('Failed to load saved words:', err);
      return [];
    }
  }
  
  static async saveWord(userId: string, word: SavedWord): Promise<void> {
    try {
      const saved = await this.getSavedWords(userId);
      const exists = saved.find(w => w.word === word.word);
      
      if (!exists) {
        saved.push({
          ...word,
          savedAt: new Date().toISOString()
        });
        
        const key = `${this.STORAGE_KEY}:${userId}`;
        localStorage.setItem(key, JSON.stringify(saved));
        console.log('✅ Word saved:', word.word);
      }
    } catch (err) {
      console.error('Failed to save word:', err);
    }
  }
  
  static async unsaveWord(userId: string, wordText: string): Promise<void> {
    try {
      const saved = await this.getSavedWords(userId);
      const filtered = saved.filter(w => w.word !== wordText);
      
      const key = `${this.STORAGE_KEY}:${userId}`;
      localStorage.setItem(key, JSON.stringify(filtered));
      console.log('✅ Word removed:', wordText);
    } catch (err) {
      console.error('Failed to remove word:', err);
    }
  }
  
  static async isWordSaved(userId: string, wordText: string): Promise<boolean> {
    const saved = await this.getSavedWords(userId);
    return saved.some(w => w.word === wordText);
  }
}
