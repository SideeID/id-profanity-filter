/**
 * Implementasi algoritma Aho-Corasick untuk pencocokan string
 * Algoritma ini memungkinkan pencarian banyak pola dalam satu kali pembacaan teks
 */

interface AhoCorasickNode {
  children: Map<string, AhoCorasickNode>;
  fail: AhoCorasickNode | null;
  output: Set<string>;
  depth: number;
  char?: string;
}

export class AhoCorasick {
  private root: AhoCorasickNode;
  private built: boolean = false;

  constructor() {
    this.root = {
      children: new Map(),
      fail: null,
      output: new Set(),
      depth: 0,
    };
  }

  /**
   * Menambahkan pola ke dalam trie
   * @param pattern Pola yang akan ditambahkan
   */
  addPattern(pattern: string): void {
    if (this.built) {
      throw new Error('Cannot add patterns after the automaton is built');
    }

    let node = this.root;
    const normalizedPattern = pattern.toLowerCase();

    for (let i = 0; i < normalizedPattern.length; i++) {
      const char = normalizedPattern[i];

      if (!node.children.has(char)) {
        node.children.set(char, {
          children: new Map(),
          fail: null,
          output: new Set(),
          depth: node.depth + 1,
          char,
        });
      }

      node = node.children.get(char)!;
    }

    node.output.add(normalizedPattern);
  }

  /**
   * Membangun fungsi failure
   */
  build(): void {
    if (this.built) return;

    const queue: AhoCorasickNode[] = [];

    // Set fail pointer for depth 1 nodes to root
    for (const child of this.root.children.values()) {
      child.fail = this.root;
      queue.push(child);
    }

    // BFS to build failure links
    while (queue.length > 0) {
      const current = queue.shift()!;

      for (const [char, child] of current.children.entries()) {
        queue.push(child);

        let failNode = current.fail;

        // Find the longest proper suffix that is also a prefix
        while (failNode !== null && !failNode.children.has(char)) {
          failNode = failNode.fail;
        }

        if (failNode === null) {
          child.fail = this.root;
        } else {
          child.fail = failNode.children.get(char)!;

          // Add outputs from the fail state to this node
          for (const output of child.fail.output) {
            child.output.add(output);
          }
        }
      }
    }

    this.built = true;
  }

  /**
   * Mencari semua kemunculan pola dalam teks
   * @param text Teks yang akan dicari
   * @returns Map pola yang ditemukan dengan jumlah kemunculannya
   */
  search(text: string): Map<string, number> {
    if (!this.built) {
      this.build();
    }

    const matches = new Map<string, number>();
    const normalizedText = text.toLowerCase();
    let node = this.root;

    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];

      // Follow failure links until we find a matching transition or reach root
      while (node !== this.root && !node.children.has(char)) {
        node = node.fail!;
      }

      // Try to follow the transition
      if (node.children.has(char)) {
        node = node.children.get(char)!;
      }

      // Check for any matches at this node
      for (const match of node.output) {
        matches.set(match, (matches.get(match) || 0) + 1);
      }
    }

    return matches;
  }

  /**
   * Mencari semua kemunculan pola dalam teks dan mengembalikan hanya pola unik
   * @param text Teks yang akan dicari
   * @returns Set pola yang ditemukan
   */
  searchUnique(text: string): Set<string> {
    const matches = this.search(text);
    return new Set(matches.keys());
  }

  /**
   * Mengecek apakah teks mengandung setidaknya satu pola
   * @param text Teks yang akan dicari
   * @returns Boolean apakah pola ditemukan
   */
  containsAny(text: string): boolean {
    if (!this.built) {
      this.build();
    }

    const normalizedText = text.toLowerCase();
    let node = this.root;

    for (let i = 0; i < normalizedText.length; i++) {
      const char = normalizedText[i];

      while (node !== this.root && !node.children.has(char)) {
        node = node.fail!;
      }

      if (node.children.has(char)) {
        node = node.children.get(char)!;
      }

      if (node.output.size > 0) {
        return true;
      }
    }

    return false;
  }
}
