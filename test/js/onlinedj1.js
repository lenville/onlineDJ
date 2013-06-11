var context = 0;
var compressor = 0;
var reverb = 0;

var source1 = 0;
var source2 = 0;
var source3 = 0;

var lowpassFilter = 0;
var waveShaper = 0;
var panner = 0;

var dry1 = 0;
var dry2 = 0;
var dry3 = 0;

var wet1 = 0;
var wet2 = 0;
var wet3 = 0;

var masterDry = 0;
var masterWet = 0;

function setupRoutingGraph () {
    context = new AudioContext();

    // Create the effects nodes.
    lowpassFilter = context.createBiquadFilter();
    waveShaper = context.createWaveShaper();
    panner = context.createPanner();
    compressor = context.createDynamicsCompressor();
    reverb = context.createConvolver();

    // Create master wet and dry.
    masterDry = context.createGainNode();
    masterWet = context.createGainNode();

    // Connect final compressor to final destination.
    compressor.connect(context.destination);

    // Connect master dry and wet to compressor.
    masterDry.connect(compressor);
    masterWet.connect(compressor);

    // Connect reverb to master wet.
    reverb.connect(masterWet);

    // Create a few sources.
    source1 = context.createBufferSource();
    source2 = context.createBufferSource();
    source3 = context.createOscillator();

    source1.buffer = manTalkingBuffer;
    source2.buffer = footstepsBuffer;
    source3.frequency.value = 440;

    // Connect source1
    dry1 = context.createGainNode();
    wet1 = context.createGainNode();
    source1.connect(lowpassFilter);
    lowpassFilter.connect(dry1);
    lowpassFilter.connect(wet1);
    dry1.connect(masterDry);
    wet1.connect(reverb);

    // Connect source2
    dry2 = context.createGainNode();
    wet2 = context.createGainNode();
    source2.connect(waveShaper);
    waveShaper.connect(dry2);
    waveShaper.connect(wet2);
    dry2.connect(masterDry);
    wet2.connect(reverb);

    // Connect source3
    dry3 = context.createGainNode();
    wet3 = context.createGainNode();
    source3.connect(panner);
    panner.connect(dry3);
    panner.connect(wet3);
    dry3.connect(masterDry);
    wet3.connect(reverb);
    
    // Start the sources now.
    source1.start(0);
    source2.start(0);
    source3.start(0);
}