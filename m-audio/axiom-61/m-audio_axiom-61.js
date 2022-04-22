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

function makeSurfaceElements() {
  var surfaceElements = {}
  var bindingInfo = axiomBasis.getBindingInfo(sysexObject.groups)
  
 
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

  axiomBasis.makeFaders (surface, 0.25, 0.25, 2, 5, bindingInfo.fader, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeButtons (surface, 0.25, 5.75, 2, 2,  bindingInfo.button, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeKnobs (surface, 22.25, 0.5, 2, 2, bindingInfo.knob, midiInput, midiOutput, surfaceElements)
  axiomBasis.makeTransport (surface, 23.0, 5.5, 1.5, 1.5, bindingInfo.transport, midiInput, midiOutput, surfaceElements)
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

