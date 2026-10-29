let sourceNode = null; // 当前正在播放的音频源节点

// 播放音频
async function playBuffer(buffer) {
    if (!buffer) return;

    // 播放停止
    if (sourceNode) {
        sourceNode.stop();
        sourceNode.disconnect();
    }

    // 点击后启动 AudioContext
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    // 创建新音源
    sourceNode = audioContext.createBufferSource();
    // 加入数据
    sourceNode.buffer = buffer;
    // 连接到扬声器
    sourceNode.connect(audioContext.destination);
    // 播放
    sourceNode.start(0);
}

// 绑定
playBtn.addEventListener('click', () => {
    // 播放原声
    playBuffer(originalAudioBuffer);
});

reverseBtn.addEventListener('click', () => {
    // 生成倒放数据
    if (!reversedAudioBuffer) {
        console.log("正在生成倒放数据...");
        reversedAudioBuffer = createReversedBuffer(originalAudioBuffer);
    }
    
    // 播放倒放数据
    playBuffer(reversedAudioBuffer);
    
    // 改文字提示
    reverseBtn.textContent = "↺ 再次倒放";
});