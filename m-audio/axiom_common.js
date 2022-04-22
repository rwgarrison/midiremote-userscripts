// const sysex = require('./axiom-sysex')
// // array of groups
// const group = sysex.obj["groups"]
// // Get Faders and Knobs Group
// const group_name = group[0].group_name
// console.log(group_name);
// // Array of elements
// const group_element = group[0].elements
// const element_name = group_element[4].name
// console.log(element_name);

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

//----------------------------------------------------------------------------------------------------------------------
// Faders
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
function makeFaders(/** @type {MR_DeviceSurface} */surface, x, y, w, h, faderInfo, midiInput, midiOutput, surfaceElements) {

  var faders = {}
  surfaceElements.numFaders = faderInfo.num

  for (var i = 0; i < surfaceElements.numFaders; i++) {
    faders[i] = surface.makeFader(x + 2.25*i, y, w, h)
    console.log(faderInfo.type[i])
    var ch = faderInfo.value[i]
    console.log(ch.toString())
    faders[i].mSurfaceValue.mMidiBinding
      .setInputPort(midiInput)
      .bindToControlChange (faderInfo.channel[i], faderInfo.value[i])
  }
  surfaceElements.faders = faders
  surfaceElements.ccFaderValues = faderInfo.value
}


//----------------------------------------------------------------------------------------------------------------------
// Buttons
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
function makeButtons(surface, x, y, w, h, buttonInfo, midiInput, midiOutput, surfaceElements) {

  var buttons = {}
  surfaceElements.numButtons = buttonInfo.num

  
  for (var i = 0; i < surfaceElements.numButtons; i++) {
    buttons[i] = surface.makeButton(x + 2.25*i, y, w, h)
    buttons[i].setShapeCircle()
    buttons[i].mSurfaceValue.mMidiBinding
      .setInputPort(midiInput)
      .bindToControlChange (buttonInfo.channel[i], buttonInfo.value[i])
  }
  surfaceElements.buttons = buttons
  surfaceElements.ccButtonValues = buttonInfo.value
}
  

//----------------------------------------------------------------------------------------------------------------------
// Knobs
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
 function makeKnobs(/** @type {MR_DeviceSurface} */surface, x, y, w, h, knobInfo, midiInput, midiOutput, surfaceElements) {

  var knobs = {}
  surfaceElements.numKnobs = knobInfo.num

  for (var i = 0; i < surfaceElements.numKnobs; i++) {
    if (i < surfaceElements.numKnobs/2) {
      // Bottom Row
      knobs[i] = surface.makeKnob(x+1.13 + 2.25*i, y + 2.25, w, h)
    } else {
      // Top Row
      var b = i - surfaceElements.numKnobs/2
      knobs[i] = surface.makeKnob(x + 2.25*b, y, w, h)
    }
    knobs[i].mSurfaceValue.mMidiBinding
      .setInputPort(midiInput)
      .bindToControlChange (knobInfo.channel[i], knobInfo.value[i])
      .setTypeRelativeTwosComplement()
  }
  surfaceElements.knobs = knobs
  surfaceElements.ccKnobValues = knobInfo.value
}

  
//----------------------------------------------------------------------------------------------------------------------
// Transport Buttons
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
 function makeTransport(surface, x, y, w, h, transportInfo,  midiInput, midiOutput, surfaceElements) {

	surfaceElements.numButtons = transportInfo.num
	surfaceElements.transport = {}

  function bindMidiCC(button, chn, val) {
    button.mSurfaceValue.mMidiBinding.setInputPort(midiInput).bindToControlChange(chn, val)
  }

  
	for (var i = 0; i < surfaceElements.numButtons; i++) {

    switch (i) {
      case 0:
        surfaceElements.transport.btnCycle = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueCycle = transportInfo.value[i]
        bindMidiCC(surfaceElements.transport.btnCycle, transportInfo.channel[i], surfaceElements.transport.ccValueCycle)
        break;
  
      case 1:
        surfaceElements.transport.btnRewind = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueRewind = transportInfo.value[i]
        bindMidiCC(surfaceElements.transport.btnRewind, transportInfo.channel[i], surfaceElements.transport.ccValueRewind)
        break;
  
      case 2:
        surfaceElements.transport.btnForward = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueForward = transportInfo.value[i]
        bindMidiCC(surfaceElements.transport.btnForward, transportInfo.channel[i], surfaceElements.transport.ccValueForward)
        break;
  
      case 3:
        surfaceElements.transport.btnStop = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueStop = transportInfo.value[i]
        bindMidiCC(surfaceElements.transport.btnStop, transportInfo.channel[i], surfaceElements.transport.ccValueStop)
        break;
  
      case 4:
        surfaceElements.transport.btnStart = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueStart = transportInfo.value[i]
        bindMidiCC(surfaceElements.transport.btnStart, transportInfo.channel[i], surfaceElements.transport.ccValueStart)
        break;
  
      case 5:
        surfaceElements.transport.btnRecord = surface.makeButton(x + 1.5 * i, y, w, h)
        surfaceElements.transport.ccValueRecord = transportInfo.value[i]
        surfaceElements.transport.btnRecord.setShapeCircle()
        bindMidiCC(surfaceElements.transport.btnRecord, transportInfo.channel[i], surfaceElements.transport.ccValueRecord)
        break;
    }
	}
}
  

//----------------------------------------------------------------------------------------------------------------------
// Trigger Pad
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} padIndex
 * @param {number} x
 * @param {number} y
 * @param {number} w
 * @param {number} h
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
function makePadElement(surface, padIndex, x, y, w, h, midiInput, midiOutput) {
	var padElement = {}
	const faderCC = [0x4A, 0x47, 0x5B, 0x5D, 0x49, 0x48, 0x05, 0x54, 0x07]
  
	padElement.pad = surface.makeTriggerPad(x + 3.0 * padIndex, y, w, h)

	return padElement
}
  
//----------------------------------------------------------------------------------------------------------------------
/**
 * @param {number} x
 * @param {number} y
 * @param {MR_DeviceMidiInput} midiInput
 * @param {MR_DeviceMidiOutput} midiOutput
 * @returns {Object}
 */
function makePads(surface, x, y, midiInput, midiOutput, surfaceElements) {

  surfaceElements.numPads = 4
  surfaceElements.pads = {}

  for (var i = 0; i < surfaceElements.numPads; i++) {
    surfaceElements.pads[i] = makePadElement(surface, i, x + 0.25, y + 0.25, 3.0, 3.0, midiInput, midiOutput)
  }
}
  

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//----------------------------------------------------------------------------- 

function makePageWithDefaults(name, /** @type {MR_DeviceDriver} */deviceDriver, surfaceElements) {
  var page = deviceDriver.mMapping.makePage(name)

  page.makeValueBinding(surfaceElements.transport.btnRewind.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRewind)
  page.makeValueBinding(surfaceElements.transport.btnForward.mSurfaceValue, page.mHostAccess.mTransport.mValue.mForward)
  page.makeValueBinding(surfaceElements.transport.btnStop.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStop).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnStart.mSurfaceValue, page.mHostAccess.mTransport.mValue.mStart).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnCycle.mSurfaceValue, page.mHostAccess.mTransport.mValue.mCycleActive).setTypeToggle()
  page.makeValueBinding(surfaceElements.transport.btnRecord.mSurfaceValue, page.mHostAccess.mTransport.mValue.mRecord).setTypeToggle()

  return page
}



function makeHostMapping(hostDefaults, deviceDriver, surfaceElements, surface, midiOutput) {

  var page = makePageWithDefaults('Default', deviceDriver, surfaceElements)

  page.mOnActivate = function (context) {
    console.log('from script: Axiom "Default" page activated')
  }
}


//----------------------------------------------------------------------------------------------------------------------
// 4. Feedback to the HW controller
//----------------------------------------------------------------------------------------------------------------------

/**
 * 
 * @param {MR_DeviceDriver} deviceDriver
 * @param {MR_DeviceMidiOutput} midiOutput
 */
function makeActivationHandling(deviceDriver, sysex_object, midiOutput) {
	deviceDriver.mOnActivate = function (context) {
    function checksum(body) {
      var cs = 0
      for (var i = 0; i < body.length; i++) {
        cs +=  body[i] % 256
      }
      return (~cs & 0x7F)
    }

    function toHexString(byteArray) {
      var s = '0x';
      byteArray.forEach(function(byte) {
        s += ('0' + (byte & 0xFF).toString(16)).slice(-2);
      });
      return s;
    }
    
    const bank           = sysex_object.bank
    const groups         = sysex_object.groups
    const numberOfGroups = groups.length
    for (var i = 0; i < numberOfGroups; i++) {
      console.log(groups[i].name)

    }

    // Is this prefix the same for all Axiom Controllers
    // I think it is
    const prefix = [0xF0, 0x00, 0x20, 0x08, 0x11]
    
    // Define various sysex types used by the Axiom
    var ch_body      = []
    var cc_body      = []
    var msb_body     = []
    var lsb_body     = []
    var program_body = []
    var offset = 4

    var group
    var sysex_id
    var elements
    var numElements

    // Build sysex for faders and knobs
    group = groups[0]
    console.log(group.name)
    // sysex channel values
    sysex_id = group.channel_sysex
    elements     = group.elements
    numElements = elements.length

    ch_body = [0x7F, group.channel_sysex, bank, numElements]
    cc_body = [0x7F, group.midicc_sysex, bank, 2*numElements]
    msb_body = [0x7F, group.msb_sysex, bank, numElements]
    lsb_body = [0x7F, group.lsb_sysex, bank, numElements]

    // Fill in bytes from axiom-sysex json
    for (var i = 0; i < numElements; i++) {
      ch_body[offset + i]     = elements[i].channel
      msb_body[offset + i]    = elements[i].msb
      lsb_body[offset + i]    = elements[i].lsb
      // cc entry puts the most significant nybble in 1 byte and
      // the least significant nybble in the second byte
      // Not sure why
      var msn = Math.floor(elements[i].midicc / 16)
      var lsn = elements[i].midicc - (16*msn)
      cc_body[offset + 2*i]   = msn
      cc_body[offset + 2*i+1] = lsn
    }

    const g0_ch_sysex = prefix.concat(ch_body, checksum(ch_body), 0xF7)
    const g0_cc_sysex = prefix.concat(cc_body, checksum(cc_body), 0xF7)
    const g0_msb_sysex = prefix.concat(msb_body, checksum(msb_body), 0xF7)
    const g0_lsb_sysex = prefix.concat(lsb_body, checksum(lsb_body), 0xF7)



    // Build sysex for faders and knobs
    group = groups[1]
    console.log(group.name)
    // sysex channel values
    sysex_id = group.channel_sysex
    elements     = group.elements
    numElements = elements.length

    ch_body = [0x7F, group.channel_sysex, bank, numElements]
    cc_body = [0x7F, group.midicc_sysex, bank, 2*numElements]
    msb_body = [0x7F, group.msb_sysex, bank, numElements]
    lsb_body = [0x7F, group.lsb_sysex, bank, numElements]
    program_body = [0x7F, group.program_sysex, bank, numElements]

    // Fill in bytes from axiom-sysex json
    for (var i = 0; i < numElements; i++) {
      ch_body[offset + i]      = elements[i].channel
      msb_body[offset + i]     = elements[i].msb
      lsb_body[offset + i]     = elements[i].lsb
      program_body[offset + i] = elements[i].program
      // cc entry puts the most significant nybble in 1 byte and
      // the least significant nybble in the second byte
      // Not sure why
      var msn = Math.floor(elements[i].midicc / 16)
      var lsn = elements[i].midicc - (16*msn)
      cc_body[offset + 2*i]   = msn
      cc_body[offset + 2*i+1] = lsn
    }

    const g1_ch_sysex = prefix.concat(ch_body, checksum(ch_body), 0xF7)
    const g1_cc_sysex = prefix.concat(cc_body, checksum(cc_body), 0xF7)
    const g1_program_sysex = prefix.concat(program_body, checksum(program_body), 0xF7)
    const g1_msb_sysex = prefix.concat(msb_body, checksum(msb_body), 0xF7)
    const g1_lsb_sysex = prefix.concat(lsb_body, checksum(lsb_body), 0xF7)

    // Send Group 0 sysex
    console.log(toHexString(g0_ch_sysex))
    midiOutput.sendMidi(context, g0_ch_sysex)
    console.log(toHexString(g0_cc_sysex))
    midiOutput.sendMidi(context, g0_cc_sysex)
    console.log(toHexString(g0_msb_sysex))
    midiOutput.sendMidi(context, g0_msb_sysex)
    console.log(toHexString(g0_lsb_sysex))
    midiOutput.sendMidi(context, g0_lsb_sysex)

    // Send Group1 sysex
    console.log(toHexString(g1_ch_sysex))
    midiOutput.sendMidi(context, g1_ch_sysex)
    console.log(toHexString(g1_cc_sysex))
    midiOutput.sendMidi(context, g1_cc_sysex)
    console.log(toHexString(g1_program_sysex))
    midiOutput.sendMidi(context, g1_program_sysex)
    console.log(toHexString(g1_msb_sysex))
    midiOutput.sendMidi(context, g1_msb_sysex)
    console.log(toHexString(g1_lsb_sysex))
    midiOutput.sendMidi(context, g1_lsb_sysex)
  }
}

function getElementInfo (element) {

  var elementBinding = {}
  elementBinding.type
  elementBinding.channel
  elementBinding.value

  var midiBind = "Unknown"
  var midiValue = 0
  var midiChannel = element.channel

  if (element.midicc < 128) {
    midiValue = element.midicc
    midiBind = "MidiBindingToControlChange"
  } else {
      switch (element.type) {
        case "transport":
        case "button":
          switch (element.midicc) {
            case 131: // Channel Pressure
            case 146: // MIDI CC (on/off)
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            case 147: // Note (on/off)
              midiValue = element.program // note value
              midiBind = "MidiBindingToNote"
              break
            case 148: // Note (on/off toggle)
               midiValue = element.program // note value
               midiBind = "MidiBindingToNote"
               break
            case 153: // MIDI CC Decrement
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            case 154: // MIDI CC Increment
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            default:
              // Mode not supported
              midiValue = 0
              midiBind = "NotSupported"
          }
          break
        
        case "fader":
          switch (element.midicc) {
            default:
              // Mode not supported
              midiValue = 0
              midiBind = "NotSupported"
          }
          break

        case "knob":
          switch (element.midicc) {
            case 146: // 2’s comp from 64 / Relative (binary offset)
            case 147: // 2’s comp from 0 / Relative (2’s comp)
            case 148: // Sign Magnitude / Relative (signed bit)
            case 149: // Sign Magnitude / Relative (signed bit 2)
            case 150: // Single Value increment/decrement
              midiValue = element.lsb // cc value
              midiBind = "MidiBindingToControlChange"
              break
            case 151: // RPN increment/decrement message
              midiValue = 96 // Inc RPN cc
              midiBind = "MidiBindingToControlChange"
              break
            case 152: // NRPN increment/decrement message
              midiValue = 96 // Inc NRPN cc
              midiBind = "MidiBindingToControlChange"
              break
            default:
              // Mode not supported
              midiValue = 0
              midiBind = "NotSupported"
            }
          break
        case "pad":
          switch (element.midicc) {
            case 146: // MIDI CC (on/off)
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            case 147: // Note (on/off)
              midiValue = element.program // note value
              midiBind = "MidiBindingToNote"
              break
            case 148: // Note (on/off toggle)
               midiValue = element.program // note value
               midiBind = "MidiBindingToNote"
               break
            case 153: // MIDI CC Decrement
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            case 154: // MIDI CC Increment
              midiValue = element.program // cc value
              midiBind = "MidiBindingToControlChange"
              break
            default:
              // Mode not supported
              midiValue = 0
              midiBind = "NotSupported"
          }
          break
      }
    }
  elementBinding.type = midiBind
  elementBinding.value = midiValue
  elementBinding.channel = midiChannel
  return elementBinding
}


function getBindingInfo(sysExGroups) {
  var binding = {}
  binding.fader = {}
  binding.fader.type = []
  binding.fader.value = []
  binding.fader.channel = []
  
  binding.button = {}
  binding.button.type = []
  binding.button.value = []
  binding.button.channel = []
  
  binding.knob = {}
  binding.knob.type = []
  binding.knob.value = []
  binding.knob.channel = []
  
  binding.transport = {}
  binding.transport.type = []
  binding.transport.value = []
  binding.transport.channel = []
  
  binding.pad = {}
  binding.pad.type = []
  binding.pad.value = []
  binding.pad.channel = []
  
  //const groups         = sysexObject.groups
  const numberOfGroups = sysExGroups.length
  
  // There are 2 sysex groups that contain the element information
  for (var g = 0; g < 2; g++) {
    var group    = sysExGroups[g]
    var elements = group.elements
    var numElements = elements.length
    for (var i = 0; i < numElements; i++) {
      var element = elements[i]
  
      var elementInfo = getElementInfo(element)
      switch (element.type)
      {
        case "fader":
          binding.fader.type[element.instance] = elementInfo.type
          binding.fader.channel[element.instance] = elementInfo.channel
          binding.fader.value[element.instance] = elementInfo.value
          break
        case "button":
          binding.button.type[element.instance] = elementInfo.type
          binding.button.channel[element.instance] = elementInfo.channel
          binding.button.value[element.instance] = elementInfo.value
          break
        case "knob":
          binding.knob.type[element.instance] = elementInfo.type
          binding.knob.channel[element.instance] = elementInfo.channel
          binding.knob.value[element.instance] = elementInfo.value
          break
        case "transport":
          binding.transport.type[element.instance] = elementInfo.type
          binding.transport.channel[element.instance] = elementInfo.channel
          binding.transport.value[element.instance] = elementInfo.value
          break
        case "pad":
          binding.pad.type[element.instance] = elementInfo.type
          binding.pad.channel[element.instance] = elementInfo.channel
          binding.pad.value[element.instance] = elementInfo.value
          break
      }
    }
  }
  binding.fader.num     = binding.fader.type.length
  binding.knob.num      = binding.knob.type.length
  binding.button.num    = binding.button.type.length
  binding.transport.num = binding.transport.type.length
  binding.pad.num       = binding.pad.type.length
  return binding
}


//-----------------------------------------------------------------------------
// RETURN to require ----------------------------------------------------------
//-----------------------------------------------------------------------------
module.exports = {
  makeFaders,
  makeButtons,
  makeKnobs,
  makeTransport,
  makePads,
  makeActivationHandling,
  makeHostMapping,
  getBindingInfo
}
