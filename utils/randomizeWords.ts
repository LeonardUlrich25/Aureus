// utils/randomizeWords.ts

import { Cluster, Word } from "@/data/vocabulary";

export function getRandomWordsFromCluster(words: Word[], count: number = 4): Word[] {
  const shuffled = [...words].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, words.length));
}

export function getRandomizedClusters(clusters: Cluster[], wordsPerCluster: number = 4): Cluster[] {
  return clusters.map(cluster => ({
    ...cluster,
    words: getRandomWordsFromCluster(cluster.words, wordsPerCluster)
  }));
}
