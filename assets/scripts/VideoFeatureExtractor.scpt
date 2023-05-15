JsOsaDAS1.001.00bplist00�Vscript_dfunction run(argv) {
	const filePath = argv[2]
	const useAudioDetails = argv[3]
	const useSubjectClassification = argv[4]
	const useFaceDetection = argv[5]
	const useRectangleDetection = argv[6]
	
    ObjC.import('objc');
    ObjC.import('CoreMedia');
    ObjC.import('Foundation');
    ObjC.import('AVFoundation');
    ObjC.import('Vision');
    ObjC.import('AppKit');
  
    const assetURL = $.NSURL.fileURLWithPath(filePath);
    const options = $.NSDictionary.alloc.init;
    const asset = $.objc_getClass('AVAsset').assetWithURL(assetURL);
  
    if (!asset.js || asset.tracksWithMediaType($.AVMediaTypeVideo).count == 0) {
      return '';
    }
  
    const instructions = [];
  const confidenceThreshold = 0.7
  
    const reader = $.objc_getClass('AVAssetReader').alloc.initWithAssetError(
      asset,
      null
    );
    const track = asset.tracksWithMediaType($.AVMediaTypeVideo).objectAtIndex(0);
    const settings = $.NSDictionary.dictionaryWithObjectForKey(
      '420v',
      'PixelFormatType'
    );
    readerOutput = $.objc_getClass(
      'AVAssetReaderTrackOutput'
    ).alloc.initWithTrackOutputSettings(track, settings);
    reader.addOutput(readerOutput);
    reader.startReading;
  
    const maxCount = 15;
    samples = [];
    let buf = Ref();
    while (
      samples.length < maxCount &&
      reader.status != $.AVAssetReaderStatusCompleted &&
      reader.status != $.AVAssetReaderStatusFailed
    ) {
      buf = readerOutput.copyNextSampleBuffer;
      samples.push(buf);
    }
  
    const texts = [];
   const classifications = [];
   const animals = [];
   let faces = 0;
   const rects = [];
    for (let i = 0; i < samples.length; i++) {
      const sample = samples[i];
      const presentationTime = $.CMSampleBufferGetPresentationTimeStamp(sample);
      const imageBufferRef = ObjC.castRefToObject(
        $.CMSampleBufferGetImageBuffer(samples[samples.length - i - 1])
      );
  
      const requestHandler =
        $.VNImageRequestHandler.alloc.initWithCVPixelBufferOptions(
          imageBufferRef,
          $.NSDictionary.alloc.init
        );
  
      const textRequest = $.VNRecognizeTextRequest.alloc.init;
	  const classificationRequest = $.VNClassifyImageRequest.alloc.init
	  const animalRequest = $.VNRecognizeAnimalsRequest.alloc.init
	  const faceRequest = $.VNDetectFaceRectanglesRequest.alloc.init
	  const rectRequest = $.VNDetectRectanglesRequest.alloc.init
	  rectRequest.maximumObservations = 0
  
      requestHandler.performRequestsError(
        ObjC.wrap([textRequest, classificationRequest, animalRequest, faceRequest, rectRequest]),
        null
      );
      const textResults = textRequest.results;
      const classificationResults = classificationRequest.results;
	const animalResults = animalRequest.results;
	const faceResults = faceRequest.results;
	const rectResults = rectRequest.results;
  
      const sampleTexts = [];
      for (let i = 0; i < textResults.count; i++) {
        const observation = textResults.objectAtIndex(i);
        const observationText = observation.topCandidates(1).objectAtIndex(0)
          .string.js;
        sampleTexts.push(observationText);
      }
  
      sampleTexts.forEach((text) => {
        if (!texts.includes(text)) {
          texts.push(text);
        }
      });
	  	  
	for (let i = 0; i < classificationResults.count; i++) {
		const observation = classificationResults.objectAtIndex(i);
		const identifier = observation.identifier.js
		if (observation.confidence > confidenceThreshold && !classifications.includes(identifier)) {
			classifications.push(identifier)
		}
	}
	
	for (let i = 0; i < animalResults.count; i++) {
		const observation = animalResults.objectAtIndex(i);
		const labels = observation.labels
		for (let j = 0; j < labels.count; j++) {
			animals.push(labels.objectAtIndex(j).identifier.js)
		}
	}
    }
	
    if (texts.length > 0) {
      instructions.push(
        '<Transcribed text occuring in the first few seconds: """' +
          texts.join(', ') +
          '""">',
      );
    }

    if (classifications.length > 0) {
      instructions.push(
        '<Potential labels for objects appearing in the first few seconds: `' +
          classifications.join(', ') +
          '`.>'
      );
    }
	
	if (animals.length > 0) {
      instructions.push(
        '<Animals observed: `' +
          animals.join(', ') +
          '`.>'
      );
    }
  
    return instructions.join(`
    `);
}                              zjscr  ��ޭ