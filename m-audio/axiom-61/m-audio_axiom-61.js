//-----------------------------------------------------------------------------
// 0. INCLUDE common functions
//-----------------------------------------------------------------------------

//-----------------------------------------------------------------------------
// 1. DRIVER SETUP - create driver object, midi ports and detection information
//-----------------------------------------------------------------------------

var midiremote_api = require('midiremote_api_v1')
var axiomBasis = require('../axiom_common')
const sysex = require('../axiom-sysex')
const sysexObject = sysex.obj
const group = sysex.obj["groups"]
const group_name = group[0].name

var deviceDriver = midiremote_api.makeDeviceDriver('m-Audio', 'axiom-61', 'Ron Garrison')

var midiInput = deviceDriver.mPorts.makeMidiInput()
var midiOutput = deviceDriver.mPorts.makeMidiOutput()

// Program bank 0 of Axiom
axiomBasis.makeActivationHandling(deviceDriver, sysexObject, midiOutput)

deviceDriver.makeDetectionUnit().detectPortPair(midiInput, midiOutput)
    .expectInputNameEquals('USB Axiom 61')
    .expectOutputNameEquals('USB Axiom 61')
    .expectSysexIdentityResponse('002008', '630E', '1A03') // Axiom-61
   
var surface = deviceDriver.mSurface

//-----------------------------------------------------------------------------
// 2. SURFACE LAYOUT - create control elements and midi bindings
//-----------------------------------------------------------------------------

// Get CC Mapping from sysex object sent to Axiom
// function getSurfaceCC(sysexObject) {

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
                midiValue = 0 // Not used
                midiBind = "MidiBindingToChannelPressure"
                break
              case 128: // Pitch Bend Range
                midiValue = 0 // Pitch Bend RPN Coarse#
                midiBind = "MidiBindingToControlChange14Bit"
                break
              case 129: // Channel Fine Tune
                midiValue = 0 // Fine Tune CC
                midiBind = "MidiBindingToControlChange14Bit"
                break              
              case 130: // Channel Coarse Tune
                midiValue = 0 // Coarse Tune CC
                midiBind = "MidiBindingToControlChange14Bit"
                break
              case 132: // RPN Coarse
              case 133: // RPN Fine
                midiValue = element.program // RPN value
                midiBind = "MidiBindingToControlChange14Bit"
                break
              case 134: // NPRN Coarse
              case 135: // NRPN Fine
                midiValue = element.program // RPN value
                midiBind = "MidiBindingToControlChange14BitNRPN"
                break
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
            }
            break
          
          case "fader":
            switch (element.midicc) {
              case 132: // RPN Coarse
              case 133: // RPN Fine
                midiValue = element.program // cc value
                midiBind = "MidiBindingToControlChange14Bit"
                break
              case 134: // NPRN Coarse
              case 135: // NRPN Fine
                midiValue = element.program // cc value
                midiBind = "MidiBindingToControlChange14BitNRPN"
                break
              case 144: // Pitch Bend
                midiValue = element.program // cc value
                midiBind = "MidiBindingToPitchBend"
                break
            }
            break
          case "knob":
            switch (element.midicc) {
              case 132: // RPN Coarse
              case 133: // RPN Fine
                midiValue = element.program // cc value
                midiBind = "MidiBindingToControlChange14Bit"
                break
              case 134: // NPRN Coarse
              case 135: // NRPN Fine
                midiValue = element.program // cc value
                midiBind = "MidiBindingToControlChange14BitNRPN"
                break
              case 144: // Pitch Bend
                midiValue = element.program // cc value
                midiBind = "MidiBindingToPitchBend"
                break
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
            }
            break
        }
      }
    elementBinding.type = midiBind
    elementBinding.value = midiValue
    elementBinding.channel = midiChannel
    return elementBinding
  }


function getBindingInfo() {
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

  const groups         = sysexObject.groups
  const numberOfGroups = groups.length

  // There are 2 sysex groups that contain the element information
  for (var g = 0; g < 2; g++) {
    var group    = groups[g]
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
  return binding
}

function makeSurfaceElements() {
  var surfaceElements = {}
  
  var keyboard = {}

  var bindingInfo = getBindingInfo()
  
  keyboard.faders = {}
  keyboard.faders.binding = bindingInfo.fader
  keyboard.faders.num = bindingInfo.fader.type.length
  keyboard.knobs = {}
  keyboard.knobs.binding = bindingInfo.knob
  keyboard.knobs.num = bindingInfo.knob.type.length
  keyboard.buttons = {}
  keyboard.buttons.binding = bindingInfo.button
  keyboard.buttons.num = bindingInfo.button.type.length
  keyboard.transport = {}
  keyboard.transport.binding = bindingInfo.transport
  keyboard.transport.num = bindingInfo.transport.type.length
  keyboard.pads = {}
  keyboard.pads.binding = bindingInfo.pad
  keyboard.pads.num = bindingInfo.pad.type.length
  
  var value = bindingInfo.fader.value[4]
  console.log(bindingInfo.knob.type.length.toString())
  console.log(bindingInfo.knob.value.toString())
  console.log(bindingInfo.fader.type.length.toString())
  console.log(bindingInfo.fader.value.toString())
  console.log(bindingInfo.button.type.length.toString())
  console.log(bindingInfo.button.value.toString())
  console.log(bindingInfo.transport.type.length.toString())
  console.log(bindingInfo.transport.value.toString())
  console.log(bindingInfo.pad.type.length.toString())
  console.log(bindingInfo.pad.value.toString())

  const ccFaderValues = bindingInfo.fader.value
  //const ccFaderValues = [0x4A, 0x47, 0x5B, 0x5D, 0x49, 0x48, 0x05, 0x54, 0x07]
  const ccKnobValues = [0x0A, 0x02, 0x0C, 0x0D, 0x4B, 0x4C, 0x5C, 0x5F]
  const ccTransportValues = [0x14, 0x15, 0x16, 0x17, 0x18, 0x19]
  const ccButtonValues = [0x20, 0x21, 0x22, 0x23, 0x24, 0x25, 0x26, 0x27, 0x28]


  axiomBasis.makeFaders (surface, 0.25, 0.25, 2, 5, ccFaderValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeButtons (surface, 0.25, 5.75, 2, 2,  ccButtonValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeKnobs (surface, 22.25, 0.5, 2, 2, ccKnobValues, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeTransport (surface, 23.0, 5.5, 1.5, 1.5, ccTransportValues, midiInput, midiOutput, surfaceElements)
  //axiomBasis.makePads (surface, 37.0, 0.25, midiInput, midiOutput, surfaceElements)
  //axiomBasis.makePads (surface, 37.0, 3.75, midiInput, midiOutput, surfaceElements)

  surfaceElements.pianoKeys = surface.makePianoKeys(0, 9, 50, 6, 0, 60)

  return surfaceElements
}

var surfaceElements = makeSurfaceElements()

//-----------------------------------------------------------------------------
// 3. HOST MAPPING - create mapping pages and host bindings
//-----------------------------------------------------------------------------
axiomBasis.makeHostMapping(midiremote_api.mDefaults, deviceDriver, surfaceElements, surface, midiOutput)

