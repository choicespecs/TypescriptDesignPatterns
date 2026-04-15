// Adapter Pattern — Entry point
// Wires up the media file list to AudioTextReader; shows the call chain on each play.

import { AudioTextReader } from "./models/media/AudioTextReader";

interface MediaFile {
  type: "youtube" | "mp4" | "txt";
  fileName: string;
  label: string;
  icon: string;
}

const FILES: MediaFile[] = [
  { type: "youtube", fileName: "intro-to-design-patterns.mp4",  label: "Intro to Design Patterns", icon: "▶" },
  { type: "youtube", fileName: "typescript-advanced-types.mp4",  label: "TypeScript Advanced Types",  icon: "▶" },
  { type: "mp4",     fileName: "ambient-study-music.mp4",        label: "Ambient Study Music",        icon: "♪" },
  { type: "mp4",     fileName: "lo-fi-beats.mp4",                label: "Lo-Fi Beats",                icon: "♪" },
  { type: "txt",     fileName: "README.txt",                     label: "README",                     icon: "📄" },
  { type: "txt",     fileName: "CHANGELOG.txt",                  label: "Changelog",                  icon: "📄" },
];

const TYPE_LABELS: Record<string, string> = {
  youtube: "YouTube",
  mp4:     "MP4",
  txt:     "TXT",
};

const reader = new AudioTextReader();

function buildFileList(): void {
  const list = document.getElementById("file-list")!;
  FILES.forEach((file, i) => {
    const item = document.createElement("div");
    item.className = `file-item file-${file.type}`;
    item.dataset.index = String(i);
    item.innerHTML = `
      <span class="file-icon">${file.icon}</span>
      <div class="file-info">
        <span class="file-label">${file.label}</span>
        <span class="file-name">${file.fileName}</span>
      </div>
      <span class="file-type-badge badge-${file.type}">${TYPE_LABELS[file.type]}</span>
      <button class="btn-play">Play</button>
    `;
    item.querySelector(".btn-play")!.addEventListener("click", () => playFile(file, item));
    list.appendChild(item);
  });
}

function playFile(file: MediaFile, activeItem: HTMLElement): void {
  // Highlight active item
  document.querySelectorAll(".file-item").forEach(el => el.classList.remove("active"));
  activeItem.classList.add("active");

  const result = reader.play(file.type, file.fileName);
  const adapter = reader.getLastAdapter();
  const usedAdapter = adapter !== null;

  renderCallChain(file, result, adapter?.adapteeClass ?? null);
}

function renderCallChain(
  file: MediaFile,
  resultMsg: string,
  adapteeClass: string | null
): void {
  const panel = document.getElementById("call-chain-panel")!;
  const usedAdapter = adapteeClass !== null;

  const adapterMethod = file.type === "youtube" ? "playVid()" : "playMusic()";
  const adapteeCall = adapterMethod.replace("()", `("${file.fileName}")`);


  const directStep = usedAdapter ? "" : `
    <div class="chain-step chain-direct">
      <span class="step-dot direct-dot"></span>
      <div class="step-body">
        <span class="step-method">reads "${file.fileName}" directly</span>
        <span class="step-note">No adapter — TXT is natively supported</span>
      </div>
    </div>
  `;

  const adapterSteps = usedAdapter ? `
    <div class="chain-connector"></div>
    <div class="chain-step chain-adapter">
      <span class="step-dot adapter-dot"></span>
      <div class="step-body">
        <span class="step-class">MediaAdapter</span>
        <span class="step-method">.play("${file.type}", "${file.fileName}")</span>
        <span class="step-note">Adapter — translates play() → ${adapterMethod}</span>
      </div>
    </div>
    <div class="chain-connector"></div>
    <div class="chain-step chain-adaptee">
      <span class="step-dot adaptee-dot"></span>
      <div class="step-body">
        <span class="step-class">${adapteeClass}</span>
        <span class="step-method">.${adapteeCall}</span>
        <span class="step-note">Adaptee — incompatible interface, wrapped by adapter</span>
      </div>
    </div>
  ` : "";

  panel.innerHTML = `
    <div class="chain-header">
      <span class="chain-title">Call Chain</span>
      <span class="chain-badge ${usedAdapter ? "badge-adapted" : "badge-direct"}">${usedAdapter ? "Via Adapter" : "Direct"}</span>
    </div>
    <div class="chain-steps">
      <div class="chain-step chain-client">
        <span class="step-dot client-dot"></span>
        <div class="step-body">
          <span class="step-class">AudioTextReader</span>
          <span class="step-method">.play("${file.type}", "${file.fileName}")</span>
          <span class="step-note">Target interface — client always calls play()</span>
        </div>
      </div>
      ${directStep}
      ${adapterSteps}
    </div>
    <div class="chain-result">
      <span class="result-icon">${usedAdapter ? "🔌" : "📖"}</span>
      <span class="result-msg">${resultMsg}</span>
    </div>
  `;
  panel.classList.add("visible");
}

buildFileList();
