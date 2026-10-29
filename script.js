let sourceNode = null; // 当前正在播放的音频源节点

// 播放音频的方法
async function playBuffer(buffer) {
    if (!buffer) return;

    // 如果之前有在播放的，先停止
    if (sourceNode) {
        sourceNode.stop();
        sourceNode.disconnect();
    }

    // 浏览器安全策略：必须在用户点击后才能启动 AudioContext
    if (audioContext.state === 'suspended') {
        await audioContext.resume();
    }

    // 创建一个新的音源节点
    sourceNode = audioContext.createBufferSource();
    // 把我们的数据（不管是原声还是倒放的）塞进去
    sourceNode.buffer = buffer;
    // 连接到扬声器
    sourceNode.connect(audioContext.destination);
    // 开始播放
    sourceNode.start(0);
}

// 绑定按钮事件
playBtn.addEventListener('click', () => {
    // 播放原声
    playBuffer(originalAudioBuffer);
});

reverseBtn.addEventListener('click', () => {
    // 如果还没有生成过倒放数据，就生成一次
    if (!reversedAudioBuffer) {
        console.log("正在生成倒放数据...");
        reversedAudioBuffer = createReversedBuffer(originalAudioBuffer);
    }
    
    // 播放倒放数据
    playBuffer(reversedAudioBuffer);
    
    // 也可以顺便改变按钮文字提示
    reverseBtn.textContent = "↺ 再次倒放";
});