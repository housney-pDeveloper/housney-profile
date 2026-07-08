/** 텍스트를 단어 단위 마스크 스팬으로 분해 (cinematic-scroll-storytelling 패턴) */
export function splitWords(el: HTMLElement) {
  if (el.dataset.splitReady === 'true') return
  const text = el.textContent ?? ''
  el.textContent = ''
  el.setAttribute('aria-label', text.trim())
  for (const part of text.split(/(\s+)/)) {
    if (!part.trim()) {
      el.appendChild(document.createTextNode(part))
      continue
    }
    const mask = document.createElement('span')
    mask.className = 'split-word-mask'
    mask.setAttribute('aria-hidden', 'true')
    const word = document.createElement('span')
    word.className = 'split-word'
    word.textContent = part
    mask.appendChild(word)
    el.appendChild(mask)
  }
  el.dataset.splitReady = 'true'
}
